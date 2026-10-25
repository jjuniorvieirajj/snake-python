// draw a brown wooden boat on water with a sun in the sky and a white sail
// draw some clouds in the sky
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(135, 206, 235); // sky blue

  // Draw sun
  fill(255, 223, 0);
  noStroke();
  ellipse(350, 50, 80, 80);

  // Draw clouds
  fill(255);
  noStroke();
  ellipse(100, 100, 60, 40);
  ellipse(130, 90, 50, 30);
  ellipse(160, 100, 60, 40);
  ellipse(300, 80, 70, 50);
  ellipse(330, 70, 60, 40);
  

  // Draw water
  fill(0, 105, 148);
  rect(0, height / 2, width, height / 2);

  // Draw boat hull
  fill(139, 69, 19); // brown color
  beginShape();
  vertex(150, height / 2);
  vertex(250, height / 2);
  vertex(230, height / 2 + 40);
  vertex(170, height / 2 + 40);
  endShape(CLOSE);

  // Draw boat sail
  fill(255); // white color
  triangle(200, height / 2 - 60, 200, height / 2, 250, height / 2);
}