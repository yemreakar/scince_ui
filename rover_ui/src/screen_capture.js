const ros_img = document.getElementById("cam");
const button3 = document.getElementById("screen_capture");
capture_canvas = document.getElementById("capture_canvas");

button3.addEventListener("click", (event)=>{
    capture_canvas.getContext("2d").drawImage(ros_img, 0, 0, 640, 480);
    console.log("Screenshot")
})

const science_img = document.getElementById("capture_zoom")
const button4 = document.getElementById("download_button");

