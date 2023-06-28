import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isPast } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import ListHistoric from '../../components/ListHistoric';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';

export default function Home() {

    const [balance, setBalance] = useState(0);
    const [movies, setMovies] = useState([]);
    const [array, setArray] = useState([]);
    const [show, setShow] = useState(false);
    const [newDate, setNewDate] = useState(new Date());

    const { user } = useContext(AuthContext);
    const uid = user && user.uid;

    useEffect(() => {
        firebase.database().ref("usuario").child(uid).on('value', (snapshot) => {
            setBalance(snapshot.val().saldo)
        })

        firebase.database().ref('historico').child(uid).orderByChild('date')
            .equalTo(format(newDate, 'dd/MM/yy'))
            .limitToLast(10).on('value', (snapshot) => {
                setMovies([]);

                snapshot.forEach((childItem) => {
                    let list = {
                        key: childItem.key,
                        tipo: childItem.val().tipo,
                        valor: childItem.val().valor,
                        date: childItem.val().date,
                    }
                    setMovies(oldArray => [...oldArray, list]);
                });
            })
    }, [newDate])

    function handleDelete(data) {

        if (isPast(new Date(data.date))) {
            // irá entrar aqui se a data for antiga
            alert("Você não pode excluir um registro antigo.");
            return;
        }

        Alert.alert(
            'Atenção!',
            `${data.tipo === 'receita' ? 'Receita' : 'Despesa'} R$${data.valor} - ${data.date}`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: () => handleDeleteSucess(data) }
            ]
        )
    }

    async function handleDeleteSucess(data) {
        await firebase.database().ref('historico').child(uid).child(data.key).remove()
            .then(async () => {
                let saldoAtual = balance;
                data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

                await firebase.database().ref('usuario').child(uid)
                    .child('saldo').set(saldoAtual);
            })
            .catch((error) => { console.log(error) })
    }

    function handleDate() {
        setShow(true);
    }

    function closeHandleDate(event, date) {
        setShow(false);
        if (date) {
            setNewDate(date);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header />

            <Text style={styles.name}>{user && user.name}</Text>
            <Text style={styles.balance}>R${balance.toFixed(2)}</Text>

            <View style={{ flexDirection: 'row', marginBottom: 5, }}>
                <Text style={styles.latestMovies}>Últimas movimentações</Text>
                <TouchableOpacity onPress={handleDate} activeOpacity={0.7}>
                    <Ionicons name='calendar-outline' size={25} color={'white'} />
                </TouchableOpacity>
            </View>

            <View style={styles.box}>

                {movies.length == 0 ? <Text style={styles.notBalance}>Você não tem nenhum registro nessa data!</Text> :
                    <FlatList
                        style={{ margin: 10 }}
                        data={movies}
                        keyExtractor={item => item.key}
                        renderItem={({ item }) => (<ListHistoric data={item} deleteItem={handleDelete} />)}
                        showsVerticalScrollIndicator={false}
                    />
                }

            </View>

            {show &&
                <DateTimePicker
                    value={newDate}
                    mode='date'
                    display='default'
                    onChange={closeHandleDate}
                    maximumDate={new Date()}
                />
            }

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
        fontSize: 20,
        color: '#FFF',
        marginTop: 40,
        fontStyle: 'italic'
    },
    balance: {
        fontSize: 22,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 40,
    },
    notBalance: {
        marginTop: 100,
        textAlign: 'center',
        fontSize: 17,
        fontStyle: 'italic',
    },
    latestMovies: {
        fontSize: 17,
        color: '#00FF00',
        marginLeft: 10,
        marginBottom: 4,
        marginRight: 10,
    },
    box: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
    }
})