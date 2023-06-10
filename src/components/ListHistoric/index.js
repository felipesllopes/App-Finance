import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from "react-native";

export default function ListHistoric({ data }) {
    return (
        <View style={styles.container}>

            <View style={[styles.box, data.tipo === 'receita' ? { backgroundColor: '#009000' } : { backgroundColor: '#FF0000' }]}>
                <Ionicons name={data.tipo === 'receita' ? 'arrow-up-sharp' : 'arrow-down'} size={20} color={'#FFF'} />
                <Text style={styles.text}>{data.tipo}</Text>
            </View>

            <Text style={styles.value}>R$ {data.valor}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 6,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        padding: 6,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        width: 120,
        borderRadius: 6,
        justifyContent: 'center'
    },
    text: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        marginLeft: 4,
    },
    value: {
        fontSize: 19,
        fontWeight: 'bold',
    }
})