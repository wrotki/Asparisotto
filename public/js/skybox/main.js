define(["skybox/SkyBox"], 
        function(SkyBoxDef){
            // Define SkyBox class here
            //
            var skyBoxModule = angular.module('SkyBox',[]);
            skyBoxModule.factory('skyBox',['mediaPath','threeDScene',function(mediaPath,threeDScene){
                var injectables = { 'basePath': mediaPath };
                var SkyBox = SkyBoxDef(injectables);
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