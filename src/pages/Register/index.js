import { useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/auth";

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp, loadingAuth } = useContext(AuthContext);

    function handleRegister() {
        signUp(email, password, name)
    }

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.textInput}
                placeholder="Nome"
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor={'#666'}
            />

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

            <TouchableOpacity style={styles.button} onPress={handleRegister} activeOpacity={0.7}>
                {loadingAuth ?
                    (<ActivityIndicator size={20} color={'#FFF'} />
                    ) : (
                        <Text style={styles.textButton}>Cadastrar</Text>
                    )
                }
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
})