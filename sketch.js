// Emotion Model
//let HAND_MODEL = "https://teachablemachine.withgoogle.com/models/pBgxq2FZO/"
//let EMOTION_MODEL = "https://teachablemachine.withgoogle.com/models/GpVQsoPRa/"

let EMOTION_MODEL = "https://teachablemachine.withgoogle.com/models/_y1XJI9Zy/"

// camera object
let mCamera;

// model object
let mModel;

// array to keep track of detected "things"
let mDetected = [];

// start camera and create model
function preload() {
  mCamera = createCapture(VIDEO, { flipped: true });
  mCamera.hide();

  mModel = ml5.imageClassifier(EMOTION_MODEL, { flipped: true });
}

// when classification is done, just copy result to mDetected
function updateDetected(detected) {
  mDetected = detected;
  mModel.classify(mCamera, updateDetected);
}

function setup() {
  // create p5js canvas
  createCanvas(windowWidth, windowHeight);

  // run the model once on camera image
  mModel.classify(mCamera, updateDetected);
}

function draw() {
  background(26, 188, 156);
  image(mCamera, 0, 0);

  // draw a bar chart for top-5 classes in classifier
  push();
  translate(0, mCamera.height + 12);
  
  for (let dObj of mDetected.slice(0,5)) {
    fill(0, 140, 186);
    noStroke();
    rect(0, 0, dObj.confidence * mCamera.width, 24);

    //noFill();
    fill(255, 255, 255);
    stroke(255, 255, 255);
    text(dObj.label, 8, 12);

    translate(0, 48);
  }
  pop();
}



//let mCamera;

//function preload() {
  //mCamera = createCapture(VIDEO, { flipped: true });
  //mCamera.hide();
//}

//function setup() {
  //createCanvas(windowWidth, windowHeight);
//}

//function draw() {
  //background(180, 200, 255);
  //image(mCamera, 0, 0);
//}
