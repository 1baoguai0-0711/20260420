let capture;
let pg;

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

  // 如果 pg 還沒建立，或視窗縮放導致尺寸不合，則建立/更新畫布
  if (!pg || pg.width !== Math.floor(w) || pg.height !== Math.floor(h)) {
    pg = createGraphics(w, h);
  }

  // 在 graphics 圖層上繪製內容（範例：繪製邊框與文字）
  pg.clear(); // 清除上一幀內容，保持透明背景
  pg.stroke(255, 255, 0);
  pg.strokeWeight(10);
  pg.noFill();
  pg.rect(0, 0, pg.width, pg.height); // 畫一個框
  pg.fill(255, 255, 0);
  pg.noStroke();
  pg.textAlign(CENTER, CENTER);
  pg.text("REC", pg.width / 2, 30);

  push();
  // 將座標系移至影像右側並水平翻轉
  translate(x + w, y);
  scale(-1, 1);
  image(capture, 0, 0, w, h);
  pop();

  // 將建立好的圖層顯示在視訊畫面的上方
  image(pg, x, y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
