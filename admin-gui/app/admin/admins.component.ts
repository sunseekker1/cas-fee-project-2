import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Admin} from './admin';
import {AdminService} from './admin.service';
import {Router} from '@angular/router';
import {LoginService} from "../login/login.service";
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {DeleteDialogComponent} from "../dialog/dialog.component";

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'admins.component.html',
    styleUrls: ['admins.component.css']
})
export class AdminsComponent implements OnInit {
    dialogRef: MdDialogRef<any>;
    admins: Admin[];
    selectedAdmin: Admin;
    editedAdmin: Admin;
    private detailEditMode: string;

    constructor(private router: Router, private adminService: AdminService, private loginService: LoginService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
        this.resetDetailEditForms();
    }

    ngOnInit(): void {
        this.getAdmins();
    }

    getAdmins(): void {
        this.resetDetailEditForms();
        this.adminService.getAdmins().then((admins) => this.mapResult(admins));
    }

    save(): void {
        this.adminService.update(this.editedAdmin)
            .then(() => {
                let selectedAdmin = this.editedAdmin;
                this.getAdmins();
                this.selectedAdmin = selectedAdmin;
                this.detailEditMode = 'detail';
            });
    }

    add(admin: Admin): void {
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

    delete(admin: Admin): void {



        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(DeleteDialogComponent, config);

        this.dialogRef.afterClosed().subscribe(confirm => {
            console.log(confirm);
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

    edit(): void {
        this.editedAdmin = this.cloneObject(this.selectedAdmin);
        this.detailEditMode = 'edit';
    }

    new(): void {
        this.detailEditMode = 'new';
    }

    goBack(): void {
        this.editedAdmin = null;
        this.detailEditMode = 'detail';
    }

    onSelect(admin: Admin): void {
        this.editedAdmin = null;
        this.selectedAdmin = admin;
        this.detailEditMode = 'detail';
    }

    resetDetailEditForms(): void {
        this.selectedAdmin = null;
        this.editedAdmin = null;
        this.detailEditMode = 'new';
    }

    mapResult(result: any): void {
        let mapped: any = [];

        for (let admin of result) {

            mapped.push({
                _id: admin._id,
                shortId: admin._id.substring(21, 25),
                username: admin.username,
                email: admin.email
            });
        }
        this.admins = mapped;
    }

    cloneObject(obj: any) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        var newObj = obj.constructor(); // give temp the original obj's constructor
        for (var key in obj) {
            newObj[key] = this.cloneObject(obj[key]);
        }

        return newObj;
    }

}

