import React, { Component } from 'react';
import firebase from '../Config/Firebase';
import Header from '../Components/Header';
import styles from '../Theme/Theme';
import Dimensions from 'Dimensions'; //Gets devices window dimensions
import uploadImage from '../Config/UploadImage';
import ImagePicker from 'react-native-image-picker'; //allows access of camera
import RNFetchBlob from 'react-native-fetch-blob'; //work-around that enables firebase to accept photos
import ImageResizer from 'react-native-image-resizer'; //auto resizer that helps app performance and look consistency ex. line 40
import gpKey from '../Values/Creds';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
const TimeAgo = require('react-native-timeago');
const timestamp = new Date();
const moment = require('moment');


import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput
} from 'react-native';


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: 'https://firebasestorage.googleapis.com/v0/b/findr-3ffd0.appspot.com/o/placeholder.png?alt=media&token=778cf414-8fc7-4288-bd50-1580366ab56a',
            place: {
                name: '',
                lat: '',
                lng: '',
                address: ''
            },
            lat: '',
            long: '',
            nearby: [],
            memory: '',
            createdAt: '',
            uid: ''
        };
    }

    componentDidMount(){
        this.getPlaces();
    }



    getPlaces = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = position.coords.latitude + ',' + position.coords.longitude;
                const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&radius=500&key=${gpKey}`;
                fetch(url, {method: "GET"}) //react native's xmlhttp call
                    .then(response => response.json())
                    .then(responseData => {
                        this.setState({ nearby: responseData.results});  //sets the state of nearby, the array from line 40, this is iterated through at line 103
                    })
            }
        )
    };

    photo = () => {
        var state = this;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        ImagePicker.showImagePicker({}, (response) => {
            if (!response.didCancel) {
                const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                //file:// is unique to iOS, will be different for Andriod
                ImageResizer.createResizedImage(source.uri, 500, 500, 'JPEG', 90)
                    .then((resizedImageURI) => {
                    uploadImage(resizedImageURI)//creates Blob
                        .then(url => state.setState({image: url})) //once our image is in firebase we setState to display it
                        .catch((error) => {
                            console.log('error', error);
                        });
                });
            }
        });
    };



    post = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let userId = user.uid;
                this.setState({ uid: userId});
                firebase.database().ref('food').push({image: this.state.image, place: this.state.place, uid: this.state.uid, memory: this.state.memory, createdAt: this.state.createdAt });

            }

        });


        this.props.navigator.pop();

    };



    back = () => {
        this.props.navigator.pop();
    };












    render () { // 2nd return This return Updates the place for our post*/
        return (
            <View>
                <Header title="Post" left={this.back.bind(this)} leftText={'Back'}/>
                <View style={styles.center}>

                    <TouchableOpacity onPress={this.photo.bind(this)}>
                        <Image source={{uri: this.state.image}} style={{width: deviceWidth, height: (deviceWidth * .5)}}/>
                    </TouchableOpacity>
                    <Text style={styles.textLocation}>{this.state.place.name}</Text>
                    <TextInput
                        style={styles.textPostInput}
                        placeholder="Write a caption. . ."
                        autoCorrect={true}
                        placeholderTextColor="lightgrey"
                        onChangeText={(memory) => this.setState({memory: memory})}
                        value={this.state.memory}/>
                    <ScrollView style={{height: deviceHeight*.35}}>
                        {Object.keys(this.state.nearby).map((key) => {
                            var placeObj = {
                                address: this.state.nearby[key].vicinity,
                                lat: this.state.nearby[key].geometry.location.lat,
                                lng: this.state.nearby[key].geometry.location.lng,
                                name: this.state.nearby[key].name
                            };
                            return (

                                <TouchableOpacity key={key} style={{padding: 10}} onPress={(place) => this.setState({place:placeObj})}>
                                    <Text style={styles.textPost}>{this.state.nearby[key].name}</Text>
                                    <Text style={styles.textPost}>{this.state.nearby[key].vicinity}</Text>
                                    <Text style={styles.textPost}>⭐{this.state.nearby[key].rating}</Text>
                                </TouchableOpacity>

                            )
                        })}
                    </ScrollView>
                    <TouchableOpacity style={styles.btn} onPress={this.post.bind(this)} >
                        <Text style={styles.textPost}>Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Post;