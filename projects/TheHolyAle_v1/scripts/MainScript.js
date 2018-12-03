var sirinaCanvasa;
var visinaCanvasa;
var gameOverReason; //0--enemi  1--time
var timeToGamerOver=0; //ko konca z rianjem naj zaključi igro
var urar; //za eno preverjanja zvoka nekje spodaj
var ceSmoNaIntroju=1;
var angleKokosa=180;

// Global variable definitionvar canvas;
var canvas;
var gl;
var shaderProgram;

// Buffers
    var worldVertexPositionBuffer = null;
    var worldVertexTextureCoordBuffer = null;

  //enemy buffers
    var enemyVertexPositionBuffer = null;
    var enemyVertexTextureCoordBuffer = null;
    var enemyVertexIndexBuffer = null;
    var enemyVertexNormalBuffer = null;
  //za navadno kocko  
    var kockaVertexPositionBuffer = null;
    var kockaVertexTextureCoordBuffer = null;
    var kockaVertexIndexBuffer = null;
    var kockaVertexNormalBuffer = null;

  //drevo buffers
    var debloVertexPositionBuffer = null;
    var debloVertexTextureCoordBuffer = null;
    var debloVertexIndexBuffer = null;
    var debloVertexNormalBuffer = null;

    var krosnjaVertexPositionBuffer = null;
    var krosnjaVertexNormalBuffer = null;
    var krosnjaVertexTextureCoordBuffer = null;
    var krosnjaVertexIndexBuffer = null;
	
    var kokosVertexPositionBuffer = null;
    var kokosVertexNormalBuffer = null;
    var kokosVertexTextureCoordBuffer = null;
    var kokosVertexIndexBuffer = null;

// Model-view and projection matrix and model-view matrix stack
var mvMatrixStack = [];
var mvMatrix = mat4.create();
var pMatrix = mat4.create();

// Textures
var wallTexture;
var enemyTexture;
var enemyTexture2;
var debloTexture;
var skyTexture;
var leavesTexture;
var steneTexture;
var kokosTexture;

// Variable that stores  loading state of textures.
//var texturesLoaded = false;
var texturesLoadedNum = 0;

// Keyboard handling helper variable for reading the status of keys
var currentlyPressedKeys = {};

// Variables for storing current position and speed
var pitch = 0;
var pitchRate = 0;
var yaw = 0;
var yawRate = 0;
var xPosition = 0;
var yPosition = 0.4;
var zPosition = 0;
var speed = 0;
var lastPicth = 0;
var strafe = 0;
var strafeSpeed = 0;

//Postavitev Dreves
  //Ko se izrisujejo -- pomiki eden od drugega
    //var prvi = [2,-8,3,2,9,-5,4,-1,-2,-7,-2,5];
    //var drugi = [0,0,4,4,0,-2,-4,-10,3,2,-4, -1];

  //absolutne koordinate dreves -- za kolizon detection
    var xDrevesa = [1,  -3, -1.5, -0.5,    4,  1.5,  3.5,  3,    1.5,  -1.5,  -2.5,   0];
    var yDrevesa = [0,   0,    2,    4,    4,    3,    1, -4, -2,  -1.5,  -3.5,  -4];

//absolutne koordinate GRMOV --> 20 kos bo narisal .. spodaj se odkomentirat funkcijo .. svet prevec nasicen zato sem zakomentiral
  //var xGrma = [];
  //var yGrma = [];

//enemy position vars
var enemyXPosition = [0, 1, -1];
var enemyZPosition = [-2, -1, -3];
var enemyYPosition = [0.25, 0.25, 0.25];

var enemyIsNear = [false, false, false];
var enemyHealth = [2, 2, 2];
var enemyAttackInMotion = [false, false, false];
var enemyCount = 1;
var enemyTreeCollisionX = [false, false, false];
var enemyTreeCollisionZ = [false, false, false];

var playerInRange = [false, false, false];
var playerHealth=6;
var playerAttackInMotion = false;
var score = 0;
var timeLeft = 45.0;    //timer

var kokosPresent = true;
var kokosSpawn = false;
var kokosX = 0;
var kokosY = 0.1;
var kokosZ = 2;

var lighting = true;

