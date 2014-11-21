require('angular');

angular.module('launchApp', [])
.controller('launchController', ['$scope', function($scope) {
  $scope.launcher = {}; 
  $scope.qs_allowed = ['text','name','initial_git_url','launch_host','launch_path','path','cartridges']
  $scope.getDefaults = function(){
    window.location.search.slice(1).split("&").forEach(function(param){
      var p = param.split("=");
      if( $scope.qs_allowed.indexOf(p[0]) >= 0){
        $scope.defaults[p[0]] = p[1];
      }
    })
    $scope.defaults.url=$scope.getLaunchUrl();
    $scope.launcher.url=$scope.defaults.url;
  };
  $scope.defaults = {
    'host' : window.location.protocol + "//" + window.location.host + '/',
    'text' : "LAUNCH ON",
    'image': "button.svg",
    'name' : "launch",
    'launch_host'    : "https://openshift.redhat.com",
    'launch_path'    : "/app/console/application_type/custom",
    'cartridges'     : "nodejs-0.10",
    'initial_git_url': "https%3A%2F%2Fgithub.com%2Fryanj%2Flaunch-service.git"
  }
  $scope.createLaunchUrl = function(launch_host, launch_path, cartridges, initial_git_url, name){
    carts = '?';
    cart_params = cartridges.split(',');
    cart_params.forEach(function(cart){
      carts += 'cartridges[]='+cart+'&';
    });
    return launch_host+launch_path+carts+"initial_git_url="+initial_git_url+"&name="+name 
  }
  $scope.getLaunchUrl = function(){
    return $scope.createLaunchUrl(
      $scope.defaults.launch_host,
      $scope.defaults.launch_path,
      $scope.defaults.cartridges,
      $scope.defaults.initial_git_url,
      $scope.defaults.name
    );
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
