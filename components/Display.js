import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from 'expo-font';

export default props => {

    const [loaded, error] = useFonts({
        'Helvetica Neue': require('../assets/fonts/HelveticaNeueUltraLight.otf'),
    });

    return (
        <View style={style.display}>
            <Text numberOfLines={1} style={style.displayValue}>{props.value}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-end'
    },
    displayValue: {
        fontSize: 60,
        fontFamily: "Helvetica Neue",
        color: "#fff",
    }
});