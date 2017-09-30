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
                source={{uri: 'https://78.media.tumblr.com/c652ff47f1f27525b0acc9c6df1ef8ca/tumblr_owwg5jg0zU1wb9q31o1_500.gif'}}
                style={[styles.container]}>
                <Icon
                    name="bookmark-o"
                    color="#fff"
                    size={65}
                    style={{
                        textShadowColor: 'black',
                        textShadowOffset: {width: 2, height: 2},
                        textShadowRadius: 5}}/>
                <Text style={styles.logoText}>
                    <Text style={[styles.logoLife, styles.customFont]}>Life</Text>
                    <Text style={[styles.logoLog, styles.customFont]}> Log</Text>
                </Text>
            </ImageBackground>

        );
    }
}

export default TouchId;