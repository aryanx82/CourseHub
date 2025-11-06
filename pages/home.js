import React from "react";
import { View, Text, StyleSheet, TextInput} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.Heading}>
            <Text style={styles.Heading}>Course<Text style={styles.heading1}>Hub</Text></Text>
        </View>
        <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.main}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
        <Text style={styles.maintext}>Discover Your Next Learning Adventure</Text>
        <Text style={styles.maintext1}>Explore thousands of courses from world-class instructors. Build skills that matter and advance your career with confidence.</Text>
        <TextInput placeholder="What do you want to learn today?" style={styles.input}></TextInput>
        <Text style={styles.maintext}>50K+  1,200+  5,000+</Text>
        <Text style={styles.maintext1}>Students        Instructors       Online Courses</Text>
        </LinearGradient>
        <Text style={styles.bottomtext}>Featured Course</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    Heading: {
        fontSize: 48,
        fontWeight: 'bold',
        height: "60px",
        width: "100%",
        textAlign: 'center',
        marginBottom: 10,
    },
    heading1:{
        color: "#3498db",
        fontSize: 48,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: "100%",
        width: "100%",
    },
    main:{
        height: "65%",
        width: "100%",
    },
    maintext:{
        color: "#fff",
        fontSize: 32,
        fontWeight: 600,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 20,

    },
    maintext1:{
        color: "#fff",
        fontSize: 18,
        fontWeight: 400,
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 16,
    },
    input:{
        height: 50,
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingLeft: 16,
        marginTop: 30,
        alignSelf: 'center',
        fontSize: 16,
    },
    bottomtext:{
        fontSize: 30,
        fontWeight: 600,
        textAlign: 'center',
        marginTop: 20,
    },
});