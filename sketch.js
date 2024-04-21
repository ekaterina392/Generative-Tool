let sizeInput, shapeSelect, colorSelect, patternSelect;
let uploadedImage;
let controls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create input elements
  createInputs();
  
  // Generate pattern initially
  generatePattern();
}

function draw() {
  // No need for draw loop as pattern generation happens only when user changes input
}

// Create input elements
function createInputs() {
  let xPosition = width / 12; // Starting x position for controls
  let yPosition = height / 3; // Y position for all controls
  
  // Size input
  sizeInput = createSlider(10, 200, 100);
  sizeInput.position(xPosition - sizeInput.width / 2, yPosition);
  controls.push(sizeInput);
  
  // Shape select
  xPosition += width / 6;
  shapeSelect = createSelect();
  shapeSelect.position(xPosition - shapeSelect.width / 2, yPosition);
  shapeSelect.option('Circle');
  shapeSelect.option('Square');
  shapeSelect.option('Triangle');
  controls.push(shapeSelect);
  
  // Color select
  xPosition += width / 6;
  colorSelect = createSelect();
  colorSelect.position(xPosition - colorSelect.width / 2, yPosition);
  colorSelect.option('Red');
  colorSelect.option('Green');
  colorSelect.option('Blue');
  colorSelect.option('Yellow');
  colorSelect.option('Pink');
  colorSelect.option('Purple');
  colorSelect.option('Black');
  colorSelect.option('Orange');
  controls.push(colorSelect);
  
  // Pattern select
  xPosition += width / 6;
  patternSelect = createSelect();
  patternSelect.position(xPosition - patternSelect.width / 2, yPosition);
  patternSelect.option('Random');
  patternSelect.option('Grid');
  controls.push(patternSelect);
    
  // Image generator input
  xPosition += width / 6;
  imageGeneratorInput = createFileInput(handleImageUpload);
  imageGeneratorInput.position(xPosition - imageGeneratorInput.width / 2, yPosition);
  controls.push(imageGeneratorInput);
  
  // Download button
  xPosition += width / 6;
  downloadButton = createButton('Download JPG');
  downloadButton.position(xPosition - downloadButton.width / 2, yPosition);
  downloadButton.mousePressed(downloadJPG);
  controls.push(downloadButton);
  
  // Add event listeners for inputs
  for (let control of controls) {
    control.changed(generatePattern);
  }
}

// Handle image upload
function handleImageUpload(file) {
  if (file.type === 'image') {
    uploadedImage = loadImage(file.data, generatePattern);
  } else {
    console.error('Please upload an image file.');
  }
}

// Generate pattern based on user inputs
function generatePattern() {
  background(255);
  let size = sizeInput.value();
  let shape = shapeSelect.value();
  let color = colorSelect.value();
  let patternType = patternSelect.value();
  
  // Draw uploaded image if it exists
  if (uploadedImage) {
    let aspectRatio = uploadedImage.width / uploadedImage.height;
    let imgWidth = width;
    let imgHeight = width / aspectRatio;
    image(uploadedImage, 0, 0, imgWidth, imgHeight);
    // Set shape mode to draw only where the image is
    blendMode(MULTIPLY);
  }
  
  if (patternType === 'Random') {
    generateRandomPattern(size, shape, color);
  } else if (patternType === 'Grid') {
    generateGridPattern(size, shape, color);
  }
  
  // Reset blend mode to normal
  blendMode(NORMAL);
}

// Generate random pattern
function generateRandomPattern(size, shape, color) {
  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      fill(random(255), random(255), random(255));
      drawShape(x + size / 2, y + size / 2, size, shape);
    }
  }
}

// Generate grid pattern
function generateGridPattern(size, shape, color) {
  for (let x = 0; x < width; x += size) {
    for (let y = 0; y < height; y += size) {
      fill(color);
      drawShape(x + size / 2, y + size / 2, size, shape);
    }
  }
}

// Draw shape based on user selection
function drawShape(x, y, size, shape) {
  if (shape === 'Circle') {
    ellipse(x, y, size, size);
  } else if (shape === 'Square') {
    rectMode(CENTER);
    rect(x, y, size, size);
  } else if (shape === 'Triangle') {
    let h = size * sqrt(3) / 2;
    triangle(x - size / 2, y + h / 2, x + size / 2, y + h / 2, x, y - h / 2);
  }
}

// Function to download canvas as JPG
function downloadJPG() {
  saveCanvas('pattern', 'jpg');
}
