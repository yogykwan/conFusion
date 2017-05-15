# conFusion-Angular
A full stack web project for `conFusion Restuarant`.

# Refer
[Full Stack Web Development](https://www.coursera.org/specializations/full-stack)

# Deploy

```
npm install -g bower
bower install

npm install -g gulp
npm install gulp --save-dev
npm install jshint gulp-jshint jshint-stylish gulp-imagemin gulp-concat gulp-uglify gulp-minify-css gulp-usemin gulp-cache gulp-changed gulp-rev gulp-rename gulp-notify browser-sync del gulp-ng-annotate --save-dev
gulp
gulp watch
```

# Json Server

```
npm install json-server -g

json-server --watch db.json
```

# Unit Test

```
npm install jasmine-core --save-dev
npm install karma-cli -g
npm install karma-jasmine --save-dev
npm install phantomjs karma-phantomjs-launcher karma-chrome-launcher --save-dev

cd test
karma start karma.conf.js
```

# E2E Test

```
npm install protractor -g
webdriver-manager update

gulp watch
cd test
protractor protractor.conf.js

```