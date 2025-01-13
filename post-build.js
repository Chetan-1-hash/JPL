const fs = require('fs');
const path = require('path');

// Define paths for the 'browser' folder and the 'docs' folder
const source = path.join(__dirname, 'docs', 'browser');
const destination = path.join(__dirname, 'docs');

// Define paths for index.html and 404.html
const indexPath = path.join(destination, 'index.html');
const error404Path = path.join(destination, '404.html');

// Move all files from the `browser` folder to `docs`
fs.readdir(source, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    fs.rename(path.join(source, file), path.join(destination, file), err => {
      if (err) throw err;
    });
  });

  // Remove the empty `browser` folder
  fs.rmdir(source, err => {
    if (err) throw err;
    console.log('Moved files and cleaned up the browser folder.');

    // After moving files, copy index.html to 404.html
    if (fs.existsSync(indexPath)) {
      fs.copyFile(indexPath, error404Path, (err) => {
        if (err) {
          console.error('Error copying index.html to 404.html:', err);
        } else {
          console.log('Successfully copied index.html to 404.html');
        }
      });
    } else {
      console.error('index.html does not exist in the build directory.');
    }
  });
});
