
import React, { Component } from 'react';   // importing from node_modules
import styles from '../Theme/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './Login';
import TouchID from 'react-native-smart-touch-id'


import {

    Text,
    AlertIOS,
    ImageBackground,
    TouchableHighlight,
    Alert
} from 'react-native';


class TouchId extends Component {

    static  childContextTypes = {
        navigator: React.PropTypes.object
    }

    getChildContext () {
        return {
            navigator: this.props.navigator,
        }
    }


async componentDidMount() {
    let description = 'Welcome, please verify your identity.';
    //let title       //fallback button title will be default as 'Enter Password'(localized)
    //let title = ""  //fallback button will be hidden
    let title = "Verify Password"   //fallback button title will be 'Verify Password'(unlocalized)
    try {
        await TouchID.verify({
            description,
            title,
        })
        //await TouchID.verify("123123123123");
        this.props.navigator.push({ component: Login })
    } catch(e) {
        if (e.code == '-3') {
            //fallback button is pressed
            // Alert.alert('errorCode: ' + e.code + ' verify failed, user wants to ' + title)
        }
        else {
            // Alert.alert('errorCode: ' + e.code + ' verify failed')
        }
    }


    }








    render() {

        return ( //there cant be multiple views in the outermost node

            <ImageBackground source={{uri: 'https://68.media.tumblr.com/0024999d4a54d3fa21cb4c4a81b9bc98/tumblr_ow6qt07IJr1u8wonlo1_1280.jpg'}} style={[styles.container]}>
                <Icon name="bookmark-o" color="#fff" size={65} style={{textShadowColor: 'black',
                    textShadowOffset: {width: 2, height: 2},
                    textShadowRadius: 5}}/>
                <Text style={ [styles.logo, styles.customFont] }>Life Log</Text>


            </ImageBackground>

        );
    }
}

export default TouchId;