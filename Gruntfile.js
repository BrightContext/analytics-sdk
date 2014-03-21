var grunt = require('grunt');

grunt.initConfig({

  pkg: grunt.file.readJSON('package.json'),

  jshint: {
    options: {
      'curly'   : true,
      'eqeqeq'  : true,
      'forin'   : true,
      'immed'   : true,
      'indent'  : 2,
      'latedef' : true,
      'newcap'  : true,
      'noarg'   : true,
      'noempty' : true,
      'nonew'   : true,
      'plusplus': false,
      'quotmark': 'single',
      'undef'   : true,
      'unused'  : true,
      'strict'  : true,
      'trailing': true,
      'maxdepth': 5,
      'maxlen'  : 100,
      'laxbreak': true,
      'onevar'  : true
    }
  },

  uglify: {
    test: {
      options: {
        beautify: true
      },
      files: {
        'build/bcc-analytics.js': ['js/**/*.js']
      }
    },

    prod: {
      options: {
        compress: {
          drop_console: true
        }
      },
      files: {
        'build/bcc-analytics.min.js': ['js/**/*.js']
      }
    }
  },

  watch: {
    scripts: {
      files: 'js/**/*.js',
      tasks: [ 'jshint', 'uglify' ],
      options: {
        interrupt: true,
      },
    },
  },

});


grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['uglify']);
