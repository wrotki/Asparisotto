define(function(){
  function ShoeDef(injectables){
    // http://bkcore.com/blog/3d/webgl-three-js-workflow-tips.html
    var basePath = injectables["basePath"]; // Parameter injected by Angular
    function Shoe(origin)
    {
        Actor.call(this,origin);
    }
    Shoe.prototype = Object.create(Actor.prototype);
    Shoe.prototype.constructor = Shoe;
    Shoe.prototype.createMeshes = function(){
        var zmesh = new THREE.Mesh(Shoe.prototype.model, new THREE.MeshFaceMaterial(Shoe.prototype.materials));
        zmesh.position.set( this.origin.x, this.origin.y, this.origin.z );
        zmesh.scale.set( 1, 1, 1 );
        zmesh.overdraw = true;
        this.meshes.push(zmesh);
        return true;
    };
    var path = basePath;
    Shoe.prototype.modelUrl = path + "/3d/shoe.js";
    Shoe.prototype.jsonLoader = new THREE.JSONLoader();
    Shoe.prototype.modelLoader = {
        load: function ( url, callback, texturePath ) {
            Shoe.prototype.jsonLoader.load(url, callback, texturePath);
        }
    };
    Shoe.prototype.modelCallback = function( geometry, materials ){
        Shoe.prototype.model = geometry;
        Shoe.prototype.materials = materials;
        Shoe.prototype.addWaiters(); // Depends on the global window.OtherBrane.threeDScene
    };
    Shoe.prototype.addWaiters =  function () {
        Actor.prototype.addMeshesToScene(Shoe.prototype.waiters);
    };
    Shoe.prototype.initialize = function(scene) {
        Actor.prototype.initialize.call(this,scene);
    };
    Shoe.prototype.update = function(){
        if(!this.meshes || ! this.meshes[0]){
            return;
        }
        var mesh = this.meshes[0];
        var x = Date.now()/1000;
        var y = Date.now()/1000;
        var z = Date.now()/1000;
        mesh.position.x = this.origin.x + Math.sin(x) * 100;
        mesh.position.y = this.origin.y + Math.cos(y) * 100;
        mesh.position.z = this.origin.z + Math.sin(z) * 100;
    };
    return Shoe;
  }
  return ShoeDef;
});