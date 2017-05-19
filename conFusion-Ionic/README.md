# conFusion-Ionic
A full stack web project for `conFusion Restuarant`.

# Deploy

```
npm install bower gulp -g
npm install cordova ionic -g

npm install -g ios-sim
ionic cordova platform add ios
ionic cordova platform add android
```

# Run Lab

```
ionic serve --lab
```

# Emulate

## Set IP_ADDRESS in services.js
```
.constant("baseURL", "http://<Database's IP Address>:3000/")
```

## Get Responsive Resources
```
ionic cordova resources
```

## Add Ionic Plugins
```
ionic cordova plugin add de.appplant.cordova.plugin.local-notification
ionic cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
```

## IOS

```
cordova emulate ios
```

## Android
```
cordova emulate android
cordova run android
```

# Json Server

```
npm install json-server -g
json-server --watch db.json
```
