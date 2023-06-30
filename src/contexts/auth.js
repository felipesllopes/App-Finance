import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import firebase from "../services/firebaseConnection";
import AlertMessage from "./alertMessage";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(() => {
        (async () => {
            const storageUser = await AsyncStorage.getItem('Auth_user')
            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
        })();

        setLoading(false);
    }, []);

    /**
     * Function to login user
     * @param {*} email 
     * @param {*} password 
     */
    async function signIn(email, password) {

        if (email === '' || password === '') {
            Alert.alert('Preencha os campos!', 'Preencha todos os campos para fazer o login.');
            return
        }

        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await firebase.database().ref('usuario').child(uid).once('value')
                    .then((snapshot) => {
                        let data = {
                            uid: uid,
                            name: snapshot.val().nome,
                            email: value.user.email,
                        }
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                    }).catch((error) => AlertMessage(error))
            })
            .catch((error) => {
                AlertMessage(error);
                setLoadingAuth(false);
            })
    }

    /**
     * Function to register user.
     * @param {*} email 
     * @param {*} password 
     * @param {*} name 
     */
    async function signUp(email, password, name) {

        if (email === '', password === '', name === '') {
            Alert.alert(
                'Preencha os campos!',
                'Preencha todos os campos para se registrar'
            )
            return;
        }

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                await firebase.database().ref('usuario').child(uid).set({
                    saldo: 0,
                    nome: name,
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email,
                        }
                        setUser(data);
                        storageUser(data);
                    }
                    ).catch((error) => {
                        AlertMessage(error);
                    })
            })
            .catch((error) => {
                AlertMessage(error);
            })
    }

    /**
     * Function to disconnect user.
     */
    async function signOut() {

        Alert.alert(
            'Sair',
            'Deseja sair do app?',
            [
                { text: 'Cancelar', style: 'cancel', },
                { text: 'Sair', onPress: sair }
            ]
        )
        async function sair() {
            await firebase.auth().signOut();
            await AsyncStorage.clear()
                .then(() => {
                    setUser(null)
                })
                .catch((error) => AlertMessage(error))
        }
    }

    /**
     * Function to use asyncStorage
     * @param {*} data 
     */
    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
            .catch((error) => AlertMessage(error))
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signUp, signIn, signOut, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
}