# Blow Bubble
A simple game in javascript using [posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet).</br>
This game is made to show the power of AI and its ability to locate the Humain body parts (hands, legs, face...).</br>
The camera capture a video image which gets processed by the model.</br>
A JSON object is returned containing the body part names (as keys) and their position (as values) on the image.</br>
In this project, I used the hand position for the controls.

### How to play
Move your hands to blow up the bubbles (the circles).</br>
You lose if you miss 10 of them.

## screenshots
![Home Screen](/screenshots/home.PNG)
![Game Screen](/screenshots/game.PNG)
