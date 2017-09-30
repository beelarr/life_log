//this file was taken from the React Native Fetch Blob git hub page

import firebase from './Firebase';
import RNFetchBlob from 'react-native-fetch-blob';  //react native object tha converts images from ios to a blob that firebase requires
const Blob = RNFetchBlob.polyfill.Blob;  //creates the blob
const fs = RNFetchBlob.fs; //file system the blob uses

//this function uploads our image by encoding to the Blob's specs. Taken from the Reat Native fetch-blob github page.

const uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
        const uploadUri = uri;
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const imageRef = firebase.storage().ref('images').child(`${sessionId}`);

        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, {type: `${mime};BASE64`})
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, {contentType: mime})
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                reject(error)
            })
    })
};

module.exports = uploadImage;


