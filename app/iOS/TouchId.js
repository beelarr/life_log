console.disableYellowBox = true;

import React, { Component } from 'react';   // importing from node_modules
import styles from '../Theme/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './Login';
import TouchID from 'react-native-smart-touch-id'

import {
    Text,
    ImageBackground,
} from 'react-native';


class TouchId extends Component {

    static  childContextTypes = {
        navigator: React.PropTypes.object
    };

    getChildContext () {
        return {
            navigator: this.props.navigator,
        }
    }


    async componentDidMount() {
        let description = 'Welcome, please verify your identity.';
        let title = "Verify Password";   //fallback button title will be 'Verify Password'(unlocalized)
        try {
            await TouchID.verify({
                description,
                title,
            });
            this.props.navigator.push({ component: Login })
        }
        catch(e) {
            if (e.code === '-3') {
            }
            else {
            }
        }


    }


    render() {

        return ( //there cant be multiple views in the outermost node
            <ImageBackground
                source={{uri: 'https://68.media.tumblr.com/0024999d4a54d3fa21cb4c4a81b9bc98/tumblr_ow6qt07IJr1u8wonlo1_1280.jpg'}}
                style={[styles.container]}>
                <Icon
                    name="bookmark-o"
                    color="#fff"
                    size={65}
                    style={{
                        textShadowColor: 'black',
                        textShadowOffset: {width: 2, height: 2},
                        textShadowRadius: 5}}/>
                <Text style={[styles.logo, styles.customFont]}>Life Log</Text>
            </ImageBackground>

        );
    }
}

export default TouchId;