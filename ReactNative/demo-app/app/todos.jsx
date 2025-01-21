import { View, Text,TextInput , Pressable, StyleSheet, FlatList, } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useContext,useEffect,useState} from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import {data} from '@/data/todos';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Inter_500Medium, useFonts} from '@expo-google-fonts/inter'
import Octicons from '@expo/vector-icons/Octicons'
import Animated, { LinearTransition } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useRouter } from 'expo-router';

const todoPage = () => {
    const [todo,setTodo] = useState([]);
    const [text, setText] = useState('');

    const  {colorScheme, setColorScheme, theme} = useContext(ThemeContext);
    const router = useRouter();

    const [loaded,error] = useFonts({
      Inter_500Medium
    });

    useEffect(()=>{
      const fetchData = async () => {
        try{
          const jsonValue = await AsyncStorage.getItem('TodoApp');
          const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null
          if(storageTodos && storageTodos.length){
            setTodo(storageTodos.sort((a,b)=>b.id-a.id));
          } else {
            setTodo(data.sort((a,b)=>b.id-a.id))
          }
    
        } catch(e){
          console.error(e)
        }

      }
      fetchData();
    },[data]);

    useEffect(()=>{
     
      const storeData = async () =>{
        try{
      const jsonValue = JSON.stringify(todo);
      await AsyncStorage.setItem('TodoApp',jsonValue);
      } 
      catch(e){
        console.error(e);
      }
    }
      storeData();
    },[todo])

    if (!loaded && !error) {
      return null
    }
  
    const styles = createStyles(theme, colorScheme);

    

    const addTodo = () => {
        if(text.trim()){
            const newId = todo.length>0 ? todo[0].id +1 :1;
            const newTodo = {
                id: newId,
                "title": text.trim(),
                "completed": false
            }
            setTodo([newTodo,...todo]);
            setText('')
        }
    }

    const toggleTodo = (id) => {
        const newTodos = todo.map((t)=>
          t.id === id ? {...t,
        completed : !t.completed}: t
        );
        setTodo(newTodos);
    }

    const removeTodo = (id) => {
        const newTodos = todo.filter((t)=> t.id !=id);
        setTodo(newTodos)
    }

    const handlePress = (id) => {
router.push(`/todo/${id}`)
    }

    const renderItem = ({item}) => (
        <View style={styles.todoItem}>
<Pressable
onPress={()=>handlePress(item.id)}
onLongPress={()=> toggleTodo(item.id)}
>
            <Text  style={[styles.todoText, item.completed && styles.completedText]}
            
            >{item.title}</Text></Pressable>
            <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined} />
      </Pressable>
        </View>
    )


  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Add a new todo"
      placeholderTextColor="gray"
      value={text}
      onChangeText={setText}
    />
    <Pressable onPress={addTodo} style={styles.addButton}>
      <Text style={styles.addButtonText}>Add</Text>
    </Pressable>
    <Pressable onPress={()=>setColorScheme(colorScheme === 'dark'?'light':'dark')}>
    <Octicons name={colorScheme === 'dark' ? "moon" : "sun"} size={36} color={theme.text} selectable={undefined} style={{ width: 36 }} />
    </Pressable>
     
  </View>
  <Animated.FlatList
    data={todo}
    renderItem={renderItem}
    keyExtractor={todo => todo.id}
    contentContainerStyle={{ flexGrow: 1 }}
    itemLayoutAnimation={LinearTransition}
    keyboardDismissMode="on-drag"
  />

</SafeAreaView>
  )
}

export default todoPage;

const createStyles = (theme,colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      padding: 10,
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
    addButton: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      color: colorScheme === 'dark' ? 'black' : 'white',
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 4,
      padding: 10,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: 'auto',
      pointerEvents: 'auto',
    },
    todoText: {
      flex: 1,
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      color: theme.text,
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: 'gray',
    }
  })
}