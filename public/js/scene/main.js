define([
    "angular", "scene/FlyControls", "scene/FirstPersonControls",  "scene/RequestAnimationFrame","scene/Stats",
    "scene/CameraControls","scene/ThreeDScene","scene/Constants","scene/Functions","scene/Actor","scene/ColladaLoader"
    ],
		function(angular){
		    var scene = {
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
		        .factory('scene',['$scope',function($scope){
		            return scene;
		    }]);
			return scene;
});