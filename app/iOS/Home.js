import React, { Component } from 'react';
import firebase from '../Config/Firebase';
import Header from '../Components/Header';
import styles from '../Theme/Theme';
import post from './Post';
import Icon2 from 'react-native-vector-icons/EvilIcons'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import map from './Map'
import Swipeout from 'react-native-swipeout';
import {Image, Tile, Title, Caption, View, Button, Icon} from '@shoutem/ui';
import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;
import {

    Text,
    ScrollView,
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



    getPosts = () => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let userId = user.uid;
                this.setState({uid: userId});
                firebase.database().ref('/food').orderByChild('uid').equalTo(userId).on('value', (userPost) => {
                    var items = [];
                    userPost.forEach((child) => { //child = image and value in FB
                        var item = child.val();
                        items.push(item);
                    });
                    items = items.reverse(); //showing newest items
                    this.setState({food: items});

                });
            }
        });
    };
    map = (place) => {
        this.props.navigator.push({
            component: map,
            passProps: place
        });
    };



   left = () => { this.props.navigator.push({ component: post })};
    //pushing post component which takes us to the post view/page

    deletePost = (post) => {

        firebase.database().child(post).remove();

    };

    componentDidMount() {
        this.getPosts();
    };



    render () {   // nested return object of our food so that the entries are injected. Notice only one outside view. Key is given to keep xcode from error*/


        return (
            <View style={styles.homeContainer}>
                <Header title={<Icon1 name="bookmark-o" color="#fff" size={30}/>}
                        left={this.left.bind(this)}
                        leftText={<Icon2 name="camera"
                        color="#fff"
                        size={30}/> }/>
                        <Text style={{  fontFamily: 'cabin',
                                        fontSize:20,
                                        textAlign: 'center',
                                        marginTop: 5,
                                        marginBottom: 5}}>
                        Posts</Text>
                <View style={styles.line}/>

                <ScrollView>
                    <View style={{flexDirection:'row', marginTop: 0, flexWrap: 'wrap', justifyContent:'space-around'}}>

                        {Object.keys(this.state.food).map((key) => {
                        return (

                                <TouchableOpacity
                                    key={key}
                                    onPress={() => this.map(this.state.food[key])}>
                                    <Image
                                        style={{marginBottom: 10, width: deviceWidth/3.1}} styleName='medium-square rounded-corners'
                                        source={{uri: this.state.food[key].image}}>
                                        <Tile >
                                            <View styleName="actions">
                                                <Button
                                                    onPress={() => this.deletePost(this.state.food[key])}
                                                    styleName="tight clear">
                                                        <Icon name="close" />
                                                </Button>
                                            </View>
                                        </Tile>
                                    </Image>
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







//Google Maps link for line 85
// {Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${this.state.food[key].place.lat},${this.state.food[key].place.lng}&zoom=12&basemap=roadmap`)}}