const image = document.getElementById("capture_zoom");
var knob = document.getElementById("zoom_slider");
var knob_value = document.getElementById("zoom_value")
var zoom_ratio = 1;
knob_value.innerHTML = knob.value + "%";

knob.oninput = function(){
    var knob_output = parseInt(knob.value)/100;
    image.style.webkitTransform = "scale("+knob_output+")";
    image.style.transform = "scale("+knob_output+")";
    knob_value.innerHTML = knob.value + "%";
    zoom_ratio = knob_output
    if(knob_output == 1) {
        image.style.left = 0 +"px";
        image.style.top = 0 +"px";
    }
}

let gMouseDownX = 0;
let gMouseDownY = 0;
let gMouseDownOffsetX = 0;
let gMouseDownOffsetY = 0;

function addListeners() {
    document.getElementById('capture_zoom').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
    gMouseDownX = e.clientX;
    gMouseDownY = e.clientY;

    var div = document.getElementById('capture_zoom');

    //The following block gets the X offset (the difference between where it starts and where it was clicked)
    let leftPart = "";
    if(!div.style.left)
        leftPart+="0px";    //In case this was not defined as 0px explicitly.
    else
        leftPart = div.style.left;
    let leftPos = leftPart.indexOf("px");
    let leftNumString = leftPart.slice(0, leftPos); // Get the X value of the object.
    gMouseDownOffsetX = gMouseDownX - parseInt(leftNumString,10);

    //The following block gets the Y offset (the difference between where it starts and where it was clicked)
    let topPart = "";
    if(!div.style.top)
        topPart+="0px";     //In case this was not defined as 0px explicitly.
    else
        topPart = div.style.top;
    let topPos = topPart.indexOf("px");
    let topNumString = topPart.slice(0, topPos);    // Get the Y value of the object.
    gMouseDownOffsetY = gMouseDownY - parseInt(topNumString,10);

    window.addEventListener('mousemove', divMove, true);
}

function divMove(e){
    let knob_output = parseInt(knob.value)/100;

    var div = document.getElementById('capture_zoom');
    div.style.position = 'absolute';
    let topAmount = e.clientY - gMouseDownOffsetY;
    let top_value = (480*knob_output/2)-topAmount;
    let leftAmount = e.clientX - gMouseDownOffsetX;
    left_value = (640*knob_output/2)-leftAmount;

    if (top_value <= 240 || top_value >= (480*knob_output-239)){
    } 
    else {
        div.style.top = topAmount + 'px';
    }

    if(left_value <= 320 || left_value >= (640*knob_output-319)){
    }
    else {
        div.style.left = leftAmount + 'px';
    }
}
addListeners();


const button1 = document.getElementById("clear_button");
const button2 = document.getElementById("draw_button");

const canvas = document.getElementById("canvas");
var clicked_points = document.querySelector(".points_info")

let ctx = canvas.getContext('2d');
var clickPoints = [];
var area_points = [];

var status2 = 0;
// Canvas On-off button
button1.addEventListener("click", (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

button2.addEventListener("click", (event) => {
    if (status2 == 0){
        canvas.style.visibility = "visible";
        button2.style.opacity = 0.9;
        status2 = 1;
        console.log("Drawing")
        console.log(status2)
    }
    else {
        canvas.style.visibility = "hidden";
        button2.style.opacity = 0.7;
        status2 = 0;
    }
})

canvas.addEventListener("click", (event) =>{
    clickPoints.push([event.offsetX, event.offsetY])
    area_points.push([event.offsetX, event.offsetY])
    drawDot(event.offsetX, event.offsetY)
    if (clickPoints.length == 2) {
        calculate_area(area_points)
        area_points = []
        drawPoly(clickPoints)
        clickPoints = []    
    }
})

const drawPoly = points => {
    ctx.lineWidth = 2
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    var split = points.splice(0, 2)
    
    ctx.beginPath()
    ctx.moveTo(split[0][0], split[0][1])
    for(i of split.reverse()) ctx.lineTo(i[0], i[1])
    ctx.strokeStyle = "red";
    ctx.stroke()
}

const drawDot = (x, y) => {
    ctx.beginPath()
    ctx.arc(x, y, 1.5, 0, 2*Math.PI);
    ctx.fillStyle = "red";
    ctx.fill()
}

const calculate_area = (points) =>{
    console.log("area")
    points[0][1] = (points[0][1]/480)*1000
    points[0][0] = (points[0][0]*1.28/640)*1000
    points[1][1] = (points[1][1]/480)*1000
    points[1][0] = (points[1][0]*1.28/640)*1000
    let total_length = (Math.sqrt((points[1][0]-points[0][0])**2+(points[1][1]-points[0][1])**2))
    document.getElementById("polygon_area").innerHTML = total_length.toFixed(4) +"um"
    console.log(total_length)
}
