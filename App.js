import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import SeanceListScreen from './screens/SeanceListScreen';
import AddSeance from './screens/AddSeance';
import AddActivite from './screens/AddActivite';
import SeanceActivite from './screens/SeanceActivite';
import ActiviteSeance from './screens/ActiviteSeance'
import EditSeance from './screens/EditSeance';
import EditActivite from './screens/EditActivite';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Fonction du Stack Navigator qui regroupe les écrans
function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Accueil" 
        component={SeanceListScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AddSeance" 
        component={AddSeance} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AddActivite" 
        component={AddActivite} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="SeanceActivite"
        component={SeanceActivite}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#333',
          },
          headerTintColor: 'gold',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ActiviteSeance"
        component={ActiviteSeance}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#333',
          },
          headerTintColor: 'gold',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
       <Stack.Screen
        name="EditSeance"
        component={EditSeance}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#333',
          },
          headerTintColor: 'gold',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="EditActivite"
        component={EditActivite}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#333',
          },
          headerTintColor: 'gold',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      
      
    </Stack.Navigator>
  );
}

// Configuration du BottomTabNavigator
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#333',
            borderTopWidth: 0,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Icône pour chaque écran
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'; // Icône de maison
            } else if (route.name === 'Add') {
              iconName = focused ? 'leaf' : 'leaf-outline'; // Icône de feuille pour AddSeance
            } else if (route.name === 'AddActivite') {
              iconName = focused ? 'barbell' : 'barbell-outline'; // Icône d'haltère pour AddActivite
            }

            return <Icon name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: '#FFD700', // Couleur active des icônes
          tabBarInactiveTintColor: '#aaa', // Couleur inactive des icônes
        })}
      >
        
        <Tab.Screen name="Add" component={AddSeance} />
        <Tab.Screen name="Home" component={RootStack} />
        <Tab.Screen name="AddActivite" component={AddActivite} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
