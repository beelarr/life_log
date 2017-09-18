import React, { Component } from 'react';
import styles from '../Theme/Theme';
import firebase from '../Config/Firebase';
import {
    View,
    Text,
    TouchableOpacity,
    Navigator
} from 'react-native';


class Header extends Component {  //Header is in components dir because its reusable and no state is inv
    static contextTypes = {
        navigator: React.PropTypes.object,

    }


    logout = () => {
        console.log('logout is working');
        console.log('this.props', this.props);
        firebase.auth().signOut();
        this.context.navigator.popToTop();
    };




    render() {
        return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.props.left} style={styles.left} >
                        <Text style={styles.textHeader}>{this.props.leftText}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>{this.props.title}</Text>
                    <TouchableOpacity style={styles.right} onPress={this.logout}>
                        <Text style={styles.textHeader}>LogOut</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line}/>
            </View>
        );
    }
}
// props.left or right enables changes on the header depending on the view

module.exports = Header;