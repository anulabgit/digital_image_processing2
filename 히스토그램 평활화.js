let img;
let histogram = new Array(256).fill(0);

function preload() {
  img = loadImage("img_1.png");
}

function setup() {
  createCanvas(1000, 1000);
  img.loadPixels();
  // 히스토그램 계산
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

  img.updatePixels();
  image(img, 0, img.height * 2);

  let cumulativeHistogram = [];
  cumulativeHistogram[0] = histogram[0];
  for (let i = 1; i < 256; i++) {
    cumulativeHistogram[i] = cumulativeHistogram[i - 1] + histogram[i];
  }

  // 평활화된 히스토그램 생성
  let numPixels = img.width * img.height;
  let equalizedHistogram = [];
  for (let i = 0; i < 256; i++) {
    equalizedHistogram[i] = (cumulativeHistogram[i] / numPixels) * 255;
  }

  // 이미지 업데이트
  img.loadPixels();
  for (x = 0; x < img.width; x++) {
    for (y = 0; y < img.height; y++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let gray = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
      let equalizedValue = equalizedHistogram[gray];

      img.pixels[index] = equalizedValue;
      img.pixels[index + 1] = equalizedValue;
      img.pixels[index + 2] = equalizedValue;
    }
  }
  let maxVal = max(equalizedHistogram);
  let h = 512
  let len = equalizedHistogram.length
  for (let i = 0; i < 256; i++) {
      let histVal = map(equalizedHistogram[i], 0, maxVal, h, 0);
      line(i * (width / len), h, i * (width / len), histVal);
    }
  img.updatePixels();
  image(img, img.width, img.height * 2, img.width, img.height);
  
}
