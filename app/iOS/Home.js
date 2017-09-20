import React, { Component } from 'react';
import firebase from '../Config/Firebase';
import Header from '../Components/Header';
import Map from './Map';
import styles from '../Theme/Theme';
import post from './Post';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {Image, Tile, Title, Caption, View, Divider, Button, Icon} from '@shoutem/ui';
import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import {
    Text,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';

class Home extends Component {

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
            uid: "",
            food: [],
            entryId: ''
        }
    }



    getPosts = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let userId = user.uid;
                this.setState({uid: userId});
                firebase.database().ref('/food').orderByChild('uid').equalTo(userId).on('value', (userPost) => {
                    var items = [];
                    userPost.forEach((child) => {
                        var item = child.val();
                        item.key = child.key;
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
            component: Map,
            passProps: place
        });
    };



   left = () => { this.props.navigator.push({ component: post })};
    //pushing post component which takes us to the post view/page


    deletePost = (key) => {
        console.log('key in delete post', key);
        Alert.alert(
            'Delete Post',
            'Are you sure??',
            [
                {text: 'Delete', onPress: () => firebase.database().ref(`food/${key}`).remove(), style: 'destructive'},
                {text: "I'll Keep It", onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
        );

    };

    componentDidMount() {
        this.getPosts();
    };



    render () {   // nested return object of our food so that the entries are injected. Notice only one outside view. Key is given to keep xcode from error*/


        let swipeBtns = [{
            text: '',
            buttonWidth: 2000,
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {() => this.deletePost(this.state.food[key])}
        }];

        return (
            <View style={styles.homeContainer} >
                <Header
                    onLogOut={() =>{
                        console.log('logout is working');
                        console.log('this.props', this.props);
                        firebase.auth().signOut();
                        this.props.navigator.popToTop();
                    }}
                    title={<Icon1 name="bookmark-o" color="#fff" size={30}/>}
                        left={this.left.bind(this)}
                        leftText={<Icon2 name="camera"
                        color="#fff"
                        size={30}/> }/>
                        <Text
                            style={{
                                fontFamily: 'cabin',
                                fontSize:20,
                                textAlign: 'center',
                                marginTop: 4,
                                marginBottom: 5}}>
                            Posts
                        </Text>
                <Divider styleName="line" />
                <ScrollView>
                    <View
                        styleName="clear"
                        style={{
                            flexDirection:'row',
                            marginBottom: 95,
                            flexWrap: 'wrap',
                            justifyContent:'space-around',
                            backgroundColor: '#DBDDDE'}}>
                        {Object.keys(this.state.food).map((key) => {
                            return (
                                <TouchableOpacity
                                        key={key}
                                        onPress={() => this.map(this.state.food[key])}
                                        onLongPress={() => this.deletePost(this.state.food[key].key)}>
                                        <Image
                                            style={{
                                                marginBottom: deviceHeight/350,
                                                // width: deviceWidth/3.05,
                                            }}
                                            styleName='large-square clear'
                                            source={{uri: this.state.food[key].image}}/>
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






