'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-env');

  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),

    env: {
      test: {
        BLIZZ_KEY: 'test'
      },
    },

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['tests/**/*.spec.js']
    },

    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    }

  });

  grunt.registerTask('test', function(target) {
    return grunt.task.run([
      'env:test',
      'mochaTest'
    ]);
  });
}
