import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Agenda from '../screens/AgendaDrawer';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="home" 
                component={Agenda}
            />
        </Stack.Navigator>
    )
}