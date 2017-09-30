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

    //link for the back navigation
    onBack = () => {
        this.props.navigator.pop(); //pops off the current view to the previous
    };

    //uses ios sharing features to share a post
    sharing = () => {
        Share.share({
            message: this.props.memory,
            title: "I'm traveling",
            url: this.props.image
        })
    };

    //opens google maps bases on the name and address of a place
    directions = () => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${this.props.place.name},${this.props.place.address}`)
    };



    render() { //MapView tells map where to focus, MapView.Marker is for the pin.
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
                            <TouchableOpacity onPress={this.sharing.bind(this)}>
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
                                            onPress={this.directions.bind(this)}>
                                            <Text styleName="bright">{this.props.place.address}</Text>
                                        </Button>
                                    </View>
                                    <Caption />
                                </Card>
                            </TouchableOpacity>
                        </MapView.Callout>
                    </MapView.Marker>
                    <TouchableOpacity onPress={this.onBack.bind(this)}>
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