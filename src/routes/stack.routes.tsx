import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import DrawerRoutes from './drawer.routes';

export type RootStackParamList = {
    login: undefined;
    inicio: undefined;
  };

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="login" 
                component={Login}
            />
            <Stack.Screen 
                name="inicio" 
                component={DrawerRoutes}
            />
        </Stack.Navigator>
    )
}