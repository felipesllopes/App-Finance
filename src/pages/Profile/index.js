import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";

export default function Profile() {

    const { user, signOut } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>

            <Header />

            <Text style={styles.name}>{user && user.name}</Text>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('New')}
                style={[styles.button, { backgroundColor: '#00FF00' }]}
            >
                <Text style={styles.textButton}>Registrar gasto</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => signOut()} style={styles.button} activeOpacity={0.7}>
                <Text style={styles.textButton}>Sair</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#363636',
        padding: 10,
    },
    name: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 100,
    },
    button: {
        backgroundColor: '#FF0000',
        width: '100%',
        height: 45,
        marginVertical: 7,
        justifyContent: 'center',
        borderRadius: 10,
    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFF',
    },
})