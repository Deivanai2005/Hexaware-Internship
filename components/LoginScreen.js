import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HireXpert</Text>

      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />

      <TouchableOpacity style={styles.btn} onPress={() => login(email, password)}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>New user? Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:"center",padding:20},
  title:{fontSize:28,fontWeight:"bold",textAlign:"center",marginBottom:30},
  input:{borderWidth:1,borderColor:"#ccc",padding:12,borderRadius:8,marginBottom:15},
  btn:{backgroundColor:"#4a90e2",padding:15,borderRadius:8},
  btnText:{color:"#fff",textAlign:"center",fontWeight:"bold"},
  link:{textAlign:"center",marginTop:15,color:"#4a90e2"}
});

export default LoginScreen;