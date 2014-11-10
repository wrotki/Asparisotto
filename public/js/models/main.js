define(["models/Shoe"],/* "models/AnimateLampComponent", "models/Lamp",
    "models/LampCollada", "models/BoxMan", "models/BoxManBehaviorComponent"]*/
		function(ShoeDef/*,AnimateLampComponent,LampDef*/){
        var modelsModule = angular.module('Models',[]);
        modelsModule
            .factory('models',['mediaPath','threeDScene',
                function(mediaPath,threeDScene){
                    var injectables = { 'basePath': mediaPath };
                    var Shoe = ShoeDef(injectables); // ShoeDef is a function constructing the Shoe class
                    var shoe = new Shoe({x: 0, y: 0, z: 0});
                    threeDScene.addActor(shoe);
                    return shoe;
                    }])
            // .factory(...
            ;
//    		return {
//    		    initialize : function(scene){
//                    scene.addActor(new Shoe({x: 0, y:80, z: 0}));
////                    scene.addActor(new LampCollada({x: -500, y: 0, z: -500}));
////                    scene.addActor(new Lamp({x: -500, y: 0, z: 500}));
////                    for(var i = 0; i < 43; i++){
////                        scene.addActor(new BoxMan({x: 1000.0*(Math.random()-0.5), y: 10, z: 1000.0*(Math.random()-0.5)}));
//////                        scene.addActor(new BoxMan({x: 0, y: 10, z: 0}));
////                    }
//    		    }
//    		};
});