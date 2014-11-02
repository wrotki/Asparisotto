define('scene/main',
    [
    "angular", "scene/ThreeDScene", "scene/FlyControls", "scene/FirstPersonControls",  "scene/RequestAnimationFrame","scene/Stats",
    "scene/CameraControls","scene/Constants","scene/Functions","scene/Actor","scene/ColladaLoader",
    // TODO: replace with a variable list obtained from the scene content server
    'skybox/main'/*,'floor/main','models/main','charts/main'*/
    ],
		function(angular,ThreeDScene){
		    var args = arguments;
		    var rModules = [];
		    var sceneObj = {
                animate: function(){
                    require(window.OtherBrane.moduleList, function(){ // The module list come from a list of S3 directories - obtained from /WebGLFirst/Config (dojoconfig.jsp)
                        // TODO consider removing the threeDScene global to enable multiple scenes and renderers on the page
                         for(var mod=0;mod<arguments.length;mod++)
                         {
                             var module = arguments[mod];
                             rModules.push(module);
                         }
                    });
                },
                initialize : function(){
                }
            };
		    angular.module('myApp.scene',['SkyBox'])
                .controller("My3dController",["$scope",function($scope){
                  $scope.moduleList = ['skybox/main','floor/main','models/main','charts/main'];
                }])
		        .value('threeDScene',new ThreeDScene())
		        .value('moduleList',rModules)
		        .value('mediaPath','..')
		        .factory('scene',[function(){
		            return sceneObj;
		        }])
		        .factory('actors',['threeDScene',function(threeDScene){
                        var modules = Array.prototype.slice.call(args,11);
                        angular.forEach(modules,function(module){
                    })
		            return modules;
		        }])
                .run(['threeDScene','actors','skyBox',function(threeDScene,actors){
                    threeDScene.animate();
                }])
                ;
});