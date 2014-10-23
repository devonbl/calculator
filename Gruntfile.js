module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },
      app: {
        src: 'index.js',
        dest: 'public/js/output.js'
      }
    },

  });
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', [ 'browserify' ]);
};
