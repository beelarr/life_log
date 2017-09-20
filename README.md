
# Life Log

Life Log is a real time travel [POI](https://en.wikipedia.org/wiki/Point_of_interest) tool.  Users can create photo posts with an attached location, a caption, directions and shareing features.
## Getting Started

Files you will need to create

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
If you get an error like Cannot find module 'npmlog', try installing 
```
npm directly: curl -0 -L https://npmjs.org/install.sh | sudo sh.
```
Xcode 
The easiest way to install Xcode is via the Mac App Store. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 8 or higher.

Command Line Tools 

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.


down vote
accepted
Try this markdown:

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



## Built With

* [React-Native](https://facebook.github.io/react-native/) - Build native mobile apps using JavaScript and React
* [Firebase](firebase.google.com) - Realtime Databases and Authentication
* [Shoutem UI](https://shoutem.github.io/ui/) - Open source UI toolkit for React Native



## Authors

* **Bryon Larrance** - *NSS Cohort 21* - [NSS](https://github.com/beelarr)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* NSS Faculty
* Matt Hamil
* David Zukowski
* [Stephen Grider's](https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/overview) "The Complete React Native and Redux course"



















