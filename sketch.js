// ml5 pre trained model 
var mobilenet;

var video;

// whether to draw the game or wait for the model to load
var modelReady = false;

function modelLoaded() {
  console.log('Model is ready!!!');

  modelReady = true;
  gotResults();
}

// just for debugging : use the mouse to move the left hand's position
// function mouseDragged() {
//  game.setPoint1(mouseX, mouseY);
// }

/**
 * send the wrists positions to the game
 * @param {the object to get the wrists positions} poses 
 */
function updatePoints(poses) {
  if (poses.length > 0) {
    game.setPoint1(
      poses[0].pose.keypoints[rightWrist].position.x,
      poses[0].pose.keypoints[rightWrist].position.y);
    game.setPoint2(
      poses[0].pose.keypoints[leftWrist].position.x,
      poses[0].pose.keypoints[leftWrist].position.y);
  } else {
    game.setPoint1(null, null);
    game.setPoint2(null, null);
  }
}

function gotResults() {
  // Triggers every time there's a new pose detected. 
  // If you create a new poseNet method with a video element,
  // this Event Listener will be called continuously over the video frames.
  // Returns an array of objects containing pose estimations using single detection
  mobilenet.on('pose', function (poses) {
    updatePoints(poses);
  });
}

var canvas;
var game;
function setup() {
  // showing the video
  canvas = createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // loading the model
  var options = {

    //imageScaleFactor - A number between 0.2 and 1.0. Defaults to 0.50. 
    // What to scale the image by before feeding it through the network. 
    // Set this number lower to scale down the image and increase 
    // the speed when feeding through the network at the cost of accuracy.
    imageScaleFactor: 0.5,

    // outputStride - the desired stride for the outputs when feeding the image through
    // the model. Must be 32, 16, 8. Defaults to 16. The higher the number, 
    // the faster the performance but slower the accuracy, and visa versa.
    outputStride: 16,

    // flipHorizontal - Defaults to false. 
    // If the poses should be flipped/mirrored horizontally. 
    // This should be set to true for videos where the video is 
    // by default flipped horizontally (i.e. a webcam),
    // and you want the poses to be returned in the proper orientation.
    flipHorizontal: true,

    minConfidence: 0.5,

    // maxPoseDetections (optional) - the maximum number of poses to detect. 
    // Defaults to 5.
    maxPoseDetections: 1,

    // scoreThreshold(optional) - Only return instance detections that have root part 
    // score greater or equal to this value.Defaults to 0.5.
    scoreThreshold: 0.5,

    // nmsRadius (optional) - Non-maximum suppression part distance. 
    // It needs to be strictly positive. Two parts suppress each other if they are 
    // less than nmsRadius pixels away. Defaults to 20
    nmsRadius: 20,

    // 'single' or 'multiple'
    detectionType: 'single',

    // multiplier - An optional number with values:
    // 1.01, 1.0, 0.75, or 0.50. 
    // By default, PoseNet loads a model with a 0.75 multiplier
    // A model with a 1.00 muliplier is recommended for computers with powerful GPUS.
    // A model with a 0.50 architecture is recommended for mobile.
    multiplier: 0.75,
  }

  mobilenet = ml5.poseNet(video, options, modelLoaded);
  console.log("Loading Model");

  game = new Game();
}

function draw() {
  background(0);
  // draw the camera
  tint(255, 100); // Display with different opacity, max is 255
  // image(video, 0, 0);

  // flip using a matrix
  push();
  scale(-1.0, 1.0)
  image(video, -video.width, 0);
  pop();

  fill(255);
  textSize(30);

  if (!modelReady)
    text("Loading the Model !", 200, height / 2);
  else {
    game.act();
    game.draw();
  }

}