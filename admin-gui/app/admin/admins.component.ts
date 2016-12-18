import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {Admin} from './admin';
import {AdminService} from './admin.service';
import {DeleteDialogComponent} from "../dialog/dialog.component";
import {emailValidator} from "../directives/validator.directive";


@Component({
    moduleId: module.id,
    templateUrl: 'admins.component.html',
    styleUrls: ['admins.component.css']
})
export class AdminsComponent implements OnInit {
    dialogRef: MdDialogRef<any>;
    editForm : FormGroup;
    admins: Admin[];
    selectedAdmin: Admin;
    detailEditMode: string;

    constructor(private adminService: AdminService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef, public formBuilder: FormBuilder) {

        this.resetDetailEditForms();
        this.formBuilder = formBuilder;
    }

    ngOnInit(): void {
        this.getAdmins();
    }

    create(admin: Admin): void {
        admin.username = admin.username.trim();
        if (!admin.username || !admin.password || !admin.email) {
            return;
        }
        this.adminService.create(admin)
            .then((admin) => {
                admin.shortId = admin._id.substring(21, 25);
                this.admins.push(admin);
                this.selectedAdmin = null;
            });
    }

    update(admin: Admin): void {
        this.adminService.update(admin)
            .then(() => {
                let selectedAdmin = admin;
                this.getAdmins();
                this.selectedAdmin = selectedAdmin;
                this.detailEditMode = 'detail';
            });
    }

    delete(admin: Admin): void {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(DeleteDialogComponent, config);

        this.dialogRef.afterClosed().subscribe(confirm => {
            this.dialogRef = null;

            if(confirm){
                this.resetDetailEditForms();
                this.adminService
                    .delete(admin._id)
                    .then(() => {
                        this.admins = this.admins.filter(h => h !== admin);
                        if (this.selectedAdmin === admin) {
                            this.selectedAdmin = null;
                        }
                    });
            }
        });
    }

    getAdmins(): void {
        this.resetDetailEditForms();
        this.adminService.getAdmins().then((admins) => this.mapResult(admins));
    }

    onNew(): void {
        this.detailEditMode = 'new';
        this.resetDetailEditForms();
    }

    onEdit(): void {
        this.detailEditMode = 'edit';
        this.buildForm(this.detailEditMode);
    }

    onDelete(admin: Admin): void {
        this.delete(admin);
    }

    onSave(formValues: any, detailEditMode: string): void {
        let editedAdmin = formValues;

        if (this.editForm.valid){
            if (detailEditMode == 'edit'){
                this.update(editedAdmin);
            }
            else if (detailEditMode == 'new'){
                this.create(editedAdmin);
            }
        }
    }

    onBack(): void {
        this.detailEditMode = 'detail';
    }

    onSelect(admin: Admin): void {
        this.selectedAdmin = admin;
        this.detailEditMode = 'detail';
    }

    buildForm(detailEditMode: string): void {
        if (detailEditMode == 'edit'){
            this.editForm = this.formBuilder.group({
                '_id' : [this.selectedAdmin._id],
                'firstname': [this.selectedAdmin.firstname, [
                    Validators.required
                ]],
                'lastname' : [this.selectedAdmin.lastname, [
                    Validators.required
                ]],
                'username' : [this.selectedAdmin.username, [
                    Validators.minLength(4),
                    Validators.maxLength(24),
                    Validators.required
                ]],
                'email' : [this.selectedAdmin.email, [
                    Validators.required,
                    emailValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                ]],
                'password' : [this.selectedAdmin.password, [
                    Validators.minLength(4),
                    Validators.required
                ]]
            });
        }
        else{
            this.editForm = this.formBuilder.group({
                '_id' : '',
                'firstname': ['', [
                    Validators.required
                ]],
                'lastname' : ['', [
                    Validators.required
                ]],
                'username' : ['', [
                    Validators.minLength(4),
                    Validators.maxLength(24),
                    Validators.required
                ]],
                'email' : ['', [
                    Validators.required,
                    emailValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                ]],
                'password' : ['', [
                    Validators.minLength(4),
                    Validators.required
                ]]
            });
        }

        this.editForm.valueChanges.subscribe(data => this.valueChanged(data));
        this.valueChanged(); // (re)set validation messages now
    }

    valueChanged(data?: any) {

        if (!this.editForm) {
            return;
        }
        const form = this.editForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];

                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'firstname': '',
        'lastname': '',
        'username': '',
        'email': '',
        'password': ''
    };

    validationMessages = {
        'username': {
            'minlength':     'Username must be at least 4 characters long.',
            'maxlength':     'Username cannot be more than 24 characters long.',
            'required':     'Username is required.'
        },
        'password': {
            'required': 'Password is required.'
        },
        'firstname': {
            'required': 'Firstname is required.'
        },
        'lastname': {
            'required': 'Lastname is required.'
        },
        'email': {
            'required': 'Email is required.',
            'pattern': 'Please provide a valid email format',
            'emailValidator': 'Please provide a valid email format'
        }
    };

    resetDetailEditForms(): void {
        this.selectedAdmin = null;
        this.detailEditMode = 'new';

        this.buildForm(this.detailEditMode);
    }

    mapResult(result: any): void {
        let mapped: any = [];

        for (let admin of result) {

            mapped.push({
                _id: admin._id,
                shortId: admin._id.substring(21, 25),
                username: admin.username,
                email: admin.email,
                firstname: admin.firstname,
                lastname: admin.lastname
            });
        }
        this.admins = mapped;
    }
}

