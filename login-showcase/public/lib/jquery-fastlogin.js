(function ($)
{
    
    $.fn.fastlogin = function (options)
    {
        
        // default setting
        var settings = $.extend({
            usernameSelector: '#username',
            passwordSelector: '#password',
            siteId: "12345",
            siteTitle: "Demo"
        }, options);
        
        //event listeners
        $('#submitbtn').on('click', submitform);
        
        // socket io url
        var socket = io('http://fastlogin.eu-2.evennode.com:80');
        
        socket.on('fastlogin', function (data)
        {
            var type = data.type;
            
            if (type == 'init')
            {
                // For Deveolopment purposes
                //$('#output').append('channel id: ' + data.channelid);
                
                // create QR Code with the channel Id
                createQRCode(data.channelid)
            } else
            {
                //Fill the form input fields with the specific data
                $(settings.usernameSelector).val(data.username);
                $(settings.passwordSelector).val(data.password);
                
                logData = {
                    siteId: settings.siteId,
                    socketId: data.channelid,
                    used: true
                };
                
                // log the data through the rest api
                logAccess(logData);
                
                // Delay for prasentation purposes
                setTimeout(submitform, 10000);
            }
            
        });
        
        function submitform()
        {
            $('#loginPanel').hide();
            $('#successPanel').show();
            return false;
        }
        
        function logAccess(logData)
        {
            
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/accesses",
                data: JSON.stringify(logData),
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                success: function (data, status, jqXHR)
                {
                    
                    console.log("successfully logged data");
                },
                
                error: function (jqXHR, status)
                {
                    // error handler
                    console.log(jqXHR);
                    console.log('fail' + status.code);
                }
            });
            
            
        }
        
        function createQRCode(channelId)
        {
            qrData = '{"siteid":' + settings.siteId + ',"channelid":"' + channelId + '","sitetitle":"' + settings.siteTitle + '"}';
            
            // QR CODE
            var options = {
                // render method: 'canvas', 'image' or 'div'
                render: 'canvas',
                
                // version range somewhere in 1 .. 40
                minVersion: 1,
                maxVersion: 40,
                
                // error correction level: 'L', 'M', 'Q' or 'H'
                ecLevel: 'L',
                
                // offset in pixel if drawn onto existing canvas
                left: 0,
                top: 0,
                
                // size in pixel
                size: 200,
                
                // code color or image element
                fill: '#000000',
                
                // background color or image element, null for transparent background
                background: '#ffffff',
                
                // content
                text: qrData,
                
                // corner radius relative to module width: 0.0 .. 0.5
                radius: 0,
                
                // quiet zone in modules
                quiet: 0,
                
                // modes
                // 0: normal
                // 1: label strip
                // 2: label box
                // 3: image strip
                // 4: image box
                mode: 0,
                
                mSize: 0.1,
                mPosX: 0.5,
                mPosY: 0.5,
                
                label: 'no label',
                fontname: 'sans',
                fontcolor: '#000',
                
                image: null
            };
            
            $('#qr-container').empty().qrcode(options);
        }
        
        
        return this.each(function ()
        {
            /*            $(this).text(settings.text + ' (' + settings.version + ')');
             
             
             if ( $.isFunction( settings.complete ) ) {
             settings.complete.call( this );
             }*/
            
        });
        
    }
    
    
}(jQuery));