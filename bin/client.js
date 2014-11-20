require('angular');

angular.module('launchApp', [])
.controller('launchController', ['$scope', function($scope) {
  $scope.launcher = {}; 
  $scope.defaults = {
    'image_host': window.location.protocol + "//" + window.location.host + '/', 
    'text' : process.env.DEFAULT_BTN_TEXT   || "LAUNCH ON",
    'image': process.env.DEFAULT_IMG_URL    || "button.svg",
    'url'  : process.env.DEFAULT_LAUNCH_URL || 'https://openshift.redhat.com/app/console/application_type/custom?cartridges%5B%5D=nodejs-0.10&initial_git_url=https%3A%2F%2Fgithub.com%2Fryanj%2Flaunch-service.git&name=launch'
  }
  $scope.getMarkdown = function(url, alt, image){
    return "[![" + image + "](" + alt + ")](" + url + ")";
  };
  $scope.getHtml = function(url, alt, image){
    return "<a href=\"" + url + "\"><img alt=\"" + alt + "\" src=\"" + image + "\" /></a>";
  };
  $scope.getImageUrl = function(text){
    return $scope.defaults.image_host + 'button/'+text+'.svg'
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
  $scope.textchange()
  $scope.urlchange()
}]);
