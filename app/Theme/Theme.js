const React = require('react-native');
const {StyleSheet} = React;
import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


var styles = StyleSheet.create({
    btn: {
        borderRadius: 3,
        borderWidth: 1,
        padding: 10,
        margin: 10,
        width: 150,
    },
    clearBtn: {
        borderColor: '#fff',
        borderRadius: 3,
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: 150,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        height: null,
        justifyContent: 'center',
        width: null,
    },
    customFont: {
        fontFamily: "Lobster",
        fontSize: 50,
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#118183',
        flexDirection: 'row',
        height: 65,
        justifyContent: 'space-between',
        marginTop: 0,
    },
    homeContainer: {
        flex: 1,
    },
    homeImages:{
        backgroundColor: 'rgba(0,0,0,0)',
        marginBottom: 10,
        width: deviceWidth/3.1,
    },
    iconLogo:{
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: .1,
        shadowRadius: 2
    },
    left: {
        justifyContent: 'flex-start',
        marginTop: 4,
        padding: 15,
        width: 75,
    },
    line: {
        alignSelf: 'stretch',
        borderColor: '#000',
        borderWidth: .5,
        height: 1,
    },
    login:{
        flex: 1,
        alignItems: 'center',
        paddingTop: deviceHeight/10.5,
    },
    logoLife:{
        color: '#fff',
        fontSize: 38,
        fontWeight: '500',
        letterSpacing: 3,
        margin: 5,
        textAlign: 'center',
        textShadowColor: 'darkgrey',
        textShadowOffset: {width: 3, height: 1},
        textShadowRadius: 2,
    },
    logoLog:{
        color: '#fff',
        fontSize: 38,
        fontWeight: '500',
        padding: 5,
        textAlign: 'center',
        textShadowColor: 'darkgrey',
        textShadowOffset: {width: 3, height: 1},
        textShadowRadius: 2,
    },
    logoText:{
        height: deviceHeight/8.5,

    },
    logOut:{
        color: '#fff',
        fontFamily: 'GillSans-Light',
        fontSize: 13,
        textAlign: 'center',
    },
    map: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    mapBackButton: {
        backgroundColor: 'rgba(0,0,0,0)',
        padding: 20,
        margin: 10,
        textAlign: 'center',
    },
    mapBtn: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'GillSans-Light',
        justifyContent: 'flex-end',
        margin: 10,
        padding: 10,
        position: 'absolute',
        width: 150,
    },
    mapContainer: {      //styling requirements from Airbnb Maps
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'flex-end',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    placeTitle: {
        textAlign: 'center',
        fontFamily: "GillSans",
        fontSize: 16,
    },
    postBtn: {
        backgroundColor: '#CE2828',
        bottom: 0,
        padding: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        width: deviceWidth,
    },
    red: {
        backgroundColor: '#128486',
    },
    right: {
        justifyContent: 'flex-end',
        padding: 15,
        width: 75,
    },
    text: {
        fontFamily: 'GillSans-Light',
        textAlign: 'center',
    },
    textCenterHeader:{
        color: '#fff',
        fontFamily: 'GillSans-Light',
        fontSize: 22,
        textAlign: 'center',
    },
    textInputEmail: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#fff',
        borderWidth: .5,
        color: '#000',
        fontFamily: 'GillSans-Light',
        height: deviceHeight/12,
        margin: deviceHeight/35,
        textAlign: 'center',
        width: 200,
    },
    textInputPassword: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#fff',
        borderWidth: .5,
        color: '#000',
        fontFamily: 'GillSans-Light',
        height: deviceHeight/12,
        marginBottom: deviceHeight/35,
        textAlign: 'center',
        width: 200,
    },
    textHeader: {
        color: '#fff',
        fontFamily: 'GillSans-Light',
        textAlign: 'center',
    },
    textLocation:{
        fontFamily: 'GillSans-Light',
        fontWeight: '500',
        fontSize: 15,
        textAlign: 'center',
    },
    textPost: {
        fontFamily: 'GillSans-Light',
        textAlign: 'center',
    },
    textPostInput: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#262626',
        fontFamily: 'GillSans-Light',
        height: 50,
        textAlign: 'center',
        width: deviceWidth,
    },
    whiteText: {
        color: '#fff',
        fontFamily: "GillSans",
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
    },
});

module.exports = styles;