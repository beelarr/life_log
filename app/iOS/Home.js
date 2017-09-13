import firebase from '../Config/Firebase';
import styles from '../Theme/Theme.js';
import Header from '../Components/Header';
import Post from './Post';
var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image
} from 'react-native';

class Home extends Component {

    state = {
        food: []
    };

    componentDidMount() {
        this.getFood();
    }

    getFood = () => {
        firebase.database().ref('food').on('value', (data) => { //on makes it realtime
            var items = []; //converting firebase object to an array to load in our app
            console.log('fb data from on call', data);
            data.forEach((child) => {
                console.log('child node', child);
                var item = child.val();
                items.push(item);
            });
            items = items.reverse();
            this.setState({food: items});
        });
    }

    left = () => {
        this.props.navigator.push({component: post});
    }


    render() {
        return (
            <View style={styles.container} >
                <Header title="Life Log" left={this.left.bind(this)} leftText={'+'}/>
                <ScrollView>
                    {Object.keys(this.state.food).map((key) => {
                        return (
                            <View key={this.state.food[key]}>
                                <Image source={{uri: this.state.food[key].image}}
                                       style={{ width: deviceWidth, height: deviceHeight *.5}}
                                />
                                <Text style={styles.text}>{this.state.food[key].place}</Text>
                            </View>
                        )
                    })}

                </ScrollView>
            </View>
        );
    }
}

export default Home;