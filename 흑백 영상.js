let img;
function preload(){
  img = loadImage("img_1.png");
}

function setup() {
  createCanvas(img.width + 256, img.height * 2);
  img.loadPixels();
  image(img, 256, 0);
  filter(GRAY);
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
    // 히스토그램 최대 값 찾기 (시각화를 위해)
    let maxVal = max(histogram);

    // 히스토그램 시각화
    let h = 512;
    for (let i = 0; i < 256; i++) {
      let histVal = map(histogram[i], 0, maxVal, 0, h);
      line(i, h, i, h - histVal);
    }
  
  img.updatePixels();
  image(img, 256, img.height, img.width, img.height);
}
