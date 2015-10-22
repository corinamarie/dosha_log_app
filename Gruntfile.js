module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            },
            controllers: {
                src: 'client/scripts/controllers/controller.js',
                dest: 'server/public/assets/scripts/controller.min.js'
            }
        },
        copy: {
            angular: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular/angular.js"
                ],
                "dest": "server/public/vendors/"
            },
            bootstrap: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "bootstrap/dist/css/bootstrap.min.css",
                    "bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
                    "bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
                    "bootstrap/dist/fonts/glyphicons-halflings-regular.woff2"
                ],
                "dest": "server/public/vendors"
            },
            html: {
                expand: true,
                cwd: 'client',
                src: [
                    "views/index.html"
                ],
                "dest": "server/public/assets/"
            },
            jquery: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "jquery/dist/jquery.min.js",
                    "jquery/dist/jquery.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            style: {
                expand: true,
                cwd: 'client',
                src: [
                    "styles/style.css"
                ],
                "dest": "server/public/assets"
            },
            angularRoute: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular-route/angular-route.min.js",
                    "angular-route/angular-route.min.js.map"
                ],
                "dest": "server/public/vendors/"
            },
            htmlRoutes: {
                expand: true,
                cwd: 'client',
                src: [
                    "views/routes/home.html",
                    "views/routes/register.html",
                    "views/routes/history.html",
                    "views/routes/quiz.html",
                    "views/routes/results.html",
                    "views/routes/welcome.html",
                    "views/routes/logout.html"
                ],
                "dest": "server/public/assets/"
            },
            angularCharts: {
                expand: true,
                cwd: 'bower_components',
                src: [
                    "angular-chart.js/dist/angular-chart.min.js",
                    "angular-chart.js/dist/angular-chart.min.css",
                    "angular-chart.js/dist/angular-chart.min.js.map",
                    "angular-chart.js/dist/angular-chart.min.css.map"
                ],
                "dest": "server/public/vendors/"
            },
            chartJS: {
                expand: true,
                cwd: 'bower_components',
                src: [
                    "Chart.js/Chart.min.js"
                ],
                "dest": "server/public/vendors/"
            },
            fontAwesome: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "font-awesome/css/font-awesome.min.css",
                    "font-awesome/css/font-awesome.min.css.map",
                    "font-awesome/fonts/FontAwesome.otf",
                    "font-awesome/fonts/fontawesome-webfont.eot",
                    "font-awesome/fonts/fontawesome-webfont.svg",
                    "font-awesome/fonts/fontawesome-webfont.ttf",
                    "font-awesome/fonts/fontawesome-webfont.woff",
                    "font-awesome/fonts/fontawesome-webfont.woff2"
                ],
                "dest": "server/public/vendors/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};