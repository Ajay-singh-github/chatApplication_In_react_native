import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RoomsListScreen from './src/screens/RoomsListScreen';
import CreateRoomScreen from './src/screens/CreateRoomScreen';
import ChatScreen from './src/screens/ChatScreen';
import StatsScreen from './src/screens/StatsScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RoomsList" component={RoomsListScreen} />
        <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="stats screen" component={StatsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
