const React = require('react-native');
const {StyleSheet} = React;
import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: null,
        width: null,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    homeContainer: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    left: {
        justifyContent: 'flex-start',
        width: 75,
        padding: 15
    },
    right: {
        justifyContent: 'flex-end',
        width: 75,

    },
    btn: {
        borderWidth: 1,
        padding: 10,
        margin: 10,
        borderRadius: 3,
        width: 150,
    },
    clearBtn: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        margin: 10,
        borderRadius: 3,
        width: 150,

    },
    text: {
        textAlign: 'center',
        fontFamily: 'GillSans-Light',
        textShadowColor: 'black',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5
    },
    textInput: {
        height: 50,
        textAlign: 'center',
        fontFamily: 'GillSans-Light',
        color: '#000',
        backgroundColor: 'rgba(0,0,0,0)',
        margin: 15,
        width: 200,
        borderColor: '#000',
        borderWidth: .5

    },
    line: {
        borderColor: '#D4B3AF',
        borderWidth: .5,
        height: 1,
        alignSelf: 'stretch',
    },
    logo:{
        textAlign: 'center',
        fontSize: 38,
        color: '#fff',
        fontWeight: '500',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 65,
        marginTop: 0,
        flexDirection: 'row',
        backgroundColor: '#118183'
    },
    mapContainer: {      //styling requirements from Airbnb Maps
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    postBtn: {
        padding: 10,
        backgroundColor: '#CE2828',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: deviceWidth
    },
    whiteText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: "GillSans",
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5
    },
    placeTitle: {
        textAlign: 'center',
        fontFamily: "GillSans",
        fontSize: 16,
    },
    red: {
        backgroundColor: '#128486',
    },
    customFont: {
        fontFamily: "Cabin",
        fontWeight: 'bold'
    },
    textPost: {
        textAlign: 'center',
        fontFamily: 'GillSans-Light',
    },
    textHeader: {
        textAlign: 'center',
        fontFamily: 'GillSans-Light',
        color: '#fff'
    },
    mapBackButton: {
        textAlign: 'center',
        fontFamily: 'GillSans-Light',
        backgroundColor: 'rgba(0,0,0,0)'
    }

});

module.exports = styles;