import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage('');
        if (username && password) {
            try {
                await AsyncStorage.setItem('username', username);
                navigation.replace("Home");
            } catch (error) {
                console.log('Error al guardar los datos en AsyncStorage', error);
            } finally {
                setLoading(false);
            }
        } else {
            setErrorMessage('Por favor ingresa tanto el usuario como la contraseña');
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Iniciar Sesion
            </Text>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder='Usuario'
                value={username}
                onChangeText={setUsername} />
            <TextInput
                style={styles.input}
                placeholder='Contraseña'
                secureTextEntry
                value={password}
                onChangeText={setPassword} />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title='Inciar Sesion' onPress={handleLogin} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});