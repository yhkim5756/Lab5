// script.js

const img = new Image(); // used to load image from <input> and draw to canvas

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO
  //toggle the relevant buttons (submit, clear, and read text buttons) by disabling or enabling them as needed
  //fill the canvas context with black to add borders on non-square images
  //draw the uploaded image onto the canvas with the correct width, height, leftmost coordinate (startX), and topmost coordinate (startY) using generated dimensions from the given function getDimensions

  context.clearRect(0,0,canvas.width,canvas.height);
  submit.disabled = false;


  let dimension = getDimmensions(canvas.width, canvas.height, img.width, img.height);

  

  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, dimension.startX, dimension.startY, dimension.width, dimension.height);


  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

var canvas = document.getElementById("user-image");
var context = canvas.getContext('2d');
var imageInput = document.getElementById("image-input");
var textTop= document.getElementById("text-top");
var textBot = document.getElementById("text-bottom");
var submit = document.querySelector("button[type='submit']");
var reset = document.querySelector("button[type='reset']");
var readText = document.querySelector("button[type='button']");
var generate = document.getElementById("generate-meme");


imageInput.addEventListener('change', () => {

  //const imageURL = URL.createObjectURL(imageInput.value);
 
  img.src = URL.createObjectURL(imageInput.files[0]);
  document.getElementById("user-image").alt= imageInput.files[0];
});

reset.addEventListener('click', ()=> {
  context.clearRect(0,0,canvas.width,canvas.height);
  reset.disabled= true;
  readText.disabled = true;
  submit.disabled = false;
});

generate.addEventListener('submit', () => {
  const voice = document.getElementById("voice-selection");
  voice.disabled= false;
  reset.disabled= false;
  readText.disabled = false;
  submit.disabled = true;

  let fontsize = canvas.width / 10;
  context.font = fontsize + 'px Impact';
  context.fillStyle = 'white';
  context.strokeStyle = 'black';
  context.lineWidth = fontsize / 15;
  context.textAlign = 'center';

  context.textBaseline = 'top';
  context.fillText(textTop.value, canvas.width/2, 0, canvas.width);
  context.strokeText(textTop.value, canvas.width/2, 0, canvas.width);

  context.textBaseline = 'bottom';
  context.fillText(textBot.value, canvas.width/2, canvas.height, canvas.width);
  context.strokeText(textBot.value, canvas.width/2, canvas.height, canvas.width);
});

readText.addEventListener('click', () => {

});


/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
