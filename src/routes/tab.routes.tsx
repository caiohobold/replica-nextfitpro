import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Inicio from '../screens/InicioDrawer';
import Clientes from '../screens/ClientesDrawer';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="inicio" component={Inicio} />
            <Tab.Screen name="clientes" component={Clientes} />
        </Tab.Navigator>
    )
}