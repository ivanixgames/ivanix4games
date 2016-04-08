var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas,true);
var img = Ivx.args().img;
if(!img) {
    img = 'sampleLandscape3.jpg';
}

var addTexture = function(target, scene) {
    var mat = new BABYLON.StandardMaterial('material02', scene);
    var txt = new BABYLON.Texture('../assets/' + img, scene);
	target.material = mat;
	mat.diffuseTexture = txt; 
};
var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    //Adding a light
    var light = new BABYLON.PointLight('Omni', new BABYLON.Vector3(20, 20, 100), scene);

    //Adding an Arc Rotate Camera
    var camera = new BABYLON.ArcRotateCamera('Camera', 2, 1, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);

    // The first parameter can be used to specify which mesh to import. Here we import all meshes
    BABYLON.SceneLoader.ImportMesh('', '', 'coffeecup.babylon?', scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        camera.target = newMeshes[0];
        addTexture(camera.target, scene);
    });

    // Move the light with the camera
    scene.registerBeforeRender(function () {
        light.position = camera.position;
    });

    return scene;
}

var scene  = createScene();
engine.runRenderLoop(function() {
	scene.render();
});

