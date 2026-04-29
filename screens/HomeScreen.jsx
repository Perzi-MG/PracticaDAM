import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function HomeScreen() {

    const navigation = useNavigation();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('')

        
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('username');
            navigation.replace(`Login`) 
        } catch (error) {
            console.log('Error al cerrar sesiòn', error);
            
        }
    }

    useEffect(() => {

        const loadUserData = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                if (storedUsername) {
                    setUsername(storedUsername);
                }
            } catch (error) {
                console.log('Error al cargar el nombre de usuario', error);
                
            } finally {
                setLoading(false)
            }
        }

        const fetchItems = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setItems(data);
                setLoading(false);
            } catch (error) {
                console.log('Error al obtener datos: ', error);
                
            }
        }
        fetchItems();
        loadUserData();
    }, []);

    const handlePressItem = (item) => {
        navigation.navigate('Details', { 
            name: item.name,
            email: item.email,
            phone: item.phone, 
        });
    }

    if (loading) {
        return <ActivityIndicator size={'large'} color={'#0000ff'}/>
    }

    return (
        <View style={styles.container}>
            <Text>{username}</Text>
            {loading ? <Text>Cargando datos...</Text> : (
                <FlatList
                    data={items}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePressItem(item)}>
                            <Text style={styles.item}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                    }
                    keyExtractor={item => item.id.toString()}
                />
            )}
            <Button title='Cerrar Sesion' onPress={handleLogout}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
