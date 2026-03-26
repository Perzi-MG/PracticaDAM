import { View, Text } from 'react-native'
export default function DetailsScreen({ route }) {

    const [name, email, phone] = route.params;



    return (
        <View>
            <Text></Text>
        </View>
    )
}

const styles = 