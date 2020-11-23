const path = require('path');

module.exports = {
  projectRoot: __dirname,

  watchFolders: [__dirname, path.resolve(__dirname, '../shared')],
};
