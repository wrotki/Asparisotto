define(function(){
  function SkyBoxDef(injectables){
    // https://github.com/mrdoob/three.js/wiki
    // http://stemkoski.github.io/Three.js/
    function SkyBox(origin){
        Actor.call(this,origin);
    }
    SkyBox.prototype = Object.create(Actor.prototype);
    SkyBox.prototype.createMeshes = function(){
        var basePath = injectables["basePath"]; // Parameter injected by Angular
        var materialArray = [];
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basePath + "/3d/" + "posx.jpg" ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basePath + "/3d/" + "posy.jpg" ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basePath + "/3d/" + "posz.jpg" ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basePath + "/3d/" + "negx.jpg" ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basePath + "/3d/" + "negy.jpg" ) }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basePath + "/3d/" + "negz.jpg" ) }));
        for (var i = 0; i < 6; i++){
           materialArray[i].side = THREE.DoubleSide; //THREE.BackSide;
        }
        var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );
        var skyboxGeom = new THREE.CubeGeometry( 100000, 100000, 100000, 1, 1, 1 );
        var skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
        var zmesh = skybox;
        zmesh.position.x = this.origin.x;
        zmesh.position.y = this.origin.y;
        zmesh.position.z = this.origin.z;
        this.meshes.push(zmesh);
        return true;
    };
    SkyBox.prototype.modelCallback = function(geometry, materials) {
                Actor.prototype.addWaiters.call(this);
    };
    return SkyBox;
  }
  return SkyBoxDef;
}
);
