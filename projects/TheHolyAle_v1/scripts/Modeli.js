function enemy(){ 
 // Create a buffer for the cube's vertices.
  enemyVertexPositionBuffer = gl.createBuffer();
  
  // Select the cubeVertexPositionBuffer as the one to apply vertex
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexPositionBuffer);
  
  // Now create an array of vertices for the cube.
  vertices = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
  ];
  
  //direktno skaliranje kocke
  for (var i = 0; i < vertices.length; i++) {
    
    vertices[i] /= 10;
  }
  
  // Now pass the list of vertices into WebGL to build the shape. We
  // do this by creating a Float32Array from the JavaScript array,
  // then use it to fill the current vertex buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  enemyVertexPositionBuffer.itemSize = 3;
  enemyVertexPositionBuffer.numItems = 24;
  
  // Map the normals onto the cube's vertices.
  enemyVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexNormalBuffer);

  // Now create an array of vertex normals for the cube.
  var vertexNormals = [
      // Front face
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,

      // Back face
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,

      // Top face
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,

      // Bottom face
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,

      // Right face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,

      // Left face
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0
  ];

  // Pass the normals into WebGL
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
  enemyVertexNormalBuffer.itemSize = 3;
  enemyVertexNormalBuffer.numItems = 24;

  // Map the texture onto the cube's faces.
  enemyVertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexTextureCoordBuffer);
  
  // Now create an array of vertex texture coordinates for the cube.
  var textureCoordinates = [
    // Front
    0.0,  0.0,
    0.5,  0.0,
    0.5,  1.0,
    0.0,  1.0,
    // Back
    0.5,  0.0,
    0.5,  1.0,
    0.0,  1.0,
    0.0,  0.0,    
    // Top
    0.5,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.5,  1.0,
    // Bottom
    0.0,  0.0,
    0.5,  0.0,
    0.5,  1.0,
    0.0,  1.0,
    // Right
    0.5,  0.0,
    0.5,  1.0,
    0.0,  1.0,
    0.0,  0.0, 
    // Left
    0.0,  0.0,
    0.5,  0.0,
    0.5,  1.0,
    0.0,  1.0
  ];

  // Pass the texture coordinates into WebGL
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
  enemyVertexTextureCoordBuffer.itemSize = 2;
  enemyVertexTextureCoordBuffer.numItems = 24;

  // Build the element array buffer; this specifies the indices
  // into the vertex array for each face's vertices.
  enemyVertexIndexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, enemyVertexIndexBuffer);
  
  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.
  var enemyVertexIndices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23    // left
  ];
  
  // Now send the element array to GL
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(enemyVertexIndices), gl.STATIC_DRAW);
  enemyVertexIndexBuffer.itemSize = 1;
  enemyVertexIndexBuffer.numItems = 36;
}
function kocka(){ 
 // Create a buffer for the cube's vertices.
  kockaVertexPositionBuffer = gl.createBuffer();
  
  // Select the cubeVertexPositionBuffer as the one to apply vertex
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, kockaVertexPositionBuffer);
  
  // Now create an array of vertices for the cube.
  vertices = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
  ];
  
  //direktno skaliranje kocke
  for (var i = 0; i < vertices.length; i++) {
    
    vertices[i] /= 10;
  }
  
  // Now pass the list of vertices into WebGL to build the shape. We
  // do this by creating a Float32Array from the JavaScript array,
  // then use it to fill the current vertex buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  kockaVertexPositionBuffer.itemSize = 3;
  kockaVertexPositionBuffer.numItems = 24;
  
  // Map the normals onto the cube's vertices.
  kockaVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, kockaVertexNormalBuffer);

  // Now create an array of vertex normals for the cube.
  var vertexNormals = [
      // Front face
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,

      // Back face
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,

      // Top face
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,

      // Bottom face
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,

      // Right face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,

      // Left face
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0
  ];

  // Pass the normals into WebGL
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
  kockaVertexNormalBuffer.itemSize = 3;
  kockaVertexNormalBuffer.numItems = 24;

  // Map the texture onto the cube's faces.
  kockaVertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, kockaVertexTextureCoordBuffer);
  
  // Now create an array of vertex texture coordinates for the cube.
  var textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Back
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    0.0,  0.0,    
    // Top
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Bottom
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Right
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    0.0,  0.0, 
    // Left
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0
  ];

  // Pass the texture coordinates into WebGL
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
  kockaVertexTextureCoordBuffer.itemSize = 2;
  kockaVertexTextureCoordBuffer.numItems = 24;

  // Build the element array buffer; this specifies the indices
  // into the vertex array for each face's vertices.
  kockaVertexIndexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, kockaVertexIndexBuffer);
  
  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.
  var kockaVertexIndices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23    // left
  ];
  
  // Now send the element array to GL
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(kockaVertexIndices), gl.STATIC_DRAW);
  kockaVertexIndexBuffer.itemSize = 1;
  kockaVertexIndexBuffer.numItems = 36;
}
function deblo(){ 
 // Create a buffer for the cube's vertices.
  debloVertexPositionBuffer = gl.createBuffer();
  
  // Select the cubeVertexPositionBuffer as the one to apply vertex
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, debloVertexPositionBuffer);
  
  // Now create an array of vertices for the cube.
  vertices = [
    // Front face
    -1.0, -6.2,  1.0,
     1.0, -6.2,  1.0,
     1.0,  6.2,  1.0,
    -1.0,  6.2,  1.0,

    // Back face
    -1.0, -6.2, -1.0,
    -1.0,  6.2, -1.0,
     1.0,  6.2, -1.0,
     1.0, -6.2, -1.0,

    // Top face
    -1.0,  6.2, -1.0,
    -1.0,  6.2,  1.0,
     1.0,  6.2,  1.0,
     1.0,  6.2, -1.0,

    // Bottom face
    -1.0, -6.2, -1.0,
     1.0, -6.2, -1.0,
     1.0, -6.2,  1.0,
    -1.0, -6.2,  1.0,

    // Right face
     1.0, -6.2, -1.0,
     1.0,  6.2, -1.0,
     1.0,  6.2,  1.0,
     1.0, -6.2,  1.0,

    // Left face
    -1.0, -6.2, -1.0,
    -1.0, -6.2,  1.0,
    -1.0,  6.2,  1.0,
    -1.0,  6.2, -1.0
  ];
  
  //direktno skaliranje kocke
  for (var i = 0; i < vertices.length; i++) {
    vertices[i] /= 23;
  }
  
  // Now pass the list of vertices into WebGL to build the shape. We
  // do this by creating a Float32Array from the JavaScript array,
  // then use it to fill the current vertex buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  debloVertexPositionBuffer.itemSize = 3;
  debloVertexPositionBuffer.numItems = 24;
  
  // Map the normals onto the cube's vertices.
  debloVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, debloVertexNormalBuffer);

  // Now create an array of vertex normals for the cube.
  var vertexNormals = [
      // Front face
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,

      // Back face
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,

      // Top face
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,

      // Bottom face
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,

      // Right face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,

      // Left face
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0
  ];

  // Pass the normals into WebGL
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
  debloVertexNormalBuffer.itemSize = 3;
  debloVertexNormalBuffer.numItems = 24;

  // Map the texture onto the cube's faces.
  debloVertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, debloVertexTextureCoordBuffer);
  
  // Now create an array of vertex texture coordinates for the cube.
  var textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  0.5,
    0.0,  0.5,
    // Back
    0.6,  0.0,
    0.6,  0.6,
    0.0,  0.6,
    0.0,  0.0,    
    // Top
    0.0,  0.0,
    0.6,  0.0,
    0.6,  0.6,
    0.0,  0.6,
    // Bottom
    0.0,  0.0,
    0.6,  0.0,
    0.6,  0.6,
    0.0,  0.6,
    // Right
    0.6,  0.0,
    0.6,  0.6,
    0.0,  0.6,
    0.0,  0.0, 
    // Left
    0.0,  0.0,
    0.6,  0.0,
    0.6,  0.6,
    0.0,  0.6
  ];

  // Pass the texture coordinates into WebGL
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
  debloVertexTextureCoordBuffer.itemSize = 2;
  debloVertexTextureCoordBuffer.numItems = 24;

  // Build the element array buffer; this specifies the indices
  // into the vertex array for each face's vertices.
  debloVertexIndexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, debloVertexIndexBuffer);
  
  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.
  var debloVertexIndices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23    // left
  ];
  
  // Now send the element array to GL
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(debloVertexIndices), gl.STATIC_DRAW);
  debloVertexIndexBuffer.itemSize = 1;
  debloVertexIndexBuffer.numItems = 36;
}
function krosnja(){
  var latitudeBands = 30;
  var longitudeBands = 30;
  var radius = 2;

  var vertexPositionData = [];
  var normalData = [];
  var textureCoordData = [];

  // calculate normals, texture coordinates and positions
  for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
    var theta = latNumber * Math.PI / latitudeBands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
      var phi = longNumber * 2 * Math.PI / longitudeBands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      var x = cosPhi * sinTheta;
      var y = cosTheta;
      var z = sinPhi * sinTheta;
      var u = 1 - (longNumber / longitudeBands);
      var v = 1 - (latNumber / latitudeBands);

      normalData.push(x);
      normalData.push(y);
      normalData.push(z);
      textureCoordData.push(u);
      textureCoordData.push(v);
      vertexPositionData.push(radius * x);
      vertexPositionData.push(radius * y);
      vertexPositionData.push(radius * z);
    }
  }

  // calculate indices
  var indexData = [];
  for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
    for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
      var first = (latNumber * (longitudeBands + 1)) + longNumber;
      var second = first + longitudeBands + 1;
      indexData.push(first);
      indexData.push(second);
      indexData.push(first + 1);

      indexData.push(second);
      indexData.push(second + 1);
      indexData.push(first + 1);
    }
  }

  // Pass the normals into WebGL
  krosnjaVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, krosnjaVertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
  krosnjaVertexNormalBuffer.itemSize = 3;
  krosnjaVertexNormalBuffer.numItems = normalData.length / 3;

  // Pass the texture coordinates into WebGL
  krosnjaVertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, krosnjaVertexTextureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
  krosnjaVertexTextureCoordBuffer.itemSize = 2;
  krosnjaVertexTextureCoordBuffer.numItems = textureCoordData.length / 2;

  // Pass the vertex positions into WebGL
  krosnjaVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, krosnjaVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
  krosnjaVertexPositionBuffer.itemSize = 3;
  krosnjaVertexPositionBuffer.numItems = vertexPositionData.length / 3;

  // Pass the indices into WebGL
  krosnjaVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, krosnjaVertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
  krosnjaVertexIndexBuffer.itemSize = 1;
  krosnjaVertexIndexBuffer.numItems = indexData.length;
}
//Load World -- ravnico
function loadWorld() {  //--> iz world.txt sestavi raven svet
  var request = new XMLHttpRequest();
  request.open("GET", "./assets/world.txt");
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      handleLoadedWorld(request.responseText);
    }
  }
  request.send();
}
function handleLoadedWorld(data) {
  var lines = data.split("\n");
  var vertexCount = 0;
  var vertexPositions = [];
  var vertexTextureCoords = [];
  for (var i in lines) {
    var vals = lines[i].replace(/^\s+/, "").split(/\s+/);
    if (vals.length == 5 && vals[0] != "//") {
      // It is a line describing a vertex; get X, Y and Z first
      vertexPositions.push(parseFloat(vals[0]));
      vertexPositions.push(parseFloat(vals[1]));
      vertexPositions.push(parseFloat(vals[2]));

      // And then the texture coords
      vertexTextureCoords.push(parseFloat(vals[3]));
      vertexTextureCoords.push(parseFloat(vals[4]));

      vertexCount += 1;
    }
  }

  worldVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, worldVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositions), gl.STATIC_DRAW);
  worldVertexPositionBuffer.itemSize = 3;
  worldVertexPositionBuffer.numItems = vertexCount;

  worldVertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, worldVertexTextureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexTextureCoords), gl.STATIC_DRAW);
  worldVertexTextureCoordBuffer.itemSize = 2;
  worldVertexTextureCoordBuffer.numItems = vertexCount;

  document.getElementById("loadingtext").textContent = "";  //vem ni model samo je pac tu noter ker pac je
}

