import React, { Component } from 'react';
import firebase from '../Config/Firebase';
import Header from '../Components/Header';
import styles from '../Theme/Theme';

import uploadImage from '../Config/UploadImage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import ImageResizer from 'react-native-image-resizer'

var Dimensions = require('Dimensions'); //built in to get the dimensions of the screen
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

const Blob = RNFetchBlob.polyfill.Blob;
const fetchit = RNFetchBlob;

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';


class Post extends Component {
    state = {
        image: 'https://firebasestorage.googleapis.com/v0/b/findr-3ffd0.appspot.com/o/placeholder.png?alt=media&token=778cf414-8fc7-4288-bd50-1580366ab56a',
        place: ""
    };

    photo = () => {
        var state = this
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        ImagePicker.showImagePicker({}, response => {
            if (response.didCancel) {
                const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                ImageResizer.createResizedImage(source.uri, 500, 500, 'JPEG', 60)
                    .then(resizedImageUri => {
                        uploadImage(resizedImageUri)
                            .then(url => state.setState({image: url}))
                            .catch(error => console.log('error on resizer', error))
                            .catch(error => console.log('error on set state resizer', error))
                    });
            }
        });
    }



    post = () => {
        firebase.database().ref('food').push({image: this.state.image, place: this.state.place});
        this.props.navigator.pop();
    }

    back = () => {
        this.props.navigator.pop();
    }

    render() {
        return (
            <View >
                <Header title="Post" left={this.back.bind(this)} leftText={'Back'}/>
                <View style={ styles.center }>
                    <TouchableOpacity onPress={this.photo.bind(this)}>
                        <Image source={{uri: this.state.image}}  style={{ width: deviceWidth, height: (deviceWidth*.5)}}/>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Place"
                        onChangeText={(place) => this.setState({place: place})}
                        value={this.state.place}/>
                    <View style={styles.line} />
                    <TouchableOpacity style={ styles.btn } onPress={this.post.bind(this)}>
                        <Text style={ styles.text }>Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

