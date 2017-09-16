import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {
    Card,
    Image,
    View,
    Subtitle,
    Caption,
    Text,
    Divider

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
                <MapView
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
                                <Divider styleName="line" />
                                <Text>"{this.props.memory}"</Text>
                                <Divider styleName="line" />
                                <Caption/>
                                <Caption>{this.props.place.address}</Caption>
                            </View>
                            </Card>
                        </MapView.Callout>
                    </MapView.Marker>
                        <TouchableOpacity style={styles.mapBackButton} onPress={this.onBack.bind(this)}>
                            <Text style={styles.mapBackButton} >Back</Text>
                        </TouchableOpacity>
                </MapView>
        );
    }
}

export default Map;