function kokosModel(){
  var latitudeBands = 30;
  var longitudeBands = 30;
  var radius = 0.2;

  var vertexPositionData = [];
  var normalData = [];
  var textureCoordData = [];

  // calculate normals, texture coordinates and positions
  for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
    var theta = latNumber * Math.PI / latitudeBands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
      var phi = longNumber * 2 * Math.PI / longitudeBands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      var x = cosPhi * sinTheta;
      var y = cosTheta;
      var z = sinPhi * sinTheta;
      var u = 1 - (longNumber / longitudeBands);
      var v = 1 - (latNumber / latitudeBands);

      normalData.push(x);
      normalData.push(y);
      normalData.push(z);
      textureCoordData.push(u);
      textureCoordData.push(v);
      vertexPositionData.push(radius * x);
      vertexPositionData.push(radius * y);
      vertexPositionData.push(radius * z);
    }
  }

  // calculate indices
  var indexData = [];
  for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
    for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
      var first = (latNumber * (longitudeBands + 1)) + longNumber;
      var second = first + longitudeBands + 1;
      indexData.push(first);
      indexData.push(second);
      indexData.push(first + 1);

      indexData.push(second);
      indexData.push(second + 1);
      indexData.push(first + 1);
    }
  }

  // Pass the normals into WebGL
  kokosVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, kokosVertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
  kokosVertexNormalBuffer.itemSize = 3;
  kokosVertexNormalBuffer.numItems = normalData.length / 3;

  // Pass the texture coordinates into WebGL
  kokosVertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, kokosVertexTextureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
  kokosVertexTextureCoordBuffer.itemSize = 2;
  kokosVertexTextureCoordBuffer.numItems = textureCoordData.length / 2;

  // Pass the vertex positions into WebGL
  kokosVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, kokosVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
  kokosVertexPositionBuffer.itemSize = 3;
  kokosVertexPositionBuffer.numItems = vertexPositionData.length / 3;

  // Pass the indices into WebGL
  kokosVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, kokosVertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
  kokosVertexIndexBuffer.itemSize = 1;
  kokosVertexIndexBuffer.numItems = indexData.length;
}