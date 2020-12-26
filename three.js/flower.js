
//"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Flower exercise: make a flower
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, document, window, dat, $*/

var camera, scene, renderer, scene;
var cameraControls, effectController;
var sunMesh, merMesh, venMesh, earMesh, marMesh, jupMesh, satMesh, uraMesh, nepMesh;
var r = 35;
var theta = 0;
var theta2 = 0;
var theta3 = 0;
var theta4 = 0;
var theta5 = 0;
var theta6 = 0;
var theta7 = 0;
var theta8 = 0;
var dTheta = 2 * Math.PI / 80;
var dTheta2 = 2 * Math.PI / 90;
var dTheta3 = 2 * Math.PI / 100;
var dTheta4 = 2 * Math.PI / 110;
var dTheta5 = 2 * Math.PI / 130;
var dTheta6 = 2 * Math.PI / 150;
var dTheta7 = 2 * Math.PI / 170;
var dTheta8 = 2 * Math.PI / 190;
var clock = new THREE.Clock();
var gridX = false;
var gridY = false;
var gridZ = false;
var axes = false;
var ground = true;

//var loader = new THREE.TextureLoader();



function fillScene() {
	// LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x222222 );

	var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light.position.set( 700, 900, 800 );

	var light2 = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light2.position.set( -500, 250, -200 );

	//scene.add(ambientLight);
	scene.add(light);
	scene.add(light2);

	//Sun
	const sunMaterial = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/220px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg')});
	var geometry = new THREE.SphereGeometry(166, 32, 16);
	sunMesh = new THREE.Mesh(geometry, sunMaterial);
	sunMesh.position.z = 500;
//	sunMesh.rotation.x += 5;
	scene.add(sunMesh);

	//Mercury
	const merMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	geometry = new THREE.SphereGeometry(8, 32, 16);
  merMesh = new THREE.Mesh(geometry, merMaterial);
	merMesh.position.z = 80;
//	merMesh.rotation.x += 5;
  scene.add(merMesh);

	//Venus
	const venMaterial = new THREE.MeshLambertMaterial({color: 0xff3300});
	geometry = new THREE.SphereGeometry(22, 32, 16);
  venMesh = new THREE.Mesh(geometry, venMaterial);
	venMesh.position.z = 30;
	//venMesh.rotation.x += 5;
  scene.add(venMesh);

	//Earth
	const earMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff});
	geometry = new THREE.SphereGeometry(21, 32, 16);
  earMesh = new THREE.Mesh(geometry, earMaterial);
	earMesh.position.z = 0;
//	earMesh.rotation.x += 5;
  scene.add(earMesh);

	//Mars
	const marMaterial = new THREE.MeshLambertMaterial({color: 0xff4500});
	geometry = new THREE.SphereGeometry(14, 32, 16);
  marMesh = new THREE.Mesh(geometry, marMaterial);
	marMesh.position.z = -110;
//	marMesh.rotation.x += 5;
  scene.add(marMesh);

	//Jupiter
	const jupMaterial = new THREE.MeshLambertMaterial({color: 0xff4500});
	geometry = new THREE.SphereGeometry(64, 32, 16);
  jupMesh = new THREE.Mesh(geometry, jupMaterial);
	jupMesh.position.z = -199;
	//jupMesh.rotation.x += 5;
  scene.add(jupMesh);

	//Saturn
	const satMaterial = new THREE.MeshLambertMaterial({color: 0xff8800});
	geometry = new THREE.SphereGeometry(56, 32, 16);
  satMesh = new THREE.Mesh(geometry, satMaterial);
	satMesh.position.z = -330;
	//satMesh.rotation.x += 5;
  scene.add(satMesh);

	//Uranus
	const uraMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff});
	geometry = new THREE.SphereGeometry(29, 32, 16);
  uraMesh = new THREE.Mesh(geometry, uraMaterial);
	uraMesh.position.z = -440;
//	uraMesh.rotation.x += 5;
  scene.add(uraMesh);

	//Neptune
	const nepMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff});
	geometry = new THREE.SphereGeometry(31, 32, 16);
  nepMesh = new THREE.Mesh(geometry, nepMaterial);
	nepMesh.position.z = -550;
//	nepMesh.rotation.x += 5;
  scene.add(nepMesh);



	//Star Field
	//var starTexture = new THREE.TextureLoader().load( 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/220px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg');
	var starGeometry = new THREE.SphereGeometry(3000, 50, 50);
	var starMaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/6/62/Starsinthesky.jpg')});
	var starField = new THREE.Mesh(starGeometry, starMaterial);
	scene.add(starField);
}


function init() {
	var canvasWidth = 1700;
	var canvasHeight = 1000;
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;

	scene = new THREE.Scene();


		fillScene();

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColorHex( 0xAAAAAA, 1.0 );

	// CAMERA
	camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 10000 );
	// CONTROLS
	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	camera.position.set(-800, 400, 20);
	cameraControls.target.set(0,150,0);

}

function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	//if (canvas.length>0) {
	//	container.removeChild(canvas[0]);
	//}
	container.appendChild( renderer.domElement );
}



let mainLoop = function() {
			 //sunMesh.rotation.y = 2 * 0.05;
			 //sunMesh.position.y += 3;
			 //Now make it go in circles
			 sunMesh.rotation.y += 0.005;

			 theta += dTheta;
			 theta2 += dTheta2*0.9;
			 theta3 += dTheta3*0.9;
			 theta4 += dTheta4*0.9;
			 theta5 += dTheta5*0.7;
			 theta6 += dTheta6*0.7;
			 theta7 += dTheta7*0.7;
			 theta8 += dTheta8*0.7;

			 merMesh.position.x += r * Math.cos(theta);
			 merMesh.position.z += r * Math.sin(theta);

			 venMesh.position.x += r * Math.cos(theta2);
			 venMesh.position.z += r * Math.sin(theta2);

			 marMesh.position.x += r * Math.cos(theta3);
			 marMesh.position.z += r * Math.sin(theta3);

			 earMesh.position.x += r * Math.cos(theta4);
			 earMesh.position.z += r * Math.sin(theta4);

			 jupMesh.position.x += r * Math.cos(theta5);
			 jupMesh.position.z += r * Math.sin(theta5);

			 satMesh.position.x += r * Math.cos(theta6);
			 satMesh.position.z += r * Math.sin(theta6);

			 uraMesh.position.x += r * Math.cos(theta7);
			 uraMesh.position.z += r * Math.sin(theta7);

			 nepMesh.position.x += r * Math.cos(theta8);
			 nepMesh.position.z += r * Math.sin(theta8);


			 render();
			 window.requestAnimationFrame(mainLoop);

	};


function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);

	if ( effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes)
	{
		gridX = effectController.newGridX;
		gridY = effectController.newGridY;
		gridZ = effectController.newGridZ;
		ground = effectController.newGround;
		axes = effectController.newAxes;

		//fillScene();
		//drawHelpers();
	}

	//sunMesh.rotation.x += 0.02;

	renderer.render(scene, camera);
}


function setupGui() {

	effectController = {

		newGridX: gridX,
		newGridY: gridY,
		newGridZ: gridZ,
		newGround: ground,
		newAxes: axes

	};

	var gui = new dat.GUI();
	var h = gui.addFolder("Grid display");
	h.add( effectController, "newGridX").name("Show XZ grid");
	h.add( effectController, "newGridY" ).name("Show YZ grid");
	h.add( effectController, "newGridZ" ).name("Show XY grid");
	h.add( effectController, "newGround" ).name("Show ground");
	h.add( effectController, "newAxes" ).name("Show axes");

}

	init();
setupGui();
	//drawHelpers();
	addToDOM();
mainLoop();
