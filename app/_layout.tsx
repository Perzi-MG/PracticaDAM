import DetailsScreen from '@/screens/DetailsScreen.jsx';
import HomeScreen from '@/screens/HomeScreen.jsx';
import LoginScreen from '@/screens/LoginScreen.jsx';
import ProfileScreen from '@/screens/ProfileScreen.jsx';
import SettingsScreen from '@/screens/SettingsScreen.jsx';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabsNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Home'){
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === 'Details') {
                        iconName = focused ? "list" : "list-outline";
                    } else if (route.name === 'Profile') {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === 'Settings') {
                        iconName = focused ? "settings" : "settings-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                },
                activeTintColor: "tomato",
                inactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Details" component={DetailsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />

        </Tab.Navigator>
    )
}

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
        <NavigationContainer linking={{ enabled: false }}>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <Stack.Screen name="HomeTabs" component={TabsNavigator} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}