import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from '../screens/Login';
import DrawerRoutes from './drawer.routes';
import ClientePerfil from '../screens/ClientePerfil';
import ClienteAdd from '../screens/ClienteAdd';

export type RootStackParamList = {
    login: undefined;
    inicio: undefined;
    ClientePerfil: { clienteId: number; clienteNome: string };
    ClienteAdd: undefined;
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
            <Stack.Screen 
                name="ClientePerfil"    
                component={ClientePerfil}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: 'Perfil do Cliente',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={25} color="#000" />
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
                            <Icon name="arrow-back" size={25} color="#000" />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    )
}