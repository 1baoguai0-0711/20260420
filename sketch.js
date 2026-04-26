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

  pg.clear();
  capture.loadPixels();

  // 確保攝影機像素已載入
  if (capture.pixels.length > 0) {
    pg.textAlign(CENTER, CENTER);
    pg.textSize(8);
    
    let step = 20;
    for (let py = 0; py < h; py += step) {
      for (let px = 0; px < w; px += step) {
        // 映射座標：將 pg 的座標轉換回 capture 的原始尺寸
        // 這裡 px 使用鏡像映射 (w - px)，以符合畫面上水平翻轉後的影像
        let sx = floor(map(w - px, 0, w, 0, capture.width - 1));
        let sy = floor(map(py, 0, h, 0, capture.height - 1));
        
        let index = (sx + sy * capture.width) * 4;
        let r = capture.pixels[index];
        let g = capture.pixels[index + 1];
        let b = capture.pixels[index + 2];
        let avg = (r + g + b) / 3;

        // 繪製格子外框並填充顏色 (使用灰階 avg 值)
        pg.stroke(100); // 灰色框線
        pg.fill(avg);
        pg.rect(px, py, step, step);

        // 顯示數值 (使用反色確保在填充框內可見)
        pg.noStroke();
        pg.fill(255 - avg); 
        pg.text(floor(avg), px + step / 2, py + step / 2);
      }
    }
  }

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
