import React, {Component} from 'react';
const styles = require('../Theme/Theme')
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

var Dimensions = require('Dimensions'); //Gets devices window dimensions
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

class Map extends Component {

    onBack = () => {
        this.props.navigator.pop();
    }

    render() { //MapView tells map where to focus, MapView.Marker is for the pin.
        return (
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: this.props.place.lat,
                        longitude: this.props.place.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <MapView.Marker
                        coordinate={{
                            latitude: this.props.place.lat,
                            longitude: this.props.place.lng
                        }}
                        title={this.props.place.name}
                        description={this.props.place.address}
                    />
                </MapView>
                <TouchableOpacity style={ styles.btn } onPress={this.onBack.bind(this)} >
                    <Text style={styles.text}><Icon name="arrow-left" size={25} /> Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Map;