cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-websocket/www/websocket.js",
        "id": "cordova-plugin-websocket.websocket",
        "clobbers": [
            "WebSocket"
        ]
    },
    {
        "file": "plugins/cordova-plugin-zeroconf/www/zeroconf.js",
        "id": "cordova-plugin-zeroconf.ZeroConf",
        "clobbers": [
            "cordova.plugins.zeroconf"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-websocket": "0.12.0",
    "cordova-plugin-zeroconf": "1.0.1"
}
// BOTTOM OF METADATA
});