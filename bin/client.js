require('angular');

angular.module('launchApp', [])
.controller('launchController', ['$scope', function($scope) {
  $scope.launcher = {}; 
  $scope.defaults = {
    'host' : window.location.protocol + "//" + window.location.host + '/',
    'text' : "LAUNCH ON",
    'image': "button.svg",
    'name' : "launch",
    'metrics'        : false,
    'launch_host'    : "https://openshift.redhat.com",
    'launch_path'    : "/app/console/application_type/custom",
    'cartridges'     : "nodejs-0.10",
    'initial_git_url': "https%3A%2F%2Fgithub.com%2Fryanj%2Flaunch-service.git"
  };
  $scope.initDefaults = function(){
    var qs_whitelist = ['text','name','initial_git_url','launch_host','launch_path','cartridges','metrics'];
    var qs = window.location.search.slice(1).split("&");
    qs.forEach(function(param){
      var p = param.split("=");
      if( qs_whitelist.indexOf(p[0]) >= 0){
        $scope.defaults[p[0]] = p[1];
        $scope.launcher[p[0]] = p[1];
        qs_whitelist.splice(qs_whitelist.indexOf(p[0]),1);
      }
    });
    qs_whitelist.push('host');
    qs_whitelist.forEach(function(param){
      $scope.launcher[param] = $scope.defaults[param];
    });
    $scope.launcher.metrics = ( $scope.launcher.metrics == "true") ? true : false;
    $scope.launcher.metrics_controls = ( $scope.defaults.metrics == "true") ? 'inline' : 'none';
    $scope.defaults.url=$scope.getLaunchUrl();
    $scope.launcher.url=$scope.defaults.url;
    $scope.onUrlChange()
    $scope.onTextChange()
  };
  $scope.createLaunchUrl = function(launch_host, launch_path, cartridges, initial_git_url, name, metrics){
    carts = '?';
    cart_params = cartridges.split(',');
    cart_params.forEach(function(cart){
      carts += 'cartridges[]='+cart+'&';
    });
    //if(metrics){
    return launch_host+launch_path+carts+"initial_git_url="+initial_git_url+"&name="+name;
    //}else ...
  }
  $scope.getLaunchUrl = function(){
    return $scope.createLaunchUrl(
      $scope.launcher.launch_host || $scope.defaults.launch_host,
      $scope.launcher.launch_path || $scope.defaults.launch_path,
      $scope.launcher.cartridges || $scope.defaults.cartridges,
      $scope.launcher.initial_git_url || $scope.defaults.initial_git_url,
      $scope.launcher.name || $scope.defaults.name,
      $scope.launcher.metrics
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
  $scope.onUrlChange = function() {
    $scope.launcher.url = $scope.launcher.url || $scope.defaults.url;
    $scope.launcher.html = $scope.getHtml($scope.launcher.url, $scope.launcher.alt, $scope.launcher.image);
    $scope.launcher.markdown = $scope.getMarkdown($scope.launcher.url, $scope.launcher.alt, $scope.launcher.image);
  };
  $scope.onTextChange = function() {
    $scope.launcher.text = $scope.launcher.text || $scope.defaults.text;
    $scope.launcher.alt = $scope.launcher.text + " OpenShift";
    $scope.launcher.image = $scope.getImageUrl($scope.launcher.text)
    $scope.launcher.html = $scope.getHtml($scope.launcher.url, $scope.launcher.alt, $scope.launcher.image);
    $scope.launcher.markdown = $scope.getMarkdown($scope.launcher.url, $scope.launcher.alt, $scope.launcher.image);
  };
  $scope.initDefaults()
}]);
