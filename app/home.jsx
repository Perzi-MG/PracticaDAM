import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
export default function HomeScreen() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    return (
        <View style={styles.container}>
            {loading ? <Text>Cargando datos...</Text> : (
                <FlatList
                    data={items}
                    renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>
                    }
                    keyExtractor={item => item.id.toString()}
                />
            )}
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
