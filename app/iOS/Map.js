import React, {Component} from 'react';
import MapView from 'react-native-maps';
import Icon1 from 'react-native-vector-icons/EvilIcons'
import styles from '../Theme/Theme';
import {
    Card,
    Image,
    View,
    Subtitle,
    Caption,
    Text,
    Divider,
    Button,

} from '@shoutem/ui'

import {
    Linking,
    TouchableOpacity,
    Share,

} from 'react-native';

var TimeAgo = require('react-native-timeago');
var moment = require('moment');




class Map extends Component {

    static  childContextTypes = {
        navigator: React.PropTypes.object
    };

    getChildContext () {
        return {
            navigator: this.props.navigator,
        }
    }


    onBack = () => {
        this.props.navigator.pop();
    };


    sharing = () => {
        Share.share({
            message: this.props.memory,
            title: "I'm traveling",
            url: this.props.image
        })
    };


    directions = () => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${this.props.place.name},${this.props.place.address}`)
    };



    render() {
        return (
                <MapView
                    style={styles.mapContainer}
                    region={{
                        latitude: this.props.place.lat,
                        longitude: this.props.place.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,}}>
                    <MapView.Marker
                        coordinate={{
                            latitude: this.props.place.lat,
                            longitude: this.props.place.lng}}>
                        <MapView.Callout>
                            <TouchableOpacity onPress={this.sharing}>
                                <Card>
                                    <Image
                                        styleName="medium-wide"
                                        source={{uri: this.props.image}} />
                                    <View styleName="content">
                                        <Subtitle>{this.props.place.name}</Subtitle>
                                        <Divider styleName="line" />
                                        <Text>"{this.props.memory}"</Text>
                                        <Divider styleName="line" />
                                        <Caption/>
                                        <TimeAgo
                                            style={{fontSize: 10}}
                                            time={this.props.createdAt} />
                                        <Button
                                            styleName="tight clear"
                                            onPress={this.directions}>
                                            <Text styleName="bright">{this.props.place.address}</Text>
                                        </Button>
                                    </View>
                                    <Caption />
                                </Card>
                            </TouchableOpacity>
                        </MapView.Callout>
                    </MapView.Marker>
                    <TouchableOpacity onPress={this.onBack}>
                        <Icon1
                            style={styles.mapBackButton}
                            name="close"
                            color="#000"
                            size={40}/>
                    </TouchableOpacity>
                </MapView>
        );
    }
}

export default Map;
