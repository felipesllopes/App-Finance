import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

const AuthStack = createNativeStackNavigator();

export default function AuthRoutes() {
    return (
        <AuthStack.Navigator>

            <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />

            <AuthStack.Screen name="Logout" component={Logout}
                options={{
                    headerStyle: {
                        backgroundColor: '#242424'
                    },
                    headerTintColor: '#00FF00',
                    title: 'Voltar'
                }}
            />

        </AuthStack.Navigator>
    )
}