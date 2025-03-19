module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ['build/'],
      dist: ['dist/']
    },
    copy: {
      build: {
        files: [
          { expand: true, src: ['public/**'], dest: 'build/' },
          { expand: true, src: ['src/**'], dest: 'build/' }
        ]
      }
    },
    webpack: {
      build: {
        entry: './src/index.js',
        output: {
          path: __dirname + '/build',
          filename: 'bundle.js'
        },
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-react', '@babel/preset-env']
                }
              }
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            }
          ]
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'build',
        message: 'Deploy to GitHub Pages'
      },
      src: ['**/*']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build', ['clean:build', 'copy:build', 'webpack:build']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);
}; 