import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function Home() {

    const { user } = useContext(AuthContext);

    useEffect(() => {
        console.log(user)
    }, [])

    return (
        <View>
            <Text>Home</Text>
            <Text>{user && user.name}</Text>
            <Text>{user && user.email}</Text>
        </View>
    )
}