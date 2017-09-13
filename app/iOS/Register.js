import React, {Component} from 'react';
import login from './Login';
import firebase from '../Config/Firebase';
import styles from '../Theme/Theme';

import {
    View,
    Text,
    TextInput,
    Button,
    AlertIOS,
    TouchableOpacity
} from 'react-native';

class Register extends Component {
    state = {
        email: '',
        password: ''
    };


    register = () => {
        var state = this;
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
            console.log('state in register', state);

                state.props.navigator.push({ component: home});
                },
                (error) => {
                    AlertIOS.alert(error.message)
                });
        console.log('state of login', this.state);
    };

    login = () => {
        this.props.navigator.push({component: login});
    };


    render() {
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <Text>Life Log</Text>
                <TextInput
                    style={{height:40}}
                    autoCorrect = {false}
                    placeHolder="you@gmail.com"
                    onChangeText={email => this.setState({email: email})}
                    value={this.state.email}/>
                <TextInput
                    style={{height:40}}
                    autoCorrect = {false}
                    placeHolder="Password"
                    secureTextEntry={true}
                    onChangeText={password => this.setState({password: password})}
                    value={this.state.password}/>
                <Button
                    onPress={this.register.bind(this)} //binds the component on the submit function to the state
                    title="Register"/>
                <TouchableOpacity onPress={this.login.bind(this)}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Register;