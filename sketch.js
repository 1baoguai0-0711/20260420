let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏原始的 HTML 影片元素
  capture.hide();
}

function draw() {
  background('#e7c6ff');

  // 計算影像大小 (全螢幕寬高的 60%)
  let w = width * 0.6;
  let h = height * 0.6;
  // 計算置中座標
  let x = (width - w) / 2;
  let y = (height - h) / 2;

  push();
  // 將座標系移至影像右側並水平翻轉
  translate(x + w, y);
  scale(-1, 1);
  image(capture, 0, 0, w, h);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
