import React, { Component } from 'react';
import firebase from '../Config/Firebase';
import Header from '../Components/Header';
import Map from './Map';
import styles from '../Theme/Theme';
import post from './Post';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {Image, Tile, Title, Caption, View, Divider, Button, Icon, Heading, Spinner} from '@shoutem/ui';
import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import {
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator
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
            entryId: "",
            loading: true,
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
                    this.setState({food: items, loading: false});

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
                    color="black"
                />
            )
        }

        return (
            <View style={styles.homeContainer} >
                <Header
                    onLogOut={() =>{
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
                                                marginBottom: deviceHeight / 350,
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






