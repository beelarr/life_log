import React, { Component } from 'react';
import firebase from '../Config/Firebase';
import Header from '../Components/Header';
import styles from '../Theme/Theme';
import Dimensions from 'Dimensions';
import uploadImage from '../Config/UploadImage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
import gpKey from '../Values/Creds';
import {
    Subtitle,
    Title,
    Caption,
    Row,
    Image,
    Icon,
    Spinner
        } from '@shoutem/ui';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const Blob = RNFetchBlob.polyfill.Blob;
const moment = require('moment');




class Post extends Component {

    static  childContextTypes = {
        navigator: React.PropTypes.object
    };

    getChildContext () {
        return {
            navigator: this.props.navigator,
        }
    }

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
            uid: '',
            loading: false
        };
    }


    getPlaces = () => {
        navigator.geolocation.clearWatch();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = position.coords.latitude + ',' + position.coords.longitude;
                const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&radius=1750&key=${gpKey}`;
                fetch(url, {method: "GET"})
                    .then(response => response.json())
                    .then(responseData => {
                        this.setState({ nearby: responseData.results});
                    })
            }
        )
    };

    photo = () => {
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        this.setState({loading: true});
        ImagePicker.showImagePicker({}, (response) => {
            if (!response.didCancel) {
                this.getPlaces();
                const source = {
                    uri: response.uri.replace('file://', ''),
                    isStatic: true};
                ImageResizer.createResizedImage(source.uri, 500, 500, 'JPEG', 90)
                    .then((resizedImageURI) => {
                        return uploadImage(resizedImageURI)//creates Blob
                            .then(url => {this.setState({image: url, loading: false})})
                                .catch((error) => {
                                    this.setState({loading: false});
                                    console.log('error', error);
                                });
                    });
            }
            else {
                this.props.navigator.pop()
            }
        });
    };


   async post() {
        let user = firebase.auth().currentUser;
        try {
            await this.setState({
                        uid: user.uid,
                        createdAt: Date.now()
                    });
            firebase.database().ref('food').push({image: this.state.image, place: this.state.place, uid: this.state.uid, memory: this.state.memory, createdAt: this.state.createdAt});

            this.props.navigator.pop();
        }
        catch(e) {
        return e.message
       }
    }


    back = () => {
        this.props.navigator.pop();
    };



    componentDidMount(){
        this.getPlaces();
    }





    render () {
        if (this.state.loading) {
            return(
                <Spinner
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    size="large"
                    color="#118183"
                />
            )
        }

        return (
            <View>
                <Header
                    title="Post"
                    left={this.back}
                    leftText={'Back'} />
                <View style={styles.center}>
                    <TouchableOpacity onPress={this.photo}>
                        <Image
                            source={{uri: this.state.image}}
                            style={{
                                width: deviceWidth,
                                height: (deviceWidth * .5)}} />
                    </TouchableOpacity>
                    <Title style={styles.textLocation}>{this.state.place.name}</Title>

                    <TextInput
                        style={styles.textPostInput}
                        placeholder="Write a caption. . ."
                        autoCorrect={true}
                        placeholderTextColor="lightgrey"
                        onChangeText={(memory) => this.setState({memory: memory})}
                        value={this.state.memory} />
                    <Subtitle>Add Location</Subtitle>
                    <ScrollView style={{height: deviceHeight*.35}}>
                        {Object.keys(this.state.nearby).map((key) => {
                            var placeObj = {
                                address: this.state.nearby[key].vicinity,
                                lat: this.state.nearby[key].geometry.location.lat,
                                lng: this.state.nearby[key].geometry.location.lng,
                                name: this.state.nearby[key].name
                            };
                            return (
                                <TouchableOpacity
                                    key={key}
                                    style={{padding: 10}}
                                    onPress={(place) => this.setState({place:placeObj})}>
                                    <Row styleName="small">
                                    <Icon name="pin" />
                                        <View styleName="vertical">
                                        <Subtitle style={styles.textPost}>{this.state.nearby[key].name}</Subtitle>
                                        <Caption  style={styles.textPost}>{this.state.nearby[key].vicinity}</Caption>
                                        </View>
                                    </Row>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    <TouchableOpacity style={styles.btn} onPress={this.post.bind(this)}>
                        <Text style={styles.textPost}>Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Post;
