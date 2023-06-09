import React, { createContext, useEffect, useState } from "react";
import firebase from "../services/firebaseConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();

    }, []);

    // Logar usuario
    async function signIn(email, password) {
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
                        alert('Usuário logado')
                    })
            })
            .catch((error) => {
                console.log('Erro: ', error)
            })
    }

    // cadastrar usuario
    async function signUp(email, password, name) {
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
                    })
            })
            .catch((error) => {
                console.log('Erro: ', error)
            })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, loading }}>
            {children}
        </AuthContext.Provider>
    )
}