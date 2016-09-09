// var mock = require('mock-fs');
// var fs = require('fs');
// var os = require('os');
// var assert = require('chai').assert;
// var cache = require('../../services/cache/Cache');
//
//
// var GOO_CACHE_PARENT_DIR = os.homedir() + '/butts';
// //
// // mock({
// //   GOO_CACHE_PARENT_DIR: {
// //     'some-file.txt': 'file content here'
// //   }
// // });
//
// mock({
//   'path/to/fake/dir': {
//     'some-file.txt': 'file content here',
//     'empty-dir': {/** empty directory */}
//   }
// });
//
// console.log("PLZ PLZ PLZ", fs.accessSync('path/to/fake/dir'));
//
// describe('Cache', function() {
//   it('Should create .goo_cache dir', function() {
//     console.log("PLZ MOCK", fs.existsSync(GOO_CACHE_PARENT_DIR));
//     assert.isFalse(fs.existsSync(GOO_CACHE_PARENT_DIR + '/.goo_cache/'), "Directory shouldn't exist");
//     cache.init();
//     assert.isTrue(fs.existsSync(GOO_CACHE_PARENT_DIR + '/.goo_cache/'), "Directory should exist");
//     fs.unlinkSync(GOO_CACHE_PARENT_DIR + '/.goo_cache/')
//   });
//
//   mock.restore();
// });