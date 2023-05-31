bw = 640;
bh = 480;
p = 0;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
ctx.lineWidth = 1;
function drawBoard(){
for (var x = 0; x <= bw; x += 10) {
    ctx.moveTo(x + p, p);
    ctx.lineTo(x + p, bh + p);
}

for (var x = 0; x <= bh; x += 10) {
    ctx.moveTo(p, x + p);
    ctx.lineTo(bw + p, x + p);
}
ctx.strokeStyle = "red";
ctx.stroke();
}

drawBoard();