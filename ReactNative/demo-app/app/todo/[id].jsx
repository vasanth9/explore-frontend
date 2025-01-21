import { View, Text,SafeAreaView, TextInput , Pressable, StyleSheet} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";


const todo = () => {
    const {id} = useLocalSearchParams();
    const [t,setT] = useState({});

    const {theme, colorScheme, setColorScheme} = useContext(ThemeContext);
    const router = useRouter();
    const [loaded, error] = useFonts({
        Inter_500Medium,
    })
   
    useEffect(()=>{
        const fetchTodo = async(id) => {
            try{
                const jsonValue = await AsyncStorage.getItem('TodoApp');
                const storedTodos = jsonValue !==null ? JSON.parse(jsonValue): null;
                if(storedTodos&&storedTodos.length){
                    const myTodo = storedTodos.find((todo)=>todo.id.toString()===id);
                    setT(myTodo)
                }
            }catch(e){
                console.error(e)
            }
        }
        fetchTodo(id);
    },[id]);

    
    if(!loaded&&!error){
        return null;
    }

    const styles = createStyles(theme, colorScheme);

    const handleSave = async() => {
        try{
            const jsonValue = await AsyncStorage.getItem('TodoApp');
            const storedTodos = jsonValue !==null ? JSON.parse(jsonValue): null;
            if(storedTodos&&storedTodos.length){
                const newTodos = storedTodos.map((todo)=>t.id===todo.id?{...t}:todo);
                await AsyncStorage.setItem('TodoApp',JSON.stringify(newTodos));
            }else {
                await AsyncStorage.setItem('TodoApp', JSON.stringify([t]))
            }
            router.push('/todos')
        }catch(e){
            console.error(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    maxLength={30}
                    placeholder="Edit todo"
                    placeholderTextColor="gray"
                    value={t?.title || ''}
                    onChangeText={(text) => setT(prev => ({ ...prev, title: text }))}
                />
                <Pressable
                    onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')} style={{ marginLeft: 10 }}>

                    <Octicons name={colorScheme === 'dark' ? "moon" : "sun"} size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} />

                </Pressable>
            </View>
            <View style={styles.inputContainer}>
                <Pressable
                    onPress={handleSave}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
                <Pressable
                    onPress={() => router.push('/todos')}
                    style={[styles.saveButton, { backgroundColor: 'red' }]}
                >
                    <Text style={[styles.saveButtonText, { color: 'white' }]}>Cancel</Text>
                </Pressable>
            </View>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </SafeAreaView>);
}

export default todo

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            backgroundColor: theme.background,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 6,
            width: '100%',
            maxWidth: 1024,
            marginHorizontal: 'auto',
            pointerEvents: 'auto',
        },
        input: {
            flex: 1,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            fontSize: 18,
            fontFamily: 'Inter_500Medium',
            minWidth: 0,
            color: theme.text,
        },
        saveButton: {
            backgroundColor: theme.button,
            borderRadius: 5,
            padding: 10,
        },
        saveButtonText: {
            fontSize: 18,
            color: colorScheme === 'dark' ? 'black' : 'white',
        }
    })
}