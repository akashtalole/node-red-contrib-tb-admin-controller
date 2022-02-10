/*jshint -W069 */
/**
 *  ThingsBoard open-source IoT platform REST API documentation.
 * @class TbAdminController
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var TbAdminController = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function TbAdminController(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://demo.thingsboard.io:443';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name TbAdminController#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    TbAdminController.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if(Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${ fileType(form[keyName]).ext }` : `file` )
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };


/**
 * Get the Security Settings object that contains password policy, etc.

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name TbAdminController#getSecuritySettingsUsingGET
 * @param {object} parameters - method options and parameters
 */
 TbAdminController.prototype.getSecuritySettingsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/securitySettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Updates the Security Settings object that contains password policy, etc.

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name TbAdminController#saveSecuritySettingsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard open-source IoT platform REST API documentation.
 */
 TbAdminController.prototype.saveSecuritySettingsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/securitySettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Creates or Updates the Administration Settings. Platform generates random Administration Settings Id during settings creation. The Administration Settings Id will be present in the response. Specify the Administration Settings Id when you would like to update the Administration Settings. Referencing non-existing Administration Settings Id will cause an error.

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name TbAdminController#saveAdminSettingsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard open-source IoT platform REST API documentation.
 */
 TbAdminController.prototype.saveAdminSettingsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Attempts to send test email to the System Administrator User using Mail Settings provided as a parameter. You may change the 'To' email in the user profile of the System Administrator. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name TbAdminController#sendTestMailUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard open-source IoT platform REST API documentation.
 */
 TbAdminController.prototype.sendTestMailUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/settings/testMail';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Attempts to send test sms to the System Administrator User using SMS Settings and phone number provided as a parameters of the request. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name TbAdminController#sendTestSmsUsingPOST
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body -  ThingsBoard open-source IoT platform REST API documentation.
 */
 TbAdminController.prototype.sendTestSmsUsingPOST = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/settings/testSms';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the Administration Settings object using specified string key. Referencing non-existing key will cause an error.

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name TbAdminController#getAdminSettingsUsingGET
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.key - A string value of the key (e.g. 'general' or 'mail').
 */
 TbAdminController.prototype.getAdminSettingsUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/settings/{key}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{key}', parameters['key']);
        
        


        if(parameters['key'] === undefined){
            deferred.reject(new Error('Missing required  parameter: key'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Check notifications about new platform releases. 

Available for users with 'SYS_ADMIN' authority.
 * @method
 * @name TbAdminController#checkUpdatesUsingGET
 * @param {object} parameters - method options and parameters
 */
 TbAdminController.prototype.checkUpdatesUsingGET = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/api/admin/updates';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return TbAdminController;
})();

exports.TbAdminController = TbAdminController;
