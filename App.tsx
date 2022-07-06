import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Animated, {BounceIn, BounceOut} from 'react-native-reanimated';

const styles = StyleSheet.create({
  bigText: {
    fontSize: 30,
  },
});

function NormalScreen() {
  return (
    <View>
      <Text style={styles.bigText}>This is a screen without animation.</Text>
    </View>
  );
}
function AnimatedScreen() {
  return (
    <View>
      <Animated.Text
        entering={BounceIn}
        exiting={BounceOut}
        style={styles.bigText}>
        {`Screen with layout animation. Opening this screen will move the content below the app bar.
If this tab is viewed before the "OtherTab", switching to that tab will also show its content under the app bar.
If "OtherTab" is opened first, then only this tab will have the issue.
Once the issue happens, only restarting the app returns it to normal.
        `}
      </Animated.Text>
    </View>
  );
}
const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={NormalScreen} />
    </HomeStack.Navigator>
  );
}
const AnotherTabStack = createNativeStackNavigator();
function AnotherTabStackScreen() {
  return (
    <AnotherTabStack.Navigator>
      <AnotherTabStack.Screen name="Another" component={NormalScreen} />
    </AnotherTabStack.Navigator>
  );
}

const AnimatedTabStack = createNativeStackNavigator();
function AnimatedTabStackScreen() {
  return (
    <AnimatedTabStack.Navigator>
      <AnimatedTabStack.Screen name="Animated" component={AnimatedScreen} />
    </AnimatedTabStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="HomeTab" component={HomeStackScreen} />
        <Tab.Screen name="AnimatedTab" component={AnimatedTabStackScreen} />
        <Tab.Screen name="OtherTab" component={AnotherTabStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
