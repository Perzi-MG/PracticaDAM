import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function App() {


    return (
        <NavigationContainer>
            <Stack>
                <Stack.Screen name='index' />
                <Stack.Screen name='home' />
            </Stack>
        </NavigationContainer>
    )
}