define(["floor/Floor"], 
    function(FloorDef){ // FloorDef is a function constructing the Floor class
        var floorModule = angular.module('Floor',[]);
        floorModule.factory('floor',['mediaPath','threeDScene',function(mediaPath,threeDScene){
            var injectables = { 'basePath': mediaPath };
            var Floor = FloorDef(injectables); //FloorDef is a function constructing the Floor class
            var floor = new Floor({x: 0, y: 0, z: 0});
            threeDScene.addActor(floor);
            return floor;
        }])
        ;
    });