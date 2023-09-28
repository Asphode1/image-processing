const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGE_SRC = "img";
const IMAGE_DEST = "processed";
const IMAGE_EXT = [".jpg", ".jpeg", ".png"];

if (!fs.existsSync(IMAGE_DEST)) {
  fs.mkdirSync(IMAGE_DEST, { recursive: true });
}
(async () => {
  const files = fs.readdirSync(IMAGE_SRC);
  for (const file of files) {
    const fileExt = path.extname(file).toLowerCase();
    if (IMAGE_EXT.includes(fileExt)) {
      const sourceFile = path.join(IMAGE_SRC, file);
      const destinationFile = path.join(
        IMAGE_DEST,
        path.parse(file).name + ".png"
      );
      await sharp(sourceFile).resize(1920, 1080).toFile(destinationFile);
      console.log(`Converted and resized: ${sourceFile} -> ${destinationFile}`);
    }
  }
})();
console.log("Image conversion and resizing complete.");
