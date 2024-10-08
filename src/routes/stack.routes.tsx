import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from '../screens/Login';
import DrawerRoutes from './drawer.routes';
import ClientePerfil from '../screens/ClientePerfil';
import ClienteAdd from '../screens/ClienteAdd';
import LeadPerfil from '../screens/LeadsPerfil';
import LeadAdd from '../screens/LeadAdd';
import RelatorioReceita from '../screens/RelatoriosPath/Receita';
import RelatorioAniversariantes from '../screens/RelatoriosPath/Aniversariantes';
import EstoqueAdd from '../screens/EstoqueAdd';
import Clientes from '../screens/ClientesDrawer';

export type RootStackParamList = {
    login: undefined;
    inicio: undefined;
    ClientePerfil: { clienteId: number; clienteNome: string };
    LeadPerfil: { leadId: number; leadNome: string };
    ClienteAdd: undefined;
    LeadAdd: undefined;
    RelatorioReceita: undefined;
    RelatorioAniversariantes: undefined;
    EstoqueAdd: undefined;
    ClienteLista: undefined;
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
                name="ClienteLista" 
                component={Clientes}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: 'Clientes',
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
            <Stack.Screen 
                name="RelatorioReceita"    
                component={RelatorioReceita}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: 'Receita',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={25} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen 
                name="RelatorioAniversariantes"    
                component={RelatorioAniversariantes}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: 'Aniversariantes',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={25} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen 
                name="EstoqueAdd"    
                component={EstoqueAdd}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: 'Novo Produto',
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