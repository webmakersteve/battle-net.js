'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

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
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    watch: {
      scripts: {
        files: ['tests/**/*.spec.js', 'lib/**/*.js'],
        tasks: ['jshint', 'mochaTest'],
        options: {
        }
      }
    }

  });

  grunt.registerTask('test', function(target) {
    return grunt.task.run([
      'jshint',
      'mochaTest'
    ]);
  });
};
