module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {                  //Compilador less, copiando o arquivo .less e criando o arquivo .css
            development: {      //Ambiente de desenvolvimento
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },

            production: {       //Ambiente final
                options: {
                    compress: true,     //Compressão arquivo less para css
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },

        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },

        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDEREÇO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDEREÇO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            }
        },

        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDEREÇO_DO_CSS',
                            replacement: './styles/main.css'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },

        clean: ['prebuild']
    })

    grunt.loadNpmTasks('grunt-contrib-less') //Instalação do plugin que adiciona o less
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-replace')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-contrib-clean')

    grunt.registerTask('default', ['watch']) //Criando uma inicialização default para iniciar o código
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean'])
}