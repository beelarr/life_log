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
    TouchableOpacity,
    View
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
                source={{uri: 'https://78.media.tumblr.com/c652ff47f1f27525b0acc9c6df1ef8ca/tumblr_owwg5jg0zU1wb9q31o1_500.gif'}}
                style={[styles.container]}>
                <View
                    style={styles.login}>
                    <Icon
                        name="bookmark-o"
                        color="#fff"
                        size={65}
                        style={styles.iconLogo}
                    />
                    <Text style={styles.logoText}>
                        <Text style={[styles.logoLife, styles.customFont]}>Life</Text>
                        <Text style={[styles.logoLog, styles.customFont]}> Log</Text>
                    </Text>
                    <TextInput
                        style={styles.textInputEmail}
                        placeholder="Email"
                        autoCorrect={false}
                        keyboardType={'email-address'}
                        placeholderTextColor="darkgrey"
                        onChangeText={(email) => this.setState({email: email})}
                        value={this.state.email}/>
                    <TextInput
                        style={styles.textInputPassword}
                        placeholder="Password"
                        placeholderTextColor="darkgrey"
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
                </View>
            </ImageBackground>
        );
    }
}

export default Register;