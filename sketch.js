let sizeInput, shapeSelect, colorSelect, patternSelect;

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
    
  // Size input
  sizeInput = createSlider(10, 200, 100);
  sizeInput.position(windowWidth/2 - sizeInput.width/2, 240);
  
  // Shape select
  
  shapeSelect = createSelect();
  shapeSelect.position(windowWidth/2 - shapeSelect.width/2, 340);
  shapeSelect.option('Circle');
  shapeSelect.option('Square');
  shapeSelect.option('Triangle');
  
  
  // Color select
  
  colorSelect = createSelect();
  colorSelect.position(windowWidth/2 - shapeSelect.width/2, 310);
  colorSelect.option('Red');
  colorSelect.option('Green');
  colorSelect.option('Blue');
  colorSelect.option('Yellow');
  colorSelect.option('Pink');
  colorSelect.option('Purple');
  colorSelect.option('Black');
  colorSelect.option('Orange');
    

  // Pattern select
  
  
  patternSelect = createSelect();
  patternSelect.position(windowWidth/2 - shapeSelect.width/2, 280);
  patternSelect.option('Random');
  patternSelect.option('Grid');
  
  // Add event listeners for inputs
  sizeInput.changed(generatePattern);
  shapeSelect.changed(generatePattern);
  colorSelect.changed(generatePattern);
  patternSelect.changed(generatePattern);
}

// Generate pattern based on user inputs
function generatePattern() {
  background(255);
  let size = sizeInput.value();
  let shape = shapeSelect.value();
  let color = colorSelect.value();
  let patternType = patternSelect.value();
  
  if (patternType === 'Random') {
    generateRandomPattern(size, shape, color);
  } else if (patternType === 'Grid') {
    generateGridPattern(size, shape, color);
  }
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
