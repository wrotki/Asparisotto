// http://bkcore.com/blog/3d/webgl-three-js-workflow-tips.html
// http://www.96methods.com/2012/02/three-js-importing-a-model/
//		THREE.AnimationHandler.add( geometry.animation );
// http://blog.tojicode.com/2011/10/building-game-part-3-skinning-animation.html
define(function(){
  function LampDef(injectables){
var OB = window.OtherBrane;
var path = OB.mediaPath;
function Lamp(origin)
{
    Actor.call(this,origin);
    this.components.push(new AnimateLampComponent(this));
}
Lamp.prototype = Object.create(Actor.prototype);
Lamp.prototype.constructor = Lamp;
Lamp.prototype.modelUrl = path + "/3d/lamp.js";
var jsonLoader = new THREE.JSONLoader();
var lampLoader = {
    load: function ( url, callback, texturePath ) {
        jsonLoader.load.call(jsonLoader, url, callback, texturePath);
    }
};
Lamp.prototype.modelLoader = lampLoader;
Lamp.prototype.modelCallback =  function ( model ) {
        Lamp.prototype.model = model;        
        Lamp.prototype.addWaiters(); // Depends on the global window.OtherBrane.threeDScene
};
Lamp.prototype.addWaiters =  function () {// Sucks to have to define this
    Actor.prototype.addMeshesToScene(Lamp.prototype.waiters);
};
Lamp.prototype.initialize = function(scene) {
    Actor.prototype.initialize.call(this,scene);
};
Lamp.prototype.createMeshes = function(){
    var zmesh = new THREE.SkinnedMesh(Lamp.prototype.model, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true } ));
    // Dirty hack to workaround missing property crashing Three.js
    zmesh.boneTexture = new Object();
    // End hack
    zmesh.position.set( this.origin.x, this.origin.y, this.origin.z );
    zmesh.scale.set( 1, 1, 1 );
    zmesh.overdraw = true;
    this.meshes.push(zmesh);
	return true;
};

    return Floor;
  }
  return FloorDef;
});
