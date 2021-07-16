var canvas= document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x=canvas.width/2;
var y=canvas.height -30;

var dx=2;
var dy=-2;

var ballRadius=10;

var paddleHeight=12;
var paddleWidth=72;
var paddle_x = (canvas.width - paddleWidth)/2;

var rightPressed=false;
var leftPressed=false;

var brickRow=4;
var brickColumn=7;
var brickWidth=80;
var brickHeight=24;
var brickSpace=12;
var brickOffsetTop=32;
var BrickOffsetLeft=32;

var score = 0;

var bricks=[];
for(c=0;c<brickColumn;c++){
  bricks[c] =[];
  for ( r = 0; r < brickRow; r++) {
    bricks[c][r]= {x:0, y:0 , status: 1};
  }
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

document.addEventListener("mousemove", mouseMoveHandler,false);

function keyDownHandler(e){
  if(e.keyCode==39){
    rightPressed = true;
  }
  else if (e.keyCode==37){
    leftPressed = true;
  }
}

function keyUpHandler(e){
  if(e.keyCode==39){
    rightPressed = false;
  }
  else if (e.keyCode==37){
    leftPressed = false;
  }
}

function drawBall(){
  ctx.beginPath();

  ctx.arc(x,y,ballRadius,0,Math.PI*2);
  ctx.fillStyle="red";
  ctx.fill();

  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();

  ctx.rect(paddle_x,canvas.height - paddleHeight, paddleWidth,paddleHeight);
  ctx.fillStyle="blue";
  ctx.fill();

  ctx.closePath();
}

function drawBrick(){
  for(var c=0;c<brickColumn;c++){
    for (var r = 0; r < brickRow; r++) {
      if(bricks[c][r].status == 1){
     var brick_x = (c*(brickWidth+brickSpace))+BrickOffsetLeft;
     var brick_y = (r*(brickHeight+brickSpace))+ brickOffsetTop;

     bricks[c][r].x=brick_x;
     bricks[c][r].y=brick_y;

     ctx.beginPath();
     ctx.rect(brick_x,brick_y,brickWidth,brickHeight);
     ctx.fillStyle= "blue";
     ctx.fill();
     ctx.closePath();
    }
    }
  }
}

function drawScore(){
  ctx.font = "18px Arial";
  ctx.fillStyle="#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function mouseMoveHandler(e){
  var relative_x =e.client_x - canvas.offsetLeft;
  if(relative_x>0 && relative_x < canvas.width){
    paddle_x = relative_x-paddleWidth/2;
  }
}

function collisionDetection(){
  for(var c=0; c< brickColumn; c++){
    for( var r=0; r<brickRow; r++){
      var b = bricks[c][r];
      if(b.status == 1){
        if(x > b.x && x< b.x+brickWidth && y>b.y &&y<b.y+brickHeight){
          dy=-dy;
          b.status=0;
          score++;
          if(score == brickRow*brickColumn){
            alert("YIPIEEE....YOU WIN!! CONGRATULATIONS ;)");
            document.location.reload();
            //clearInterval(interval);
          }
        }
      }
    }
  }
}

function draw(){

  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBall();
  drawPaddle();
  drawBrick();
  collisionDetection();
  drawScore();


 if(x+dx > canvas.width-ballRadius || x+dx < ballRadius){
    dx=-dx;
  }
  if(y+dy<ballRadius){
    dy=-dy;
  }
  else if(y+dy > canvas.height-ballRadius){
    if(x>paddle_x && x<paddle_x +paddleWidth){
    dy=-dy;
  }
  else{
    alert("OOPSIES!!!! GAME OVER  :(");
    document.location.reload();
    clearInterval(interval);
  }
}
    
if(rightPressed && paddle_x<canvas.width-paddleWidth){
    paddle_x=paddle_x+7;
  }
  else if(leftPressed && paddle_x>0){
    paddle_x=paddle_x-7;
  }

  x=x+dx;
  y=y+dy;

}

var interval=setInterval(draw ,10);

