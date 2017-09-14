import React, { Component } from 'react';
import firebase from '../Config/Firebase';
import Header from '../Components/Header';
import styles from '../Theme/Theme';
import post from './Post';
import map from './Map';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: [],
        }
    }

    componentDidMount = () => {  //react native instance of what to do when someone is on a page
        this.getFood()
    }

    getFood()  {
        firebase.database().ref('food').on('value', (foodEntry) => {  //once allows the db to be on once when someone comes to the page - on keeps it current
            var items = [];
            foodEntry.forEach((child) => { //child = image and value in FB
                var item = child.val();
                items.push(item);
            });
            items = items.reverse(); //showing newest items
            this.setState({ food: items });
        });
    };

    left() { this.props.navigator.push({ component: post })};
    //pushing post component which takes us to the post view/page


    map() {
        console.log('this', this);
        console.log('this.props', this.props);

        this.self.props.navigator.push({  //not really sure what this does
            component: map,
            passProps: {place: this.place.place }  //TODO: There is a bug here. If i replace the map doesn't error but it doesnt load. Check this file and map.js. #11
        });
    };

    render () {   // nested return object of our food so that the entries are injected. Notice only one outside view. Key is given to keep xcode from error*/

        return (
            <View style={styles.homeContainer}>
                <Header title="Life Log" left={this.left.bind(this)} leftText={<Icon name="add-circle-outline" color="#ADD3D3" size={22}/> }/>
                <ScrollView>
                    <View style={{marginTop: -20}}>
                    {Object.keys(this.state.food).map((key) => {
                        return (
                            <TouchableOpacity key={key}
                                              onPress={this.map.bind({self: this, place: this.state.food[key]})}>
                                <Image source={{uri: this.state.food[key].image}} style={{ width: deviceWidth, height: (deviceWidth*.5)}}/>
                                <Text style={styles.textPost}>{this.state.food[key].place.name}</Text>
                                <Text style={styles.textPost}>{this.state.food[key].place.address}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}


export default Home;