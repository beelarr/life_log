cd app
mk dir Config
cd Config
touch Firebase.js
cd ../Values
touch Creds.js
cd ../..
brew install node
brew install watchman
npm install -g react-native-cli
npm install
react-native run-ios

