import React, { Component } from 'react';   // importing from node_modules
import firebase from '../Config/Firebase';
import home from './Home.js';
import styles from '../Theme/Theme';
import Icon from 'react-native-vector-icons/FontAwesome'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {
    Text,
    TextInput,
    ImageBackground,
    AlertIOS,
    TouchableOpacity
} from 'react-native';

class Register extends Component {
    constructor(props){ //passing down props from navigator
        super(props); // setting the properties
        this.state = { //defining the initial state of the props
            email: "",
            password: "",
            uid: ""
        };
    }

    register = () => {
        var state = this;
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                this.setState({uid: data.uid});
                state.props.navigator.push({ component:home }); // If I used 'this' here it would be referring to Firebase. By capturing it before it refers to Register.
            },  (error) => {
                    AlertIOS.alert(error.message)
        });
    };

    login = () => {
        this.props.navigator.pop();
    };

    render() {
        /*there cant be multiple views in the outermost node*/
        /* line 60 - this is the entire component, binds the text input to the register function*/
        /*line62-binds the component on the submit function to the state*/
        //line 71 -this is the entire component, binds the text input to the submit function
        return (
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
                <TextInput
                    style={ styles.textInput }
                    placeholder="Email"
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
                    onPress={this.register.bind(this)}>
                    <Text style={[styles.text, styles.whiteText]}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.login.bind(this)}  //this is the entire component, binds the text input to the submit function
                    title="Login">
                    <Text style={styles.whiteText}>Login</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

export default Register;