import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import ListHistoric from '../../components/ListHistoric';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';

export default function Home() {

    const [balance, setBalance] = useState(0);
    const [movies, setMovies] = useState([]);

    const { user } = useContext(AuthContext);
    const uid = user && user.uid;

    useEffect(() => {
        (async () => {
            await firebase.database().ref("usuario").child(uid).on('value', (snapshot) => {
                setBalance(snapshot.val().saldo)
            })

            await firebase.database().ref('historico').child(uid).orderByChild('date')
                .equalTo(format(new Date(), 'dd/MM/yy'))
                .limitToLast(10).on('value', (snapshot) => {
                    setMovies([]);

                    snapshot.forEach((childItem) => {
                        let list = {
                            key: childItem.key,
                            tipo: childItem.val().tipo,
                            valor: childItem.val().valor,
                        }

                        setMovies(oldArray => [...oldArray, list].reverse());
                    });
                })
        })();
    }, [])

    return (
        <SafeAreaView style={styles.container}>

            <Header />

            <Text style={styles.name}>{user && user.name}</Text>
            <Text style={styles.balance}>R${balance.toFixed(2)}</Text>

            <Text style={styles.latestMovies}>Últimas movimentações</Text>


            <View style={styles.box}>
                <FlatList
                    style={{ margin: 10 }}
                    data={movies}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (<ListHistoric data={item} />)}
                    showsVerticalScrollIndicator={false}
                />
            </View>

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
    latestMovies: {
        fontSize: 17,
        color: '#00FF00',
        marginLeft: 10,
        marginBottom: 4,
    },
    box: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
    }
})