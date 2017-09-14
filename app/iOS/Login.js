import React, { Component } from 'react';   // importing from node_modules
import firebase from '../Config/Firebase';
import home from './Home';
import styles from '../Theme/Theme'
import Icon from 'react-native-vector-icons/FontAwesome'


import {
    View,
    Text,
    TextInput,
    AlertIOS,
    TouchableOpacity,
    ImageBackground
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
        var state = this;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then( (data) => {
                console.log('login getting uid', data.uid);
                this.setState({uid: data.uid});
            //Login successful
                state.props.navigator.push({ component: home });
        },  (error) => {
            // An error happened
            AlertIOS.alert(error.message)
        });
    };

    register = () => {
        this.props.navigator.push({ component: register });
    };


    render() {
        return ( //there cant be multiple views in the outermost node
            <ImageBackground source={{uri: 'https://68.media.tumblr.com/964e6c463cdfb8bfa41711979181f413/tumblr_ow8yyywXPV1wb9q31o1_500.jpg'}} style={[styles.container]}>
                <Icon name="bookmark-o" color="#fff" size={65} style={{textShadowColor: 'black',
                    textShadowOffset: {width: 2, height: 2},
                    textShadowRadius: 5}}/>
                <Text style={ [styles.logo, styles.customFont] }>Life Log</Text>
                <TextInput
                    style={ styles.textInput }
                    placeholder="Email"
                    placeholderTextColor="#000308"
                    onChangeText={(email) => this.setState({email: email})}
                    value={this.state.email}/>
                <View style={styles.line}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#000000"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password: password})}
                    value={this.state.password}/>
                <View style={styles.line}/>
                <TouchableOpacity style={styles.clearBtn} onPress={this.login.bind(this)}>
                    <Text style={[styles.text, styles.whiteText]}>Submit</Text>
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