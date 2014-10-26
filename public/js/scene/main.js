define('scene/main',
    [
    "angular", "scene/ThreeDScene", "scene/FlyControls", "scene/FirstPersonControls",  "scene/RequestAnimationFrame","scene/Stats",
    "scene/CameraControls","scene/Constants","scene/Functions","scene/Actor","scene/ColladaLoader",
    // TODO: replace with a variable list obtained from the scene content server
    'skybox/main','floor/main','models/main','charts/main'
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
		    angular.module('myApp.scene',[])
                .controller("My3dController",["$scope",function($scope){
                  $scope.moduleList = ['skybox/main','floor/main','models/main','charts/main'];
                }])
                //http://stackoverflow.com/questions/19938419/angular-requirejs-loading-in-the-wrong-order
		        .value('threeDScene',new ThreeDScene())
		        .value('moduleList',rModules)
		        .factory('scene',[function(){
		            return sceneObj;
		        }])
                .run(['scene','moduleList','threeDScene',function(scene,moduleList,threeDScene){
                    var moduleList = ['skybox/main','floor/main','models/main','charts/main'];
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
                    var modulesToInitialize = Array.prototype.slice.call(args,11);
                    angular.forEach(modulesToInitialize,function(module){
                      module.initialize(threeDScene);
                    })
                    threeDScene.animate();
                }])
                ;
});