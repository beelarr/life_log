cd app/Config
touch Firebase.js
cd ..
mkdir Values
cd ./Values
touch Creds.js
cd ../..
brew install node
brew install watchman
npm install -g react-native-cli
npm install
react-native run-ios
