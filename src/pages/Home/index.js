import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';
import ListHistoric from '../../components/ListHistoric';

export default function Home() {

    const { user, signOut } = useContext(AuthContext);
    const [movies, setMovies] = useState([
        { key: 1, tipo: 'receita', valor: 1200 },
        { key: 2, tipo: 'despesa', valor: 400 },
        { key: 3, tipo: 'despesa', valor: 320 },
        { key: 4, tipo: 'receita', valor: 100 },
        { key: 5, tipo: 'receita', valor: 1200 },
        { key: 6, tipo: 'despesa', valor: 400 },
        { key: 7, tipo: 'despesa', valor: 320 },
        { key: 8, tipo: 'receita', valor: 100 },
        { key: 9, tipo: 'receita', valor: 1200 },
        { key: 10, tipo: 'despesa', valor: 400 },
        { key: 11, tipo: 'despesa', valor: 320 },
        { key: 12, tipo: 'receita', valor: 100 },
        { key: 13, tipo: 'receita', valor: 1200 },
        { key: 14, tipo: 'despesa', valor: 400 },
        { key: 15, tipo: 'despesa', valor: 320 },
        { key: 16, tipo: 'receita', valor: 100 },
    ])

    return (
        <View style={styles.container}>

            <Header />

            <Text style={styles.name}>{user && user.name}</Text>
            <Text style={styles.balance}>R$1.764,90</Text>

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

        </View>
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