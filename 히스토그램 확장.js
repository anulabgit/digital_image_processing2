let img;
let histogram = new Array(256).fill(0);
function preload() {
  img = loadImage("img_1.png");
}

function setup() {
  createCanvas(img.width + 256, img.height * 2);
  histogram_img(false);
  img.updatePixels();
  image(img, 256, 0);
  let i;
  for (i = 0; i < 256; i++) {
    if (histogram[i] != 0) break;
  }

  let mnh = i;
  for (i = 255; i >= 0; i--) {
    if (histogram[i] != 0) break;
  }
  let mxh = i;

  //이미지 스트레칭
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let gray = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
      let n = ((255 - 0) / (mxh - mnh)) * (gray - mnh);
      img.pixels[index] = n;
      img.pixels[index + 1] = n;
      img.pixels[index + 2] = n;
    }
  }
  img.updatePixels();
  image(img, 256, img.height, img.width, img.height);

  histogram_img(true);
}

function histogram_img(view) {
  img.loadPixels();
  histogram = new Array(256).fill(0);
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = 4 * (y * img.width + x);
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      
      let gray = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
      histogram[gray]++;
    }
  }
  if (view) {
    // 히스토그램 최대 값 찾기 (시각화를 위해)
    let maxVal = max(histogram);

    // 히스토그램 시각화
    let h = 512;
    for (let i = 0; i < 256; i++) {
      let histVal = map(histogram[i], 0, maxVal, 0, h);
      line(i, h, i, h - histVal);
    }
  }
}
