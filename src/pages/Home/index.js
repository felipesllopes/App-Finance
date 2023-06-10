import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';

export default function Home() {

    const { user, signOut } = useContext(AuthContext);

    return (
        <View style={styles.container}>

            <Header />

            <Text style={styles.name}>{user && user.name}</Text>
            <Text style={styles.balance}>R$1.764,90</Text>

            <Text style={styles.latestMovies}>Últimas movimentações</Text>

            <View style={styles.box}>

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