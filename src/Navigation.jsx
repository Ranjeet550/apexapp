import React, { useEffect, useState, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import useStore from './store/Store'; // Import zustand store

// Using React.lazy for lazy loading screens
const HomeScreen = React.lazy(() => import('./Screens/HomeScreen'));
const DetailsScreen = React.lazy(() => import('./Screens/DetailsScreen'));
const ContactScreen = React.lazy(() => import('./Screens/ContactScreen'));
const LoginScreen = React.lazy(() => import('./Screens/UserAuth/Login'));
const ForgotPasswordScreen = React.lazy(() => import('./Screens/UserAuth/ForgotPassword'));

// Create Stack Navigators for both Auth and App
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
};

const AppStackScreen = () => {
  return (
    <AppStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Details" component={DetailsScreen} />
      <AppStack.Screen name="Contact" component={ContactScreen} />
    </AppStack.Navigator>
  );
};

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = useStore((state) => state.token); // Get token from zustand store
  const initState = useStore((state) => state.initState); // Initialize state from AsyncStorage

  // Initialize state when the app starts
  useEffect(() => {
    const initialize = async () => {
      await initState();  // Wait for state to be initialized
      setIsLoading(false); // Set loading to false once initialization is complete
    };
    initialize();
  }, [initState]);

  if (isLoading) {
    // Show a loading spinner until the state is initialized
    return <Spinner visible={true} textContent="Loading..." />;
  }

  return (
    <NavigationContainer>
      <Suspense fallback={<Spinner visible={true} textContent="Loading..." />}>
        {token ? <AppStackScreen /> : <AuthStackScreen />}
      </Suspense>
    </NavigationContainer>
  );
};

export default Navigation;
