import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {

    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const savedUsername = await AsyncStorage.getItem('username');
                const savedPassword = await AsyncStorage.getItem('password');
                if (savedUsername) setUsername(savedUsername);
                if (savedPassword) setUsername(savedPassword);
            } catch (error) {
                console.log('Error al cargar los datos desde AsyncStorage', error);
            };
        };
        loadUserData();
    }, []);

    const handleLogin = async () => {
        if (username === 'admin' && password === 'password') {
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('password', password);
            alert('Datos guardados correctamente');
            console.log(`Usuario: ${username}, Contraseña: ${password}`);
            navigation.navigate('Home')
        } else {
            alert('Por favor ingresa tanto el usuario como la contraseña');
            try {
            } catch (error) {
                console.log('Error al guardar los datos en AsyncStorage', error);

            }
        }

    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Bienvenido
            </Text>
            <TextInput style={styles.input} placeholder='Usuario' onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder='Contraseña' secureTextEntry onChangeText={setPassword} />
            <Button title='Inciar Sesion' onPress={handleLogin} />
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
});