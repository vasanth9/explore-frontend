
import { Colors } from '@/constants/Colors';
import { ThemeProvider } from '@/context/ThemeContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;



  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
   <SafeAreaProvider>
      <Stack screenOptions={{headerStyle:{backgroundColor:theme.background}, headerTintColor:theme.text, headerShadowVisible:false}}>
        <Stack.Screen name="index" options={{ headerShown: false , title:'Home'}} />
        <Stack.Screen name="contact" options={{ headerShown: true , title:'Contact', headerTitle:'Contact Us'}} />
        <Stack.Screen name="menu" options={{ headerShown: true , title:'Menu', headerTitle:'Coffee Shop Menu'}} />
        <Stack.Screen name="todos" options={{ headerShown: false , title:'Todos', headerTitle:'TO DO'}} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </SafeAreaProvider>
      </ThemeProvider>
     
  
  );
}
