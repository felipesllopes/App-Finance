import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { useContext, useState } from "react";
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import PickerSelect from "../../components/Picker";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../services/firebaseConnection";

export default function New() {

    const navigation = useNavigation();
    const { user: usuario } = useContext(AuthContext);

    const [value, setValue] = useState('');
    const [type, setType] = useState('receita');

    function handleSubmit() {
        if (value === '' || type === null) {
            alert("Preencha os campos")
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo: ${type} - R$${parseFloat(value)}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )
    }

    async function handleAdd() {
        let uid = await usuario.uid;

        let key = await firebase.database().ref('historico').child(uid).push().key;

        await firebase.database().ref('historico').child(uid).child(key).set({
            tipo: type,
            valor: parseFloat(value),
            date: format(new Date(), 'dd/MM/yy')
        })

        // Atualizar saldo
        let user = firebase.database().ref('usuario').child(uid);
        await user.once('value').then((snapshot) => {
            let saldo = parseFloat(snapshot.val().saldo);

            type === 'receita' ? saldo += parseFloat(value) : saldo -= parseFloat(value);

            user.child('saldo').set(saldo);
        })

        Keyboard.dismiss();
        setValue('');
        setType('receita');
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header />
            <TextInput
                style={styles.textInput}
                placeholder="Valor desejado"
                value={value}
                onChangeText={(text) => setValue(text)}
                keyboardType="numeric"
                returnKeyType="next"
            />

            <PickerSelect onChange={setType} type={type} />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textButton}>Registrar</Text>
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
    textInput: {
        marginTop: 50,
        backgroundColor: '#FFF',
        height: 46,
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#00FF00',
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