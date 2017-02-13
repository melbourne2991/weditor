const path = require('path');
const fs = require('fs');
const recursiveReaddir = require('recursive-readdir');

const NODE_MODULES_PATH = path.resolve(__dirname, '../node_modules');

module.exports = function packageLoader(fsin, mountPoint, packageNames, opts = {}) {
  packageNames.forEach((packageName) => {
     if(opts.verbose) {
      console.log(`Attempting to write "${packageName}" to virtual fs @ "${mountPoint}"...`);
     }

    if(packageName === 'fsevents') return;

    const packagePath = path.resolve(NODE_MODULES_PATH, packageName);
    const packageJson = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json')).toString());

    recursiveReaddir(packagePath, (err, filePaths) => {
      if(err) return console.log(err);

      filePaths.forEach((filePath) => {
        // split into parts separated by "/", 
        // remove first item as it is empty string
        const parts = filePath.split(path.sep).slice(1);

        const finalPath = parts.reduce((completePath, part) => {
          if (!fsin.existsSync(completePath)) {
            fsin.mkdirpSync(completePath);
          }
          return path.join(completePath, part);
        }, mountPoint);

        if(path.extname(finalPath)) {
          const str = fs.readFileSync(filePath, 'utf8');
          fsin.writeFileSync(finalPath, str || ' ');

          if(opts.verbose) {
            console.log(`WROTE ${filePath} TO ${finalPath}`);            
          }
        }
      });
    });

    packageLoader(fsin, mountPoint, Object.keys(packageJson.dependencies || {}), opts);
  });
};