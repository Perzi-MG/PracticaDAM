import DetailsScreen from '@/screens/DetailsScreen.jsx';
import HomeScreen from '@/screens/HomeScreen.jsx';
import LoginScreen from '@/screens/LoginScreen.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                if (storedUsername) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.log('Error al verificar el estado de inicio de sesión: ', error);
                setIsLoggedIn(false);
            }
        };
        checkLoginStatus();
    }, []);

    if (isLoggedIn === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}