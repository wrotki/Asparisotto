define(["skybox/SkyBox"], 
        function(SkyBox){
            var skyBoxModule = angular.module('SkyBox',[]);
            skyBoxModule.factory('skyBox',['mediaPath','threeDScene',function(mediaPath,threeDScene){
                var skyBox = new SkyBox({x: 0, y: 0, z: 0});
                skyBox.basePath = mediaPath;
                threeDScene.addActor(skyBox);
                return skyBox;
            }])
            ;
            return {
//                initialize : function(scene){
//                     scene.addActor(new SkyBox({x: 0, y: 0, z: 0}));
//                },
//                ngmodule: skyBoxModule
            };
});