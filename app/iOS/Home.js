import React, { Component } from 'react';
import firebase from '../Config/Firebase';
import Header from '../Components/Header';
import styles from '../Theme/Theme';
import post from './Post';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/FontAwesome'

import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            food: [],
        }
    }

    componentDidMount = () => {  //react native instance of what to do when someone is on a page
        this.getPosts()
    };

    getPosts() {

        console.log('the state in post', this.state);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let userId = user.uid;
                console.log('userId', userId);
                this.setState({uid: userId});
                firebase.database().ref('/food').orderByChild('uid').equalTo(userId).on('value', (userPost) => {
                    var items = [];
                    userPost.forEach((child) => { //child = image and value in FB
                        var item = child.val();
                        items.push(item);
                    });
                    items = items.reverse(); //showing newest items
                    this.setState({ food: items });
                })

            }
        })
    };


    left() { this.props.navigator.push({ component: post })};
    //pushing post component which takes us to the post view/page



    render () {   // nested return object of our food so that the entries are injected. Notice only one outside view. Key is given to keep xcode from error*/

        return (
            <View style={styles.homeContainer}>
                <Header title={<Icon1 name="bookmark-o" color="#fff" size={20}/>}
                        left={this.left.bind(this)}
                        leftText={<Icon name="add-circle-outline"
                        color="#fff"
                        size={22}/> }/>
                <ScrollView>
                    <View style={{marginTop: -20}}>
                    {Object.keys(this.state.food).map((key) => {
                        return (
                            <TouchableOpacity key={key}
                                              onPress={() => {Linking.openURL(
                                                  `https://www.google.com/maps/dir/?api=1&destination=${this.state.food[key].place.lat},
                                                  ${this.state.food[key].place.lng}&zoom=12&basemap=roadmap`)}}>
                                <Image source={{uri: this.state.food[key].image}} style={{ width: deviceWidth, height: (deviceWidth*.5)}}/>
                                <Text style={styles.textPost}>{this.state.food[key].place.name}</Text>
                                <Text style={styles.textPost}>{this.state.food[key].place.address}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}


export default Home;