import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather, MaterialCommunityIcons  } from '@expo/vector-icons';

import Inicio from '../screens/InicioDrawer';
import Clientes from '../screens/ClientesDrawer';
import Agenda from '../screens/AgendaDrawer';
import Treinos from '../screens/TreinosDrawer';
import Avaliacao from '../screens/AvaliacaoDrawer';
import Wod from '../screens/WodDrawer';

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
                name="agenda" 
                component={Agenda}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="calendar" color={color} size={size}/>,
                    drawerLabel: 'Agenda'
                }}
            />
            <Drawer.Screen 
                name="treinos" 
                component={Treinos}
                options={{
                    drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="dumbbell" color={color} size={size}/>,
                    drawerLabel: 'Treinos'
                }}
            />
            <Drawer.Screen 
                name="avaliacao" 
                component={Avaliacao}
                options={{
                    drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="heart-pulse" color={color} size={size}/>,
                    drawerLabel: 'Avaliação'
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