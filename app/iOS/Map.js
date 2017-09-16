import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {
    Card,
    Image,
    View,
    Subtitle,
    Caption,
    Text

} from '@shoutem/ui'
import styles from '../Theme/Theme';

import {

    TouchableOpacity,
} from 'react-native';

class Map extends Component {
    onBack = () => {
        this.props.navigator.pop();
    }

    render() { //MapView tells map where to focus, MapView.Marker is for the pin.
        return (
                <MapView.Animated
                    style={styles.mapContainer}
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
                        }}>
                        <MapView.Callout>
                            <Card>
                                <Image styleName="medium-wide"
                                       source={{uri: this.props.image}}/>
                            <View styleName="content">
                                <Subtitle>{this.props.place.name}</Subtitle>
                                <Text>"{this.props.memory}"</Text>
                                <Caption>{this.props.place.address}</Caption>
                            </View>
                            </Card>
                        </MapView.Callout>
                    </MapView.Marker>
                    <TouchableOpacity style={ styles.btn } onPress={this.onBack.bind(this)} >
                        <Text style={styles.mapBackButton}>Back</Text>
                    </TouchableOpacity>
                </MapView.Animated>
        );
    }
}

export default Map;