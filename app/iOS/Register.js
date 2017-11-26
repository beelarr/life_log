import React, { Component } from 'react';
import firebase from '../Config/Firebase';
import Home from './Home.js';
import styles from '../Theme/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import pic from '../../assets/img/register.gif';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Spinner} from '@shoutem/ui';

import {
    Text,
    TextInput,
    ImageBackground,
    AlertIOS,
    TouchableOpacity,
    View
} from 'react-native';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            uid: "",
            loading: false,
        };
    }

    register = () => {
        this.setState({loading: true});
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                this.setState({uid: data.uid, loading: false});
                this.props.navigator.push({ component: Home });
            }) .catch((error) => {
            this.setState({loading: false});
            AlertIOS.alert(error.message)
        });
    };

    login = () => {
        this.props.navigator.pop();
    };

    render() {
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
                    color="#118183"
                />
            )
        }

        return (
            <ImageBackground
                source={pic}
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
                    <KeyboardSpacer />
                    <TouchableOpacity
                    style={styles.clearBtn}
                    onPress={this.register}>
                        <Text style={[styles.text, styles.whiteText]}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={this.login}
                    title="Login">
                        <Text style={styles.whiteText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

export default Register;
