import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

export default function CustomDrawer(props) {

    const { user, signOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../assets/Logo.png')}
                    resizeMode="contain"
                />

                <Text style={styles.salutation}>Bem-vindo</Text>
                <Text style={styles.name}>{user && user.name}</Text>
            </View>

            <DrawerItemList {...props} />

            <DrawerItem
                {...props}
                style={styles.drawerButton}
                label={() => <Text style={styles.textLabel}>Sair do app</Text>}
                onPress={() => signOut()}
            />

        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    },
    image: {
        height: 80,
        width: 80
    },
    salutation: {
        color: '#FFF',
        fontSize: 18,
        marginTop: 5,
        fontWeight: 'bold',
    },
    name: {
        color: '#FFF',
        fontSize: 17,
        marginTop: 10,
        paddingBottom: 25,
    },
    drawerButton: {
        backgroundColor: 'red',
        marginTop: 30,
    },
    textLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})