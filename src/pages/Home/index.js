import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { Button } from 'react-native';

export default function Home() {

    const { user, signOut } = useContext(AuthContext);

    useEffect(() => {
        console.log(user)
    }, [])

    return (
        <View>
            <Text>Home</Text>
            <Text>{user && user.name}</Text>
            <Text>{user && user.email}</Text>

            <Button title='Sair' onPress={() => signOut()} />
        </View>
    )
}