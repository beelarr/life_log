console.disableYellowBox = true;

import React, { Component } from 'react';   // importing from node_modules
import firebase from '../Config/Firebase';
import home from './Home';
import styles from '../Theme/Theme';
import Register from './Register';
import Icon from 'react-native-vector-icons/FontAwesome'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {
    Text,
    TextInput,
    AlertIOS,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

class Login extends Component {
    constructor(props){ //passing down props from navigator
        super(props); // setting the properties
        this.state = { //defining the initial state of the props
            email: "",
            password: "",
            uid: ""
        };
    }

    login = () => {
        var state = this; //captures this from outside firebase call to use inside firebase
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then( (data) => {
                this.setState({uid: data.uid});
                state.props.navigator.push({ component: home });
        },  (error) => {
                AlertIOS.alert(error.message)
            });
    };

    register = () => {
        this.props.navigator.push({ component: Register });
    };


    render() {

        return ( //there cant be multiple views in the outermost node

            <ImageBackground
                source={{uri: 'https://68.media.tumblr.com/390905e2ecc974d9b9deba0c542a9b2f/tumblr_ow607iHMqJ1u8wonlo1_1280.jpg'}}
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
                <TextInput
                    style={ styles.textInput }
                    placeholder="Email"
                    autoCorrect={false}
                    keyboardType={'email-address'}
                    placeholderTextColor="#fff"
                    onChangeText={(email) => this.setState({email: email})}
                    value={this.state.email}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password: password})}
                    value={this.state.password}/>
                <KeyboardSpacer/>
                <TouchableOpacity
                    style={styles.clearBtn}
                    onPress={this.login.bind(this)}>
                    <Text style={[styles.text, styles.whiteText]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.login.bind(this)}  //this is the entire component, binds the text input to the submit function
                    title="Login"/>
                <TouchableOpacity onPress={this.register.bind(this)}>
                    <Text style={styles.whiteText}>Register</Text>
                </TouchableOpacity>
            </ImageBackground>

        );
    }
}

export default Login;