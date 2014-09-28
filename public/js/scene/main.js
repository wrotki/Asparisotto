define([
    "angular", "scene/FlyControls", "scene/FirstPersonControls",  "scene/RequestAnimationFrame","scene/Stats",
    "scene/CameraControls","scene/ThreeDScene","scene/Constants","scene/Functions","scene/Actor","scene/ColladaLoader"
    ],
		function(angular){
		    var sceneObj = {
                animate: function(){
                    require(window.OtherBrane.moduleList, function(){ // The module list come from a list of S3 directories - obtained from /WebGLFirst/Config (dojoconfig.jsp)
        //					        return;
                        // TODO consider removing the threeDScene global to enable multiple scenes and renderers on the page
                        window.OtherBrane.threeDScene = this.threeDScene = new ThreeDScene();
                         for(var mod=0;mod<arguments.length;mod++)
                         {
                             var module = arguments[mod];
                             module.initialize(this.threeDScene);
                         }
                        this.threeDScene.animate();
                    });
                },
                initialize : function(){
                }
            };
		    angular.module('myApp.scene',[])
                .controller("My3dController",["$scope",function($scope){
                  $scope.moduleList = ['skybox/main','floor/main','models/main','charts/main'];
                }])
		        .factory('scene',[function(){
		            return sceneObj;
		        }])
                .run(['scene',function(scene){
                    scene.animate();
                }])
                ;
//			return scene;
});