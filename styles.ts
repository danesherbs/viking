import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    background: {
        flex: 1
    },

    search: {
        backgroundColor: 'powderblue',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchBoundingBox: {
        backgroundColor: 'black',
        width: '85%',
    },

    pointerBoundingBox: {
        backgroundColor: 'blue',
        width: 350,
        height: 350,
    },

    pointer: {
        backgroundColor: 'skyblue',
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    progressBoundingBox: {
        backgroundColor: 'steelblue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    progress: {
        width: '85%',
        transform: [{ scaleY: 12.0 }],
    },
    });

export const searchStyles = StyleSheet.create({
    textInputContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth:0
    },

    textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16
    },

    predefinedPlacesDescription: {
        color: '#1faadb'
    },

    description: {
        fontWeight: 'bold'
    },
    });
