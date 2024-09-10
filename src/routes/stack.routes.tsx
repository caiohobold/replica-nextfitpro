import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from '../screens/Login';
import DrawerRoutes from './drawer.routes';
import ClientePerfil from '../screens/ClientePerfil';
import ClienteAdd from '../screens/ClienteAdd';
import LeadPerfil from '../screens/LeadsPerfil';
import LeadAdd from '../screens/LeadAdd';

export type RootStackParamList = {
    login: undefined;
    inicio: undefined;
    ClientePerfil: { clienteId: number; clienteNome: string };
    LeadPerfil: { leadId: number; leadNome: string };
    ClienteAdd: undefined;
    LeadAdd: undefined
  };

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function StackRoutes() {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#2F2F2F',
                },
                headerTintColor: 'white',
            }}>
            <Stack.Screen 
                name="login" 
                component={Login}
            />
            <Stack.Screen 
                name="inicio" 
                component={DrawerRoutes}
            />
            <Stack.Screen 
                name="ClientePerfil"    
                component={ClientePerfil}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: 'Perfil do Cliente',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={25} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen 
                name="ClienteAdd" 
                component={ClienteAdd}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: 'Novo Cliente',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={25} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen 
                name="LeadPerfil"    
                component={LeadPerfil}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: 'Perfil do Lead',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={25} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen 
                name="LeadAdd"    
                component={LeadAdd}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: 'Novo Lead',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={25} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    )
}