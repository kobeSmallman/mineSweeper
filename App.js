import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './src/screens/MainMenu';
import GameScreen from './src/screens/GameScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import InstructionsScreen from './src/screens/InstructionsScreen';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const Stack = createStackNavigator();
//routes for the screens
function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Main Menu' }} />
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: 'Game' }} />
        <Stack.Screen name="LeaderboardScreen" component={LeaderboardScreen} options={{ title: 'Leaderboard' }} />
        <Stack.Screen name="InstructionsScreen" component={InstructionsScreen} options={{ title: 'How to Play' }} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => MainApp);

export default MainApp;
