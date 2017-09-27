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
    View,
} from 'react-native';

class Login extends Component {
    constructor(props){ //passing down props from navigator
        super(props); // setting the properties
        this.state = { //defining the initial state of the props
            email: "",
            password: "",
            uid: "",
            loading: true
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
                source={{uri: 'https://78.media.tumblr.com/b4d46d426eae880dbc7a64b79450eee0/tumblr_oww0sw5ImI1wb9q31o1_500.gif'}}
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
                        onPress={this.login.bind(this)}>
                        <Text style={[styles.text, styles.whiteText]}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.login.bind(this)}  //this is the entire component, binds the text input to the submit function
                        title="Login"/>
                    <TouchableOpacity onPress={this.register.bind(this)}>
                        <Text style={styles.whiteText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        );
    }
}

export default Login;