'use strict';
require('angular');
require('angular-route');

var controllers = require('./controllers');
var app = angular.module('launchApp', ['ngRoute']);
app.controller('launchController', ['$scope',controllers.launchController]);
