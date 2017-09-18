import React, { Component } from 'react';
import firebase from '../Config/Firebase';
import Header from '../Components/Header';
import styles from '../Theme/Theme';
import post from './Post';
import Icon2 from 'react-native-vector-icons/EvilIcons'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import map from './Map'
import {Image, Tile, Title, Caption, View, Button, Icon} from '@shoutem/ui';
import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import {
    Text,
    ScrollView,
    TouchableOpacity,
    Linking,
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
                    userPost.forEach((child) => { //child = image and value in FB
                        this.setState({entryId: child.key});
                        // console.log('child id', child.key);
                        // console.log('child.val', child.val());
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


    deletePost = (Id) => {
        console.log('id', Id);
        Alert.alert(
            'Delete Post',
            'Are you sure??',
            [

                {text: 'Delete', onPress: () => firebase.database().ref(`food/Id`).remove(), style: 'destructive'},
                {text: "I'll Keep It", onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
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
                        <Text style={{  fontFamily: 'cabin',
                                        fontSize:20,
                                        textAlign: 'center',
                                        marginTop: 5,
                                        marginBottom: 5}}>
                        Posts</Text>
                <View style={styles.line}/>

                <ScrollView>
                    <View styleName="clear" style={{flexDirection:'row', marginTop: 0, flexWrap: 'wrap', justifyContent:'space-around', backgroundColor: '#DBDDDE'}}>

                        {Object.keys(this.state.food).map((key) => {
                            return (
                                <TouchableOpacity
                                        key={key}
                                        onPress={() => this.map(this.state.food[key])}
                                        onLongPress={() => this.deletePost(this.state.entryId)}>
                                        <Image
                                            style={{
                                                marginBottom: deviceHeight/350,
                                                width: deviceWidth/3.05,

                                            }}
                                            styleName='medium-square clear'
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







//Google Maps link for line 85
// {Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${this.state.food[key].place.lat},${this.state.food[key].place.lng}&zoom=12&basemap=roadmap`)}}