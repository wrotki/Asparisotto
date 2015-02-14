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
		    angular.module('myApp.scene',['SkyBox','Floor','Models','Charts']) // TODO: replace with a variable list obtained from the scene content server
		        .value('threeDScene',new ThreeDScene())
		        .value('mediaPath','/assets')
		        .factory('scene',[function(){
		            return sceneObj;
		        }])
                .run(['threeDScene','skyBox','floor','models','charts',function(threeDScene){  // TODO: replace with a variable list obtained from the scene content server
                    // Declaring 'skyBox', 'floor' as dependencies triggers
                    // module initializers populating the scene with objects
                    threeDScene.animate();
                }])
                ;
});