import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import StackRoutes from './stack.routes';
import Inicio from '../screens/InicioDrawer';
import Clientes from '../screens/ClientesDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator screenOptions={{ title: '' }}>
            <Drawer.Screen 
                name="home" 
                component={Inicio}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="home" color={color} size={size}/>,
                    drawerLabel: 'Início'
                }}
            />
            <Drawer.Screen 
                name="clientes" 
                component={Clientes}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="user" color={color} size={size}/>,
                    drawerLabel: 'Clientes'
                }}
            />

        </Drawer.Navigator>
    )
}