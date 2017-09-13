const React = require('react-native');
const {StyleSheet} = React;  //React requirement to bind Stylesheet
var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    left: {
        justifyContent: 'flex-start',
        width: 75,
        padding:15
    },
    right: {
        justifyContent: 'flex-end',
        width: 75
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
        borderColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 3,
        width: 150,
    },
    text: {
        textAlign: 'center',
        fontFamily: "GillSans-Light"
    },
    textInput: {
        height: 50,
        width: 150,
        textAlign: 'center',
        fontFamily: "GillSans-Light",
        backgroundColor: '#fff',
        margin: 15
    },
    line: {
        borderColor: '#dbdbdb',
        borderWidth: 0.5,
        height: 1,
        alignSelf: 'stretch',
    },
    logo:{
        textAlign: 'center',
        fontSize: 22,
        fontFamily: "GillSans",
        color: '#fff',
        fontWeight: '500'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 65,
        paddingTop: 10,
        flexDirection: 'row',
        backgroundColor: '#CE2828',
    },
    mapContainer: {
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
        fontSize: 20
    },
    placeTitle: {
        textAlign: 'center',
        fontFamily: "GillSans",
        fontSize: 16,
    },
    red: {
        backgroundColor: '#CE2828',
    }
});

module.exports = styles;