import { StyleSheet, Text, View } from 'react-native';
export default function DetailsScreen({ route }) {

    const { name, email, phone } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Detalles del usuario</Text>
            <Text style={styles.detail}>Name: {name}</Text>
            <Text style={styles.detail}>Email: {email}</Text>
            <Text style={styles.detail}>Phone: {phone}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detail: {
        fontSize: 18,
        marginBottom: 10,
    },
})