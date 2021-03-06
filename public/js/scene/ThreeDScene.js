define(
    [
     "scene/FirstPersonControls","scene/FlyControls"
    ], function(FirstPersonControls){
//https://gist.github.com/jonnyreeves/2474026

    function ThreeDScene(){
        if (!(this instanceof ThreeDScene)) {
            throw new TypeError("Constructor cannot be called as a function.");
        }
        this.moveEnabled = false;
        this.mouse = new THREE.Vector3( 0, 0, 1 );
        this.projector = new THREE.Projector();
        var container = window.document.createElement( 'div' );
        window.document.body.appendChild( container );
        this.createStats(container);
        var renderer = this.createRenderer();
        var scene = this.scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0xffffff, 1, 100000 );
        var cameraPosition = new THREE.Vector3(-2000,300,-300);
        var lookAt = new THREE.Vector3(0,0,-2000);
        var camera = this.createCamera(cameraPosition, lookAt);
        this.createLights();
        this.clock = new THREE.Clock();
        this.createControls(camera);

        var SCALE = 0.7;
        var MARGIN = 0;
        var WIDTH = window.innerWidth;
        var HEIGHT = window.innerHeight - 2 * MARGIN;
        function onWindowResize( event ) {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            WIDTH = window.innerWidth;
            HEIGHT = window.innerHeight - 2 * MARGIN;
            //effectSSAO.uniforms[ 'size' ].value.set( Math.floor( SCALE * WIDTH ), Math.floor( SCALE * HEIGHT ) );
            renderer.setSize( WIDTH, HEIGHT );
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();
        }
        window.addEventListener( 'resize', onWindowResize, false );

        var thisScene = this;
        function switchControls(){
            // State pattern
            var tmpControls = thisScene.backupControls;
            thisScene.backupControls = thisScene.controls;
            thisScene.controls = tmpControls;
            return true;
        }
    //	var controlsSwitch = dojo.query("select").forEach(
    //        function(node, index, arr){
    //	        node.addEventListener('change',switchControls);
    //	        node.addEventListener('click',function(){
    //	            console.log('click');
    //	            return true;
    //	        });
    //	        node.addEventListener('focus',function(){
    //	            console.log('focus');
    //	            return true;
    //	        });
    //        });

        this.actors = [];
        this.animations = [];
    }

    ThreeDScene.prototype = {
        constructor: ThreeDScene,
        createStats: function(container){
                var stats = this.stats = new Stats();
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.top = '55px';
                stats.domElement.style.left = '5px';
                stats.domElement.style.zIndex = 100;
                container.appendChild( stats.domElement );
            },
        createRenderer: function(){
            var w = window.innerWidth - 10, h = window.innerHeight - 10 ;
            var canvasContainer = window.document.createElement( 'div' );
            canvasContainer.style.position = 'absolute';
            canvasContainer.style.top = '55px';
            canvasContainer.style.left = '5px';
            canvasContainer.style.border = '5px';
            canvasContainer.style.zIndex = 10;
            window.document.body.appendChild( canvasContainer );
        //    var viewport = window.getBox();
            var renderer = this.renderer = new THREE.WebGLRenderer();
            renderer.sortObjects = false;
            renderer.setSize( w, h );
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = '10px';
            renderer.domElement.style.left = '10px';
            renderer.domElement.style.border = '1px';
            canvasContainer.appendChild( renderer.domElement );
            return renderer;
            },
        createCamera: function(position,lookAt){
            //    var viewport = window.getBox();
                var w = window.innerWidth - 10, h = window.innerHeight -10 ;
                var camera = this.camera = new THREE.PerspectiveCamera( 45, w / h, 1, 150000 );
                // camera = new THREE.OrthographicCamera( -1, 1, 1,
                // -1, 0.1, 100.0 );
                camera.position = position;
                camera.lookAt(lookAt);
                //camera.target.position.copy( scene.position );
                //camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
                //camera.rotation.y = -90 * (Math.PI / 180);
                //this.scene.add( camera );
                return camera;
            },
        createControls: function(camera){
                var fpControls = new THREE.FirstPersonControls( camera );
                fpControls.movementSpeed = 1000;
                fpControls.lookSpeed = 0.125;
                fpControls.noFly = false;
                fpControls.lookVertical = true;
                fpControls.freeze = false;
                var flyControls = new THREE.FlyControls( camera );
                flyControls.rollSpeed = 0.05;
                this.controls = fpControls;
                this.backupControls = flyControls;
            },
        createLights: function(){
                var light = new THREE.DirectionalLight();
                //light.color = 0x00FFFF;
                light.position.set( 170, 330, 160 );
                this.scene.add(light);
                light = new THREE.DirectionalLight();
                light.position.set( -50, 50, 50 );
                light.target.position.set(0,0,0);
                this.scene.add(light);
                light = new THREE.DirectionalLight();
                //light.color = 0xFFFF00;
                light.position.set( 50, 50, -50 );
                light.target.position.set(0,0,0);
                this.scene.add(light);
            },
        animate: function(){
                requestAnimationFrame( ThreeDScene.prototype.animate.bind(this) );
                this.update();
                this.render();
            },
        update: function() {
                this.updateActors();
                for(var i=0;i<this.actors.length;i++){
                    if (this.actors[i].update) {
                        this.actors[i].update();
                    }
                }
            },
        render: function() {
                var delta = this.clock.getDelta();
                this.controls.update( delta );
                THREE.AnimationHandler.update( delta );
                //camera.target.position.copy( this.scene.position );
                this.stats.update();
                //this.morphAnimatedMeshes();
                this.renderer.render( this.scene, this.camera );
            },
        dstep: -10,
        startAnimation: function () {
                for(var i = 0; i < this.animations.length; i++) {
                    this.animations[ i ].offset = 0.05 * Math.random();
                    this.animations[ i ].play();
                }
                dz = this.dstep;
                playback = true;
            },
        addActor: function(actor){
                this.actors.push(actor);
                if(!actor.initialized && actor.initialize){
                    actor.initialize(this);
                }
            },
        addAnimation: function(mesh){
                if(mesh && mesh.geometry && mesh.geometry.animation){
                    THREE.AnimationHandler.add( mesh.geometry.animation );
                    var animation = new THREE.Animation( mesh, "take_001" );
                    this.animations.push( animation );
                }
            },
        updateActors: function(){
                for(var i=0; i<this.actors.length;i++){
                    var actor = this.actors[i];
                    // TODO eliminate this, objects should self initialize (load assets and add themselves to the scene when ready), as Shoe does
                    if(actor.state == ACTOR_STATE.MODEL_LOADED){
                        if(!actor.meshesCreated && actor.createMeshes){
                            actor.createMeshes();
                        }
                        // TODO - move to addActor after all actor classes  refactored to self-enclosed async loading
                        for(var m=0;m<actor.meshes.length;m++){
                            var mesh = actor.meshes[m];
                            this.scene.add(mesh);
                            this.addAnimation(mesh);
                        }
                        actor.state = ACTOR_STATE.ACTOR_SHOWN;
                    }
                }
                this.startAnimation();
            }
    };
    return ThreeDScene;
});