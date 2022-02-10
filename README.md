node-red-contrib-tb-admin-controller
================

Node-RED node for tb-admin-controller

 ThingsBoard open-source IoT platform REST API documentation.

## Install

To install the stable version use the `Menu - Manage palette - Install` 
option and search for node-red-contrib-tb-admin-controller, or run the following 
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-tb-admin-controller

## Usage

### Methods

#### GET /api/admin/securitySettings

Get the Security Settings object that contains password policy, etc.

Available for users with 'SYS_ADMIN' authority.

     
    Accept : 'application/json'

#### POST /api/admin/securitySettings

Updates the Security Settings object that contains password policy, etc.

Available for users with 'SYS_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/admin/settings

Creates or Updates the Administration Settings. Platform generates random Administration Settings Id during settings creation. The Administration Settings Id will be present in the response. Specify the Administration Settings Id when you would like to update the Administration Settings. Referencing non-existing Administration Settings Id will cause an error.

Available for users with 'SYS_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/admin/settings/testMail

Attempts to send test email to the System Administrator User using Mail Settings provided as a parameter. You may change the 'To' email in the user profile of the System Administrator. 

Available for users with 'SYS_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /api/admin/settings/testSms

Attempts to send test sms to the System Administrator User using SMS Settings and phone number provided as a parameters of the request. 

Available for users with 'SYS_ADMIN' authority.

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /api/admin/settings/{key}

Get the Administration Settings object using specified string key. Referencing non-existing key will cause an error.

Available for users with 'SYS_ADMIN' authority.

    key : string
     
    Accept : 'application/json'

#### GET /api/admin/updates

Check notifications about new platform releases. 

Available for users with 'SYS_ADMIN' authority.

     
    Accept : 'application/json'


## License

#### Apache License Version 2.0

https://github.com/thingsboard/thingsboard/blob/master/LICENSE