import React, {Component} from 'react';
import MapView from 'react-native-maps';

import styles from '../Theme/Theme';

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
                    <Text style={styles.mapBackButton}>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Map;