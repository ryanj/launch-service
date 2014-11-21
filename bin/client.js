require('angular');

angular.module('launchApp', [])
.controller('launchController', ['$scope', function($scope) {
  $scope.launcher = {}; 
  $scope.qs_allowed = ['url', 'text']
  $scope.getDefaults = function(){
    window.location.search.slice(1).split("&").forEach(function(param){
      var p = param.split("=");
      if( $scope.qs_allowed.indexOf(p[0]) >= 0){
        $scope.defaults[p[0]] = p[1];
      }
    })
  };
  $scope.defaults = {
    'host' : window.location.protocol + "//" + window.location.host + '/',
    'text' : "LAUNCH ON",
    'image': "button.svg",
    'url'  : 'https://openshift.redhat.com/app/console/application_type/custom?cartridges%5B%5D=nodejs-0.10&initial_git_url=https%3A%2F%2Fgithub.com%2Fryanj%2Flaunch-service.git&name=launch'
  }
  $scope.getMarkdown = function(url, alt, image){
    return "[![" + image + "](" + alt + ")](" + url + ")";
  };
  $scope.getHtml = function(url, alt, image){
    return "<a href=\"" + url + "\"><img alt=\"" + alt + "\" src=\"" + image + "\" /></a>";
  };
  $scope.getImageUrl = function(text){
    return $scope.defaults.host + 'button/'+text+'.svg'
  }
  $scope.urlchange = function() {
    $scope.launcher.url = $scope.launcher.url || $scope.defaults.url;
    $scope.launcher.html = $scope.getHtml($scope.launcher.url, $scope.launcher.alt, $scope.launcher.image);
    $scope.launcher.markdown = $scope.getMarkdown($scope.launcher.url, $scope.launcher.alt, $scope.launcher.image);
  };
  $scope.textchange = function() {
    $scope.launcher.text = $scope.launcher.text || $scope.defaults.text;
    $scope.launcher.alt = $scope.launcher.text + " OpenShift";
    $scope.launcher.image = $scope.getImageUrl($scope.launcher.text)
    $scope.launcher.html = $scope.getHtml($scope.launcher.url, $scope.launcher.alt, $scope.launcher.image);
    $scope.launcher.markdown = $scope.getMarkdown($scope.launcher.url, $scope.launcher.alt, $scope.launcher.image);
  };
  $scope.getDefaults()
  $scope.textchange()
  $scope.urlchange()
}]);
