import { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import firebase from "../../services/firebaseConnection";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../../contexts/auth";

export default function Login() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user } = useContext(AuthContext);

    function handleLogin() {
        if (email === '' || password === '') {
            alert("Digite email e senha")
            return;
        }
        alert("Usuário logado. ", user.nome)
        console.log(user.nome)
    }

    return (
        <View style={styles.container}>

            <Image source={require('../../assets/Logo.png')} style={styles.image} />

            <TextInput
                style={styles.textInput}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                placeholderTextColor={'#666'}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.textInput}
                placeholder="Senha"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholderTextColor={'#666'}
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
                <Text style={styles.textAccount}>Criar uma conta</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#363636',
        padding: 15
    },
    image: {
        height: 114,
        width: 140,
        alignSelf: 'center',
        marginBottom: 80,
    },
    textInput: {
        backgroundColor: '#242424',
        height: 55,
        color: 'white',
        fontSize: 18,
        padding: 10,
        borderRadius: 6,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#00FF00',
        height: 44,
        justifyContent: 'center',
        borderRadius: 6,
        marginVertical: 10,
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#363636',
    },
    textAccount: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 15,
    }
})