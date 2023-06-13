import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../pages/Home";
import New from "../pages/New";
import Profile from "../pages/Profile";

const AppDrawer = createDrawerNavigator();

export default function AppRoutes() {
    return (
        <AppDrawer.Navigator
            useLegacyImplementation={true} // por atualização, é obrigatória a implementação dessa propriedade no Drawer

            screenOptions={{
                drawerActiveTintColor: 'white',
                drawerActiveBackgroundColor: '#00FF00',
                drawerStyle: {
                    backgroundColor: '#363636',
                },
                drawerLabelStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                },
                drawerItemStyle: {
                    marginVertical: 5,
                },
                drawerInactiveBackgroundColor: '#242424',
            }}
        >

            <AppDrawer.Screen name="Home" component={Home} options={{ headerShown: false, title: 'Início' }} />

            <AppDrawer.Screen name="Profile" component={Profile} options={{ headerShown: false, title: 'Perfil' }} />

            <AppDrawer.Screen name="New" component={New} options={{ headerShown: false, title: 'Registrar' }} />

        </AppDrawer.Navigator>
    )
}