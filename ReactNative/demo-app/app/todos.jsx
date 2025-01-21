import { View, Text,TextInput , Pressable, StyleSheet, FlatList, } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useState} from 'react';
import {data} from '@/data/todos';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Inter_500Medium, useFonts} from '@expo-google-fonts/inter'
const todoPage = () => {
    const [todo,setTodo] = useState(data.sort((a,b)=>b.id-a.id));
    const [text, setText] = useState('')

    const [loaded,error] = useFonts({
      Inter_500Medium
    });

    if (!loaded && !error) {
      return null
    }
  
    // const styles = createStyles(theme, colorScheme)

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

    const renderItem = ({item}) => (
        <View style={styles.todoItem}>

            <Text  style={[styles.todoText, item.completed && styles.completedText]}
            onPress={()=> toggleTodo(item.id)}
            >{item.title}</Text>
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
  </View>
  <FlatList
    data={todo}
    renderItem={renderItem}
    keyExtractor={todo => todo.id}
    contentContainerStyle={{ flexGrow: 1 }}
  />

</SafeAreaView>
  )
}

export default todoPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
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
      color: 'white',
    },
    addButton: {
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      color: 'black',
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
      color: 'white',
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: 'gray',
    }
  })