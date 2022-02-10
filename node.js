'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function TbAdminControllerNode(config) {
        RED.nodes.createNode(this, config);
        this.method = config.method;
        this.saveSecuritySettingsUsingPOST_body = config.saveSecuritySettingsUsingPOST_body;
        this.saveSecuritySettingsUsingPOST_bodyType = config.saveSecuritySettingsUsingPOST_bodyType || 'str';
        this.saveAdminSettingsUsingPOST_body = config.saveAdminSettingsUsingPOST_body;
        this.saveAdminSettingsUsingPOST_bodyType = config.saveAdminSettingsUsingPOST_bodyType || 'str';
        this.sendTestMailUsingPOST_body = config.sendTestMailUsingPOST_body;
        this.sendTestMailUsingPOST_bodyType = config.sendTestMailUsingPOST_bodyType || 'str';
        this.sendTestSmsUsingPOST_body = config.sendTestSmsUsingPOST_body;
        this.sendTestSmsUsingPOST_bodyType = config.sendTestSmsUsingPOST_bodyType || 'str';
        this.getAdminSettingsUsingGET_key = config.getAdminSettingsUsingGET_key;
        this.getAdminSettingsUsingGET_keyType = config.getAdminSettingsUsingGET_keyType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client = new lib.TbAdminController();
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if (!errorFlag && node.method === 'getSecuritySettingsUsingGET') {
                var getSecuritySettingsUsingGET_parameters = [];
                var getSecuritySettingsUsingGET_nodeParam;
                var getSecuritySettingsUsingGET_nodeParamType;
                result = client.getSecuritySettingsUsingGET(getSecuritySettingsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'saveSecuritySettingsUsingPOST') {
                var saveSecuritySettingsUsingPOST_parameters = [];
                var saveSecuritySettingsUsingPOST_nodeParam;
                var saveSecuritySettingsUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveSecuritySettingsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveSecuritySettingsUsingPOST(saveSecuritySettingsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'saveAdminSettingsUsingPOST') {
                var saveAdminSettingsUsingPOST_parameters = [];
                var saveAdminSettingsUsingPOST_nodeParam;
                var saveAdminSettingsUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    saveAdminSettingsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.saveAdminSettingsUsingPOST(saveAdminSettingsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'sendTestMailUsingPOST') {
                var sendTestMailUsingPOST_parameters = [];
                var sendTestMailUsingPOST_nodeParam;
                var sendTestMailUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    sendTestMailUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.sendTestMailUsingPOST(sendTestMailUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'sendTestSmsUsingPOST') {
                var sendTestSmsUsingPOST_parameters = [];
                var sendTestSmsUsingPOST_nodeParam;
                var sendTestSmsUsingPOST_nodeParamType;

                if (typeof msg.payload === 'object') {
                    sendTestSmsUsingPOST_parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', ' + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                                result = client.sendTestSmsUsingPOST(sendTestSmsUsingPOST_parameters);
            }
            if (!errorFlag && node.method === 'getAdminSettingsUsingGET') {
                var getAdminSettingsUsingGET_parameters = [];
                var getAdminSettingsUsingGET_nodeParam;
                var getAdminSettingsUsingGET_nodeParamType;

                getAdminSettingsUsingGET_nodeParam = node.getAdminSettingsUsingGET_key;
                getAdminSettingsUsingGET_nodeParamType = node.getAdminSettingsUsingGET_keyType;
                if (getAdminSettingsUsingGET_nodeParamType === 'str') {
                    getAdminSettingsUsingGET_parameters.key = getAdminSettingsUsingGET_nodeParam || '';
                } else {
                    getAdminSettingsUsingGET_parameters.key = RED.util.getMessageProperty(msg, getAdminSettingsUsingGET_nodeParam);
                }
                getAdminSettingsUsingGET_parameters.key = !!getAdminSettingsUsingGET_parameters.key ? getAdminSettingsUsingGET_parameters.key : msg.payload;
                                result = client.getAdminSettingsUsingGET(getAdminSettingsUsingGET_parameters);
            }
            if (!errorFlag && node.method === 'checkUpdatesUsingGET') {
                var checkUpdatesUsingGET_parameters = [];
                var checkUpdatesUsingGET_nodeParam;
                var checkUpdatesUsingGET_nodeParamType;
                result = client.checkUpdatesUsingGET(checkUpdatesUsingGET_parameters);
            }
            if (!errorFlag && result === undefined) {
                node.error('Method is not specified.', msg);
                errorFlag = true;
            }
            var setData = function (msg, data) {
                if (data) {
                    if (data.response) {
                        if (data.response.statusCode) {
                            msg.statusCode = data.response.statusCode;
                        }
                        if (data.response.headers) {
                            msg.headers = data.response.headers;
                        }
                        if (data.response.request && data.response.request.uri && data.response.request.uri.href) {
                            msg.responseUrl = data.response.request.uri.href;
                        }
                    }
                    if (data.body) {
                        msg.payload = data.body;
                    }
                }
                return msg;
            };
            if (!errorFlag) {
                node.status({ fill: 'blue', shape: 'dot', text: 'TbAdminController.status.requesting' });
                result.then(function (data) {
                    node.send(setData(msg, data));
                    node.status({});
                }).catch(function (error) {
                    var message = null;
                    if (error && error.body && error.body.message) {
                        message = error.body.message;
                    }
                    node.error(message, setData(msg, error));
                    node.status({ fill: 'red', shape: 'ring', text: 'node-red:common.status.error' });
                });
            }
        });
    }

    RED.nodes.registerType('tb-admin-controller', TbAdminControllerNode);
};
