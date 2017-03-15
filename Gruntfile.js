module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      js: 'js',
      css: '<%= copy.bootstrap.dest %>'
    },

    copy: {
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/scss/',
        src: ['**/*'],
        dest: '_sass/vendors/bootstrap/'
      }
    },

    eslint: {
      target: ['_scripts/*.js']
    },

    babel: {
      options: { sourceMap: true },
      dist: {
        files: { 'js/main.js': '_scripts/main.js' }
      }
    },

    uglify: {
      options: {
        compress: { warnings: false },
        mangle: true
      },
      core: {
        src: 'js/main.js',
        dest: 'js/main.min.js'
      }
    },

    watch: {
      js: {
        files: '<%= eslint.target %>',
        tasks: 'js',
        options: { livereload: true }
      }
    }
  });

  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  grunt.registerTask('js', ['clean:js', 'eslint', 'babel', 'uglify']);
  grunt.registerTask('css', ['clean:css', 'copy']);
  grunt.registerTask('build', ['js', 'css']);
  grunt.registerTask('default', ['build']);
};
