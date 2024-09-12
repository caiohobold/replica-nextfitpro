import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LoadingComponent from '../LoadingComponent';

const LoginButton = ({ title, onPress, loading }: { title: string, onPress: () => void, loading: boolean }) => (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
        {loading ? (
            <LoadingComponent size="small" color="#fff"/>
        ) : (
            <Text style={styles.buttonText}>{title}</Text>
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#93039D',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 44 / 2,
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginButton;
