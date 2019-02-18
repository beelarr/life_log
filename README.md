
# Life Log
<p align="center">
  <img src="https://media.giphy.com/media/3o7aCToHXpiX70aSeQ/giphy.gif"/>
</p>
<p align="center">
  <img src="https://78.media.tumblr.com/a2a452530cf580b23da9b595934d7dea/tumblr_oxevw9ltis1wb9q31o4_1280.png" height="379" width="213"/>
  <img src="https://78.media.tumblr.com/865df5ac4b8c72809dea9cd2167c4202/tumblr_oxevw9ltis1wb9q31o3_1280.png" height="379" width="213"/>
  <img src="https://78.media.tumblr.com/ef4c5ec5ddeabfe74552bf69df827569/tumblr_oxew03uFGM1wb9q31o1_1280.png" height="379" width="213"/>
  

</p>


Life Log is a real time travel [POI](https://en.wikipedia.org/wiki/Point_of_interest) tool.  Users can create photo posts with an attached location, a caption, directions and sharing features. 

If you would like to see comments on the code run ```git fetch origin code-with-comments```.
## Getting Started

### The quick way

* Fork then clone project
* Run 
     
     ```
     chmod 777 quick_setup.sh
     ./quick_setup.sh
     ```
      
    - Firebase.js
      
      ```
      import * as firebase from 'firebase';
                          
      const firebaseConfig = {
          apiKey: "<Your Info>",
          authDomain: "<Your Info>",
          databaseURL: "<Your Info>",
          projectId: "<Your Info>",
          storageBucket: "<Your Info>",
          messagingSenderId: "<Your Info>"
      };
                          
      const firebaseApp = firebase.initializeApp(firebaseConfig);
                          
                          
      module.exports = firebaseApp;
      ```
    - Creds.js - (contains google places api key)
                      
                      
      
          const googlePlacesKey = "<Your Info>";
          module.exports = googlePlacesKey;
         
<p align="center"> That's it! </p>

## Detailed Setup
Fork and/or clone this repo to your local machine.  Then create the following files:

    ├── app
        └── Config
        ├   └──Firebase.js
        └── Values
            └──Creds.js

   
         
                    
                    
Firebase.js

```
import * as firebase from 'firebase';
                    
const firebaseConfig = {
    apiKey: "<Your Info>",
    authDomain: "<Your Info>",
    databaseURL: "<Your Info>",
    projectId: "<Your Info>",
    storageBucket: "<Your Info>",
    messagingSenderId: "<Your Info>"
};
                    
const firebaseApp = firebase.initializeApp(firebaseConfig);
                    
                    
module.exports = firebaseApp;
```
Creds.js - (contains google places api key)
                
                

    const googlePlacesKey = "<Your Info>";
    module.exports = googlePlacesKey;
                
                

### Prerequisites

We recommend installing [Node](https://nodejs.org/en/) and [Watchman](https://facebook.github.io/watchman/) 
using [Homebrew](https://brew.sh/). Run the following commands in a Terminal after installing Homebrew:

```
brew install node
brew install watchman
```

If you have already installed Node on your system, make sure it is version 4 or newer.

Watchman is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.

The React Native CLI 
Node comes with npm, which lets you install the React Native command line interface.

Run the following command in a Terminal:

```
npm install -g react-native-cli
```
If you get an error like Cannot find module 'npmlog', try installing npm directly:
```
curl -0 -L https://npmjs.org/install.sh | sudo sh.
```
Xcode 
The easiest way to install Xcode is via the Mac App Store. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 8 or higher.

### Command Line Tools 

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.




![alt text](https://facebook.github.io/react-native/img/XcodeCommandLineTools.png)


### Installing



Install Dependencies 
```
npm install
```

This will run your app and open the simulator

```
cd AwesomeProject
react-native run-ios
```

## Bugs 
Report bugs and issues [here](https://github.com/beelarr/life_log/issues)


## Built With

* [React-Native](https://facebook.github.io/react-native/) - Build native mobile apps using JavaScript and React
* [Firebase](firebase.google.com) - Realtime Databases and Authentication
* [Shoutem UI](https://shoutem.github.io/ui/) - Open source UI toolkit for React Native 
* [Google Places API](https://developers.google.com/places/)


## Authors

##### [**Bryon Larrance**](mailto:bryonl@me.com)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* NSS Faculty
* Matt Hamil
* David Zukowski
* Juan Rodríguez
* [Stephen Grider's](https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/overview) "The Complete React Native and Redux Course"

##

What is ["boyscouting?"](https://medium.com/@biratkirat/step-8-the-boy-scout-rule-robert-c-martin-uncle-bob-9ac839778385)

















