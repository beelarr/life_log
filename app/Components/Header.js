import React, { Component } from 'reactuired of every file that contains components
import styles from '../Theme/Theme'; //import of style sheet
import firebase from '../Config/Firebase'; //import of firebase app initalization
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'; //Components from the react native library that I am using in this file


class Header extends Component {  //Header is in components dir because its reusable and no state is changed
    static contextTypes = { // David Z added so I can access the logout from any component
        navigator: React.PropTypes.object,

    };

    // logs the user out and pops the navigation back to the top
    logout = () => {
        firebase.auth().signOut();
        this.context.navigator.popToTop();

    };



    //render function that renders the component  to the dom
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.props.left} style={styles.left} >
                        <Text style={styles.textHeader}>{this.props.leftText}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textCenterHeader}>{this.props.title}</Text>
                    <TouchableOpacity style={styles.right} onPress={this.logout}>
                        <Text style={styles.logOut}>LogOut</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line}/>
            </View>
        );
    }
}
// props.left or right enables changes on the header depending on the view

module.exports = Header;