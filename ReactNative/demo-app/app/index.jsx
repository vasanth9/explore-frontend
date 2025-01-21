import { View, Text, StyleSheet, Pressable, ImageBackground } from "react-native";
import icedCoffeeImg from "@/assets/images/iced-coffee.png"
import { Link } from "expo-router";
const app = () => {
    return (<View style={styles.container}>

        <ImageBackground
            source={icedCoffeeImg}
            resizeMode="cover"
        >
            <Text style={styles.text}>Coffee</Text>
            <Link href="/contact">
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Contact Us</Text>
                </Pressable>
            </Link>
            <Link href="/menu">
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Coffee Menu</Text>
                </Pressable>
            </Link>
            <Link href="/todos">
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Todo List</Text>
                </Pressable>
            </Link>
        </ImageBackground>

    </View>)
}

export default app;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        marginBottom: "24px",
        width: "100%"
    },
    button: {
        backgroundColor: "rgba(0,0,0,0.75)",
        borderRadius: "6px",
        padding: "16px",
    },
    buttonText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    }, 
    image:{
        width:"100%",
        height:"100%",
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    }
})