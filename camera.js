let width = 320;    // We will scale the photo width to this
let height = 0;     // This will be computed based on the input stream
let streaming = false;
let video = null;
let canvas = null;
let photo = null;
let startbutton = null;
let ready = false;
let tcount;
let points = [];
window.onload = function(){
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');
    tcount = document.getElementById('count');
    initVideoCamera();
    initPredict();
};
function initVideoCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        setInterval(takePicture, 300);
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });
    video.addEventListener(
          "canplay",
          (ev) => {
            if (!streaming) {
              height = (video.videoHeight / video.videoWidth) * width;
              video.setAttribute("width", width);
              video.setAttribute("height", height);
              canvas.setAttribute("width", width);
              canvas.setAttribute("height", height);
              streaming = true;
            }
          },
          false,
    );
}
let context;
function takePicture() {
  context = canvas.getContext("2d");
  ready = true;
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
    predict();
  } else {
    clearPhoto();
  }
}
function clearPhoto() {
  const context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
}