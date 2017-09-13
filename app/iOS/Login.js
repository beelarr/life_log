import React, {Component} from 'react';
import firebase from '../Config/Firebase'

import {
    View,
    Text,
    TextInput,
    Button,
    AlertIOS
} from 'react-native';

class Login extends Component {
    state = {
            email: '',
            password: ''
        };


    submit = () => {
        var state = this;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                AlertIOS.alert("Success")
            },
                (error) => {
                    AlertIOS.alert(error.message)
                });
        console.log('state of login', this.state);
    }


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
                    onPress={this.submit.bind(this)} //binds the component on the submit function to the state
                    title="Login"/>
            </View>
        );
    }
}

export default Login;