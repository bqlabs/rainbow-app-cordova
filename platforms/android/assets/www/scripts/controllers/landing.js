/**
 * @ngdoc function
 * @name bitbloqOffline.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the bitbloqOffline
 */
angular.module('rainbowApp')
  .controller('LandingCtrl', function($scope, $window) {

    console.log('landing ctrl');
    console.log($window.rainbow);
    var rainbow = $window.rainbow;
    var zeroconf;
    //var mdns = require('mdns-js');



    var landing = this;
    this.services = {};


    this.getType = function(item) {
      return typeof(item);
    }

    this.refreshServices = function() {
      console.log('refresh');
      landing.services = {};

      //_services._dns-sd._udp.local
      //_http._tcp.local.
      //_rainbow._tcp

      if (zeroconf) {
        console.log('unwatch');
        zeroconf.unwatch('_rainbow._tcp.local.');
        console.log('unwatch');
        zeroconf.close()
      } else {
        console.log('initialize zeroconf');
        zeroconf = cordova.plugins.zeroconf;
      }


      console.log('watch');

      //zeroconf = cordova.plugins.zeroconf;
      // zeroconf.register('_rainbow._tcp.local.', 'tomiPad', 80, {
      //   'foo': 'bar'
      // });


      zeroconf.watch('_rainbow._tcp.local.', function(result) {
        console.log(result);
        var action = result.action;
        var service = result.service;
        if (action == 'added') {
          console.log('service added', service);
          for (var i = 0; i < service.addresses.length; i++) {

            landing.services[service.addresses[i]] = service;

          }
        } else {
          console.log('service removed', service);
        }
        $scope.$apply();
      });
    }


    this.showService = function(service) {

      return service.type.indexOf('rainbow') !== -1;
    }


    this.connect = function(ip, service) {
      rainbow.connect('172.16.18.18').then(function() {
        console.log('succes');
        rainbow.onMessage = function(response) {
          console.log('message from server');
          console.log(response);
        };
        rainbow.getFunctions().then(function(response) {
          console.log('getFunctions');
          console.log(response);
          landing.functions = response;
          $scope.$apply();
        });
      }, function() {
        console.log('error');
      });
    }

    this.executeFunction = function(methodName, params) {
      // Convert params
      var args = {};
      for (var key in params) {
        args[key] = params[key].value
      }
      console.log('executing function', methodName, args);
      rainbow.executeFunction(methodName, args).then(function(response) {
        console.log('success execute function: ' + methodName);
        console.log(response);
      }, function() {
        console.log('error');
      });
    }


  });