var soundStanje=1; //play music
var kokos = new Audio("./sounds/kokos.wav");
var klikam = new Audio("./sounds/click.wav");
var nonepass = new Audio("./sounds/nonepass.wav");
var wushMec = new Audio("./sounds/sword.wav");
var getKokos = new Audio("./sounds/getKokos.wav"); 
var hit = new Audio("./sounds/hit.wav");
var auch = new Audio("./sounds/auch.wav");
var wilhelm = new Audio("./sounds/wilhelm.wav");

// Used to make us "jog" up and down as we move forward.
var joggingAngle = 0;

// Helper variable for animation
var lastTime = 0;

function playerAttackDelay() {
  
  var delay = 450;

  setTimeout(function() {
    playerAttackInMotion = false;
  }, delay);
}

function enemyAttack(i) {
  
  var delay = 956;

  setTimeout(function() {
    enemyAttackInMotion[i] = false;
  }, delay);
}

function kokosDelay() {
	
	var delay = 15000;

  setTimeout(function() {
	kokosX = (Math.random() * 8) -4;
	kokosZ = (Math.random() * 8) -4;
	kokosY = 0.1;
	while (kokosCollision()) {
		
		kokosX = (Math.random() * 8) -4;
		kokosZ = (Math.random() * 8) -4;
		kokosY = 0.1;
	}
    kokosPresent = true;
  }, delay);
}

function spawnEnemy(i) {
  
  var delay = 3000;

  setTimeout(function() {
	enemyXPosition[i] = (Math.random() * 8) -4;
	enemyZPosition[i] = (Math.random() * 8) -4;
	enemyYPosition[i] = 0.25;
	while (enemyCollision(i,0,"x") && enemyCollision(i,0,"z")) {
		  
		enemyXPosition[i] = (Math.random() * 8) -4;
		enemyZPosition[i] = (Math.random() * 8) -4;
		enemyYPosition[i] = 0.25;
	}
    enemyHealth[i] = 2;
  }, delay);
}

function gameOver(){
 var higScore = localStorage.getItem('najvecTock');
 if(soundStanje==1) wilhelm.play();
 if(score>higScore){
  higScore=score;
  localStorage.setItem('najvecTock', score);
 }

 alert("GAME OVER\n"+gameOverReason+"\n\nYour Score: " + score + "\nHigh Score: " +higScore +"\n\nPress OK to play again");
 location.reload();
}

function timeCounter() {
  
  timeLeft -= 0.015;
  if (timeLeft < 15) {
    
    enemyCount = 3;
  }
  else if (timeLeft < 30) {
    
    enemyCount = 2;
  }
  if (timeLeft < 0) {
    gameOverReason="Time's up";
    gameOver();
  }
  document.getElementById("time").innerHTML = "Time left: " + Math.floor(timeLeft);
}

function enemyCollision(i, offset, axis) {
	
	for (var a=0; a<xDrevesa.length; a++) {
		
		if (axis == "x") {
			
			var xDistance = Math.abs((enemyXPosition[i]+offset+10) - (xDrevesa[a]+10));
			var zDistance = Math.abs((enemyZPosition[i]+10) - (yDrevesa[a]+10));
		}
		else {
			
			var xDistance = Math.abs((enemyXPosition[i]+10) - (xDrevesa[a]+10));
			var zDistance = Math.abs((enemyZPosition[i]+offset+10) - (yDrevesa[a]+10));
		}
		if (xDistance <= 0.25 && zDistance <= 0.25) {
			
			return true;
		}
	}
	
	return false;
}

function kokosCollision() {
	
	for (var a=0; a<xDrevesa.length; a++) {
		
		var xDistance = Math.abs((kokosX+10) - (xDrevesa[a]+10));
		var zDistance = Math.abs((kokosZ+10) - (yDrevesa[a]+10));
		
		if (xDistance <= 0.25 && zDistance <= 0.25) {
			
			return true;
		}
	}
	
	return false;
}


//stuff, ki pac mora bit tukaj ad bo vse delalo
function mvPushMatrix() {
  var copy = mat4.create();
  mat4.set(mvMatrix, copy);
  mvMatrixStack.push(copy);
}
function mvPopMatrix() {
  if (mvMatrixStack.length == 0) {
    throw "Invalid popMatrix!";
  }
  mvMatrix = mvMatrixStack.pop();
}
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
function initGL(canvas) {
  var gl = null;
  try {
    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch(e) {}

  // If we don't have a GL context, give up now
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
  }
  return gl;
}
function getShader(gl, id) {
  var shaderScript = document.getElementById(id);

  // Didn't find an element with the specified ID; abort.
  if (!shaderScript) {
    return null;
  }
  
  // Walk through the source element's children, building the
  // shader source string.
  var shaderSource = "";
  var currentChild = shaderScript.firstChild;
  while (currentChild) {
    if (currentChild.nodeType == 3) {
        shaderSource += currentChild.textContent;
    }
    currentChild = currentChild.nextSibling;
  }
  
  // Now figure out what type of shader script we have,
  // based on its MIME type.
  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;  // Unknown shader type
  }

  // Send the source to the shader object
  gl.shaderSource(shader, shaderSource);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}
function initShaders() {
  var fragmentShader = getShader(gl, "shader-fs");
  var vertexShader = getShader(gl, "shader-vs");
  
  // Create the shader program
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  
  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }
  
  // start using shading program for rendering
  gl.useProgram(shaderProgram);
  
  // store location of aVertexPosition variable defined in shader
  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");

  // turn on vertex position attribute at specified position
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  
   // store location of aVertexNormal variable defined in shader
  shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");

  // turn on vertex normal attribute at specified position
  gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

  // store location of aVertexNormal variable defined in shader
  shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");

  // store location of aTextureCoord variable defined in shader
  gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

  // store location of uPMatrix variable defined in shader - projection matrix 
  shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  // store location of uMVMatrix variable defined in shader - model-view matrix 
  shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  // store location of uNMatrix variable defined in shader - normal matrix 
  shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
  // store location of uSampler variable defined in shader
  shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
  
  // store location of uUseLighting variable defined in shader
  shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");

  // store location of uAmbientColor variable defined in shader
  shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
  
  // store location of uLightingDirection variable defined in shader
  shaderProgram.pointLightingLocationUniform = gl.getUniformLocation(shaderProgram, "uPointLightingLocation");
  // store location of uDirectionalColor variable defined in shader
  shaderProgram.pointLightingColorUniform = gl.getUniformLocation(shaderProgram, "uPointLightingColor");
}
function setMatrixUniforms() {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
  
  var normalMatrix = mat3.create();
  mat4.toInverseMat3(mvMatrix, normalMatrix);
  mat3.transpose(normalMatrix);
  gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
}

//TEXTURES
function initTextures() {
  wallTexture = gl.createTexture();
  wallTexture.image = new Image();
  wallTexture.image.onload = function () {
    handleTextureLoaded(wallTexture)
  }
  wallTexture.image.src = "./assets/trava.jpg";

  leavesTexture = gl.createTexture();
  leavesTexture.image = new Image();
  leavesTexture.image.onload = function () {
    handleTextureLoaded(leavesTexture)
  }
  leavesTexture.image.src = "./assets/list.jpg";

  steneTexture = gl.createTexture();
  steneTexture.image = new Image();
  steneTexture.image.onload = function () {
    handleTextureLoaded(steneTexture)
  }
  steneTexture.image.src = "./assets/gozd.jpg";

  skyTexture = gl.createTexture();
  skyTexture.image = new Image();
  skyTexture.image.onload = function () {
    handleTextureLoaded(skyTexture)
  }
  skyTexture.image.src = "./assets/nebo.jpg";

  enemyTexture = gl.createTexture();
  enemyTexture.image = new Image();
  enemyTexture.image.onload = function () {
    handleTextureLoaded(enemyTexture)
  }
  enemyTexture.image.src = "./assets/helmet2.jpg";  

  debloTexture = gl.createTexture();
  debloTexture.image = new Image();
  debloTexture.image.onload = function () {
    handleTextureLoaded(debloTexture)
  }
  debloTexture.image.src = "./assets/deblo.jpg";  

  enemyTexture2 = gl.createTexture();
  enemyTexture2.image = new Image();
  enemyTexture2.image.onload = function () {
    handleTextureLoaded(enemyTexture2)
  }
  enemyTexture2.image.src = "./assets/helmet2Hurt.jpg";
  
  kokosTexture = gl.createTexture();
  kokosTexture.image = new Image();
  kokosTexture.image.onload = function () {
    handleTextureLoaded(kokosTexture)
  }
  kokosTexture.image.src = "./assets/kokos.jpg";
}
function handleTextureLoaded(texture) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  // Third texture usus Linear interpolation approximation with nearest Mipmap selection
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);

  gl.bindTexture(gl.TEXTURE_2D, null);

  // when texture loading is finished we can draw scene.
  //texturesLoaded = true;
  texturesLoadedNum++;
}

//NARISI VSE TO
function drawScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Vse buffere preverit ali so "null"
  if (
    worldVertexPositionBuffer == null ||
    worldVertexTextureCoordBuffer == null ||
    enemyVertexPositionBuffer == null ||
    enemyVertexTextureCoordBuffer == null ||
    enemyVertexIndexBuffer ==null ||
    enemyVertexNormalBuffer== null ||
    kockaVertexPositionBuffer ==null ||
    kockaVertexTextureCoordBuffer ==null ||
    kockaVertexIndexBuffer ==null ||
    kockaVertexNormalBuffer== null ||
    debloVertexPositionBuffer== null ||
    debloVertexTextureCoordBuffer ==null ||
    debloVertexIndexBuffer ==null ||
    debloVertexNormalBuffer== null ||
    krosnjaVertexPositionBuffer== null ||
    krosnjaVertexNormalBuffer ==null ||
    krosnjaVertexTextureCoordBuffer ==null ||
    krosnjaVertexIndexBuffer ==null ||
    kokosVertexPositionBuffer== null ||
    kokosVertexNormalBuffer== null ||
    kokosVertexTextureCoordBuffer == null ||
    kokosVertexIndexBuffer ==null
    ) {
    return;
  }


  mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
  mat4.identity(mvMatrix);  // risi na srdini polja

  mat4.rotate(mvMatrix, degToRad(-pitch), [1, 0, 0]);
  mat4.rotate(mvMatrix, degToRad(-yaw), [0, 1, 0]);
  mat4.translate(mvMatrix, [-xPosition, -yPosition, -zPosition]);

//NARISI RAVEN SVET
  // Vklopi teksturo
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, wallTexture);
  gl.uniform1i(shaderProgram.samplerUniform, 0);
  // Magic stuff, ki narise.
  gl.bindBuffer(gl.ARRAY_BUFFER, worldVertexTextureCoordBuffer);
  gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, worldVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, worldVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, worldVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
  setMatrixUniforms();
  gl.drawArrays(gl.TRIANGLES, 0, worldVertexPositionBuffer.numItems);
  

//NARISI ENEMIJE 
  for (var i=0; i<enemyCount; i++) {
  //enemy
  if (enemyHealth[i] > 0) {
  
  mvPushMatrix();
  
  var xDistance = Math.abs((enemyXPosition[i]+10) - (xPosition+10));
  var zDistance = Math.abs((enemyZPosition[i]+10) - (zPosition+10));
  //enemy ai
  if (xDistance > 0.25 && !enemyTreeCollisionZ[i]) {
    
    if (enemyXPosition[i] < xPosition) {
		
		if (enemyCollision(i, 0.01, "x")) {
			
			enemyTreeCollisionX[i] = true;
			enemyZPosition[i] += 0.01;
		}
		else {
			
			enemyXPosition[i] += 0.01;
		}
    }
    else if (enemyXPosition[i] > xPosition) {
        
		if (enemyCollision(i, -0.01, "x")) {
			
			enemyTreeCollisionX[i] = true;
			enemyZPosition[i] -= 0.01;
		}
		else {
			
			enemyXPosition[i] -= 0.01;
		}
    }
  }
  enemyTreeCollisionZ[i] = false;
  if (zDistance > 0.25  && !enemyTreeCollisionX[i]) {
    
    if (enemyZPosition[i] < zPosition) {
		
		if (enemyCollision(i, 0.01, "z")) {
			
			enemyTreeCollisionZ[i] = true;
			enemyXPosition[i] -= 0.01;
		}
        else {
			
			enemyZPosition[i] += 0.01;
		}
    }
    else if (enemyZPosition[i] > zPosition) {
        
		if (enemyCollision(i, -0.01, "z")) {
			
			enemyTreeCollisionZ[i] = true;
			enemyXPosition[i] += 0.01;
		}
        else {
			
			enemyZPosition[i] -= 0.01;
		}
    }
  }
  enemyTreeCollisionX[i] = false;
  if (xDistance <= 0.25 && zDistance <= 0.25) {
    
    enemyIsNear[i] = true;
    if (!enemyAttackInMotion[i] && playerHealth > 0) {
      
      enemyAttackInMotion[i] = true;
      if(soundStanje==1) auch.play();
      playerHealth--;
      document.getElementById("playerLife").innerHTML = "";
      for (var j=0; j<playerHealth; j++) {
        
        document.getElementById("playerLife").innerHTML += "<img src='assets/heart.png' style='width:64px;height:64px;'>";
      }
      if (playerHealth == 0) {
        gameOverReason="It's just a flesh wound";
        timeToGamerOver = 1;
      }
      enemyAttack(i);
    }
  }
  else {
    
    enemyIsNear[i] = false;
  }
  if (xDistance <= 0.5 && zDistance <= 0.5) {
    
    playerInRange[i] = true;
  }
  else {
    
    playerInRange[i] = false;
  }
  
  //draw enemy
  mat4.translate(mvMatrix, [enemyXPosition[i], enemyYPosition[i], enemyZPosition[i]]);
  
  if (enemyHealth[i] == 1) {
    
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, enemyTexture2);
    gl.uniform1i(shaderProgram.samplerUniform, 2);
  }
  else {
    
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, enemyTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 1);
  }
  
  gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexTextureCoordBuffer);
  gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, enemyVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, enemyVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexNormalBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, enemyVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
  
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, enemyVertexIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, enemyVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  
  mvPopMatrix();
  }
  
  }

//NARISI OKOLICO
  //stene
  mvPushMatrix();
  mat4.scale(mvMatrix, [51.5, 51.5, 51.5]);
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, steneTexture);
  gl.uniform1i(shaderProgram.samplerUniform, 2);
  
  gl.bindBuffer(gl.ARRAY_BUFFER,kockaVertexTextureCoordBuffer);
  gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, kockaVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, kockaVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, kockaVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, kockaVertexIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, kockaVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  mvPopMatrix(); 
  //nebo
  mvPushMatrix();
  mat4.translate(mvMatrix, [0, 9, 0]);
  mat4.scale(mvMatrix, [51.5, 51.5, 51.5]);

  gl.activeTexture(gl.TEXTURE3);
  gl.bindTexture(gl.TEXTURE_2D, skyTexture);
  gl.uniform1i(shaderProgram.samplerUniform, 3);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, kockaVertexTextureCoordBuffer);
  gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, kockaVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, kockaVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, kockaVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, kockaVertexIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, kockaVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  mvPopMatrix();

//DREVESA
  var i=0;
  while(i<12){
    mvPushMatrix();
     mat4.translate(mvMatrix, [0, 0.25, 0]);
  //0.premakni ta kama bomo risali
  mat4.translate(mvMatrix, [xDrevesa[i], 0, yDrevesa[i]]);
  //1.spremeni teksturo na deblo   
  gl.activeTexture(gl.TEXTURE5);
  gl.bindTexture(gl.TEXTURE_2D, debloTexture);
  gl.uniform1i(shaderProgram.samplerUniform, 5);
  //2.narisi deblo
  gl.bindBuffer(gl.ARRAY_BUFFER, debloVertexTextureCoordBuffer);
  gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, debloVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, debloVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, debloVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, debloVertexNormalBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, debloVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, debloVertexIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, debloVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 
  //3.premakn gor ge de se risala krošnja
  //mat4.scale(mvMatrix, [0.5, 0.5, 0.5]);
  mat4.translate(mvMatrix, [0, 1.2, 0]);
  //4.tekstura na krosnjo
  gl.activeTexture(gl.TEXTURE4);
  gl.bindTexture(gl.TEXTURE_2D, leavesTexture);
  gl.uniform1i(shaderProgram.samplerUniform, 4);
  //5.narisi krosnjo
  mat4.scale(mvMatrix, [0.5, 0.5, 0.5]);
  gl.bindBuffer(gl.ARRAY_BUFFER, krosnjaVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, krosnjaVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, krosnjaVertexTextureCoordBuffer);
  gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, krosnjaVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, krosnjaVertexNormalBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, krosnjaVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, krosnjaVertexIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, krosnjaVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  //naslednja iteracija
  i++;
  mvPopMatrix();
 }
  
  
  //KOKOS
  if (kokosPresent) {
  mvPushMatrix();
  mat4.translate(mvMatrix, [kokosX, kokosY+0.05, kokosZ]);
  mat4.scale(mvMatrix, [0.4, 0.4, 0.4]);
  mat4.rotate(mvMatrix, degToRad(angleKokosa), [0, 1, 0]);
  //tekstura kokosa
  gl.activeTexture(gl.TEXTURE6);
  gl.bindTexture(gl.TEXTURE_2D, kokosTexture);
  gl.uniform1i(shaderProgram.samplerUniform, 6);
  //narisi kokos
  gl.bindBuffer(gl.ARRAY_BUFFER, kokosVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, kokosVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, kokosVertexTextureCoordBuffer);
  gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, kokosVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, kokosVertexNormalBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, kokosVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, kokosVertexIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, kokosVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  
  mvPopMatrix();
  }

//GRMI -- gre zgornjo tabelo skozi .. ce prazna ne narise.. simple as that
  /*var ii=0;
  while(ii<20){
    mvPushMatrix();
    mat4.scale(mvMatrix, [0.8, 0.8, 0.8]);
    mat4.translate(mvMatrix, [0, 0.08, 0]);
    mat4.translate(mvMatrix, [xGrma[ii]/1.6, 0, yGrma[ii]/1.6]);
      gl.activeTexture(gl.TEXTURE4);
      gl.bindTexture(gl.TEXTURE_2D, leavesTexture);
      gl.uniform1i(shaderProgram.samplerUniform, 4);
      gl.bindBuffer(gl.ARRAY_BUFFER, kokosVertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, kokosVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, kokosVertexTextureCoordBuffer);
      gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, kokosVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, kokosVertexNormalBuffer);
      gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, kokosVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, kokosVertexIndexBuffer);
      setMatrixUniforms();
      gl.drawElements(gl.TRIANGLES, kokosVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
      mvPopMatrix();
    ii++;
  }*/
  
  //lighting
  /*var lighting = true;
  gl.uniform1i(shaderProgram.useLightingUniform, lighting);
  
  if (lighting) {
    gl.uniform3f(
      shaderProgram.ambientColorUniform,
      0.2,
      0.2,
      0.2
    );

    var lightingDirection = [
      -0.25,
      -0.7,
      -1.0
    ];
    var adjustedLD = vec3.create();
    vec3.normalize(lightingDirection, adjustedLD);
    vec3.scale(adjustedLD, -1);
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, adjustedLD);

    gl.uniform3f(
      shaderProgram.directionalColorUniform,
      0.8,
      0.8,
      0.8
    )
  }*/
  
  // Ligthing

  // set uniform to the value of the checkbox.
  gl.uniform1i(shaderProgram.useLightingUniform, lighting);

  // set uniforms for lights as defined in the document
  if (lighting) {
    gl.uniform3f(
      shaderProgram.ambientColorUniform,
      0.2,
      0.2,
      0.2
    );

    gl.uniform3f(
      shaderProgram.pointLightingLocationUniform,
      4 * Math.cos(degToRad(yaw)),
      4,
      4 * Math.sin(degToRad(yaw))
    );

    gl.uniform3f(
      shaderProgram.pointLightingColorUniform,
      0.8,
      0.8,
      0.8
    );
  }
  if(timeToGamerOver == 1) gameOver();
}


//ANIMACIJA
function animate() {
  var timeNow = new Date().getTime();
  if (lastTime != 0) {
    var elapsed = timeNow - lastTime;

  if (speed != 0 || strafeSpeed != 0) {
    var xPositionTemp = xPosition - (Math.sin(degToRad(yaw)) * speed * elapsed + Math.sin(degToRad(strafe+yaw)) * strafeSpeed * elapsed);
    var zPositionTemp = zPosition - (Math.cos(degToRad(yaw)) * speed * elapsed + Math.cos(degToRad(strafe+yaw)) * strafeSpeed * elapsed);
    var isOk=0; //preverja ali se lahko premikamo

    if (Math.abs(xPositionTemp) < 5 && Math.abs(zPositionTemp) < 5) {     
        isOk=1;
    }    
    
  //preverja ali je prislo do kolizona z drevesom
    var j=0;
    var kolkoVstranOdDreves = 0.45
    while(j<12){
      var xTree=xDrevesa[j];
      var zTree=yDrevesa[j]; //na teh kordinatah je drevo x in z (z kot y)    
     // var weAreHereX=Math.floor(xPositionTemp);
     // var weAreHereY=Math.floor(zPositionTemp);
      var weAreHereX=xPositionTemp;
      var weAreHereY=zPositionTemp;
      //0.6 velikost drevesa v eno smer od svojega sredisca
      if(weAreHereX<xTree+kolkoVstranOdDreves && weAreHereX>xTree-kolkoVstranOdDreves){  //najahamo se znotraj x dela drevesa oz. polja kam nesmemo it
        if(weAreHereY<zTree+kolkoVstranOdDreves && weAreHereY>zTree-kolkoVstranOdDreves){ //nahajamo se se znotraj y dela drevesa --> torej tocno tam kam ne smemo
        isOk=0;
        //console.log("sem se dotaknil");
        break;
      }}
      j++;
    }
	
	//kokos detection
	if (kokosPresent) {
		
		var xRazdalja = Math.abs((kokosX+10) - (xPosition+10));
		var zRazdalja = Math.abs((kokosZ+10) - (zPosition+10));
	
		if (xRazdalja <= 0.25 && zRazdalja <= 0.25) {
			if(soundStanje==1) getKokos.play();
			playerHealth++;
			document.getElementById("playerLife").innerHTML = "";
			for (var a=0; a<playerHealth; a++) {
        
				document.getElementById("playerLife").innerHTML += "<img src='assets/heart.png' style='width:64px;height:64px;'>";
			}
			kokosPresent = false;
			kokosDelay();
		}
	}

  if(isOk==1){ //ce se lahko premaknemo izvedi naslednje
    if (soundStanje==1) kokos.play(); 
    xPosition -= Math.sin(degToRad(yaw)) * speed * elapsed + Math.sin(degToRad(strafe+yaw)) * strafeSpeed * elapsed;
    zPosition -= Math.cos(degToRad(yaw)) * speed * elapsed + Math.cos(degToRad(strafe+yaw)) * strafeSpeed * elapsed;
      joggingAngle += elapsed * 0.6; // 0.6 "fiddle factor" - makes it feel more realistic :-)
      yPosition = Math.sin(degToRad(joggingAngle)) / 20 + 0.4
  }

 }

    yaw += yawRate * elapsed;
    pitch += pitchRate * elapsed;

    if (pitch>40 || pitch<(-45)){ //nemores si zlomit vratu ko gledaš preveč gor/dol
      pitch=lastPicth;
    }else{
      lastPicth = pitch;
    }
    angleKokosa += 0.065 * elapsed;
  }
  lastTime = timeNow;
}


// Keyboard
function handleKeyDown(event) {
  // storing the pressed state for individual key
  currentlyPressedKeys[event.keyCode] = true;
}
function handleKeyUp(event) {
  // reseting the pressed state for individual key
  currentlyPressedKeys[event.keyCode] = false;
}
function handleKeys() {
  kokos.pause(); //Ko nic ne držiš nebo kokos zvoka
//POGLED KAMERE NAOKROG (arrow keys)
  if (currentlyPressedKeys[38]) {
    // Page Up pogled gor
    pitchRate = 0.1;
  } else if (currentlyPressedKeys[40]) {
    // Page Down pogled dol
    pitchRate = -0.1;
  } else {
    pitchRate = 0;
  }
  if (currentlyPressedKeys[37]) {
    // Left cursor key pogled levo
    yawRate = 0.1;
  } else if (currentlyPressedKeys[39]) {
    // Right cursor key  pogled desno
    yawRate = -0.1;
  } else {
    yawRate = 0;
  }

//PREMIKANJE (WASD) 
  if (currentlyPressedKeys[87]) {
    // W  Premik naprej
    speed = 0.0025;
  } else if (currentlyPressedKeys[83]) {
    // S  Premik nazaj
    speed = -0.0025;
  } else {
    speed = 0;
  }
  //PREMIKANJE LEVO - DESNO
  if (currentlyPressedKeys[65]) { //A
  strafe = 90;
  strafeSpeed = 0.0025;
  } 
  else if (currentlyPressedKeys[68]) { //D
  strafe = -90;
  strafeSpeed = 0.0025;
  }
  else {
  strafe = 0;
  strafeSpeed = 0;
  }
  
//NAPAD
  if (currentlyPressedKeys[13]) { //ENTER (ctrl, alt in shitft sprožijo bližnjice)
    document.getElementById("sword").innerHTML = "<img src='assets/sword2.png' style='width:600px;height:600px;'>";
    if(soundStanje==1) wushMec.play();
    setTimeout(function(){ 
      document.getElementById("sword").innerHTML = "<img src='assets/sword.png' style='width:600px;height:600px;'>";
     }, 210);
    for (var i=0; i<enemyCount; i++) {
    
    if (enemyHealth[i] > 0 && playerInRange[i] && !playerAttackInMotion) {
      
      playerAttackInMotion = true;
      playerAttackDelay();
      enemyHealth[i]--;
      if(soundStanje==1) hit.play();
      if (enemyHealth[i] == 0) {
        
        score += 10;
        document.getElementById("highscore").innerHTML = "SCORE: " + score;
        spawnEnemy(i);
      }
    }
    }  
  }
//PAVZA - ESC
  if (currentlyPressedKeys[27]) {
      alert("--a temporary stop--\n\nPress OK to continue");
      currentlyPressedKeys[27] = false;
  }

}
/* ZA PREMIKANJE Z MIŠKO ----> nedela dobro :(
 var lastMouseX=0; var lastMouseY=0;
 function handleMouseMove(event) {

  var newX = -(event.clientX);
  var newY = -(event.clientY);

  yawRate = (newX - lastMouseX)/15;
  pitchRate = (newY - lastMouseY)/15s;

  lastMouseX = newX;
  lastMouseY = newY;
}
*/


function start() {
  document.getElementById("controls").innerHTML = 
    "<br /><b>Controls: </b> <code>WASD</code>  to move around,  <code>arrow keys</code>  to look around,  <code>ENETER</code>  to attack,  <code>ESC</code>  to pause.";
  canvas = document.getElementById("glcanvas");
  var er = document.getElementById("ercanvas");
  var htmlogrodje = document.getElementById("content");

//canvas se prilagodi glede na okno
  sirinaCanvasa = window.innerWidth-35;
  visinaCanvasa = window.innerHeight-60;

  canvas.width = sirinaCanvasa;
  canvas.height = visinaCanvasa;
  er.width = sirinaCanvasa;
  er.height = visinaCanvasa;
  
  var ctx = er.getContext('2d');
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  };
  img.src="./assets/error.png";

  gl = initGL(canvas);      // Initialize the GL context

  // Only continue if WebGL is available and working
  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
    gl.clearDepth(1.0);                                     // Clear everything
    gl.enable(gl.DEPTH_TEST);                               // Enable depth testing
    gl.depthFunc(gl.LEQUAL);                                // Near things obscure far things

    initShaders();
    initTextures();

    //nalozi vse objekte (iz modeli.js)
    loadWorld();
	  enemy();
    deblo();
    kocka();
    krosnja();
	kokosModel()

    // Bind keyboard handling functions to document handlers
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;   
   // document.onmousemove = handleMouseMove;   // za misko ki ne dela dobro 
  
    // Set up to draw the scene periodically.    
    setInterval(function() {
    //Preverja ali se je velikost kanvasa spremenilo
    if (sirinaCanvasa!=(window.innerWidth-35) || visinaCanvasa!=window.innerHeight-60){
      canvas.style.visibility='hidden';
      htmlogrodje.style.visibility='hidden';
      er.style.visibility='visible';
      if(soundStanje == 1){
        soundStanje = 0;
        urar = 1;
      }
    }
    else{
      canvas.style.visibility='visible';
      htmlogrodje.style.visibility='visible';
      er.style.visibility='hidden';
      if(urar==1) soundStanje = 1;
    }     
      
	  if (texturesLoadedNum == 8) { //st. tekstur
        requestAnimationFrame(animate);
        handleKeys();
        drawScene();
        timeCounter();
      }
    }, 15);
  }
}