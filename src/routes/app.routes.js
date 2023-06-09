import Home from "../pages/Home";
import { createDrawerNavigator } from "@react-navigation/drawer"

const AppDrawer = createDrawerNavigator();

export default function AppRoutes() {
    return (
        <AppDrawer.Navigator
            useLegacyImplementation={true}

            screenOptions={{
                drawerActiveTintColor: 'white',
                drawerActiveBackgroundColor: '#00FF00',
                // drawerActiveBackgroundColor: 'blue',
                drawerStyle: {
                    backgroundColor: '#242424',
                },
                drawerLabelStyle: {
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            }}
        >

            <AppDrawer.Screen name="Home" component={Home} />

        </AppDrawer.Navigator>
    )
}