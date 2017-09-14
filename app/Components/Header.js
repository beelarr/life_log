import React, { Component } from 'react';
import styles from '../Theme/Theme';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

class Header extends Component {  //Header is in components dir because its reusable and no state is inv
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.props.left} style={styles.left} >
                        <Text style={styles.textHeader}>{this.props.leftText}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>{this.props.title}</Text>
                    <TouchableOpacity style={styles.right}>
                        <Text style={styles.textHeader}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.line}/>
            </View>
        );
    }
}
// props.left or right enables changes on the header depending on the view

module.exports = Header;