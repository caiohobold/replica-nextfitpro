import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather, MaterialCommunityIcons  } from '@expo/vector-icons';

import Inicio from '../screens/InicioDrawer';
import Clientes from '../screens/ClientesDrawer';
import Avaliacao from '../screens/RelatoriosDrawer';
import Wod from '../screens/WodDrawer';
import Leads from '../screens/LeadsDrawer';
import Estoque from '../screens/EstoqueDrawer';
import Relatorios from '../screens/RelatoriosDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator 
            screenOptions={{ 
                title: '',
                drawerStyle: {
                    backgroundColor: '#2F2F2F'
                },
                drawerActiveTintColor: 'white',
                drawerInactiveTintColor: '#A0A0A0',
                headerStyle: {
                    backgroundColor: '#2F2F2F',
                },
                headerTintColor: 'white',
            }}>
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
                    drawerLabel: 'Clientes',
                    headerTitle: 'Clientes'
                }}
            />
            <Drawer.Screen 
                name="leads" 
                component={Leads}
                options={{
                    drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="account-box-multiple" color={color} size={size}/>,
                    drawerLabel: 'Leads',
                    headerTitle: 'Leads'
                }}
            />
            <Drawer.Screen 
                name="estoque" 
                component={Estoque}
                options={{
                    drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="cart" color={color} size={size}/>,
                    drawerLabel: 'Estoque',
                    headerTitle: 'Estoque'
                }}
            />
            <Drawer.Screen 
                name="relatorios" 
                component={Relatorios}
                options={{
                    drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="file-chart" color={color} size={size}/>,
                    drawerLabel: 'Relatórios',
                    headerTitle: 'Relatórios'
                }}
            />
            <Drawer.Screen 
                name="wod" 
                component={Wod}
                options={{
                    drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="weight" color={color} size={size}/>,
                    drawerLabel: 'WOD'
                }}
            />

        </Drawer.Navigator>
    )
}