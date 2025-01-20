import {View,Text, StyleSheet, Pressable} from "react-native";
import {Link} from "expo-router";
const app = () => {
    return(<View style={styles.container}>
        <Text style={styles.text}>Coffee</Text>
        <Link href="/explore">
        <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Explore</Text>
        </Pressable>
        </Link>
    </View>)
}

export default app;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        color:"white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign:"center",
        backgroundColor:"rgba(0,0,0,0.5)",
        marginBottom:"24px",
        width:"100%"
    },
    button:{
 backgroundColor:"rgba(0,0,0,0.75)",
 borderRadius: "6px",
 padding:"16px",
    },
    buttonText:{
        color:"white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign:"center",
    }
})