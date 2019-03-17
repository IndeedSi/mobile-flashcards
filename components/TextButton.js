import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {}, ...props }) {
    return (
        <TouchableOpacity onPress={onPress} {...props}>
            <Text style={[styles.reset, style]}>{children}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        color: purple,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 100,
        paddingRight: 100,
        overflow: 'hidden',
        fontSize: 16,
    }
});