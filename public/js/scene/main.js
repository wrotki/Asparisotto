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
//                        window.OtherBrane.threeDScene = this.threeDScene = threeDScene;
                         for(var mod=0;mod<arguments.length;mod++)
                         {
                             var module = arguments[mod];
                             rModules.push(module);
//                             module.initialize(this.threeDScene);
                         }
//                        this.threeDScene.animate();
                    });
                },
                initialize : function(){
                }
            };
		    angular.module('myApp.scene',['SkyBox'])
                .controller("My3dController",["$scope",function($scope){
                  $scope.moduleList = ['skybox/main','floor/main','models/main','charts/main'];
                }])
                //http://stackoverflow.com/questions/19938419/angular-requirejs-loading-in-the-wrong-order
		        .value('threeDScene',new ThreeDScene())
		        .value('moduleList',rModules)
		        .value('mediaPath','..')
		        .factory('scene',[function(){
		            return sceneObj;
		        }])
		        .factory('actors',['threeDScene',function(threeDScene){
                        var modules = Array.prototype.slice.call(args,11);
                        angular.forEach(modules,function(module){
//                        module.initialize(threeDScene);
//                      var m = new module();
//                      m.initialize(threeDScene);
                    })
		            return modules;
		        }])
                .run(['threeDScene','actors','skyBox',function(threeDScene,actors){
                    threeDScene.animate();
                }])
                ;
});