import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

const SignupScreen = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />

      <TouchableOpacity style={styles.btn} onPress={() => signup(email, password)}>
        <Text style={styles.btnText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:"center",padding:20},
  title:{fontSize:24,fontWeight:"bold",textAlign:"center",marginBottom:30},
  input:{borderWidth:1,borderColor:"#ccc",padding:12,borderRadius:8,marginBottom:15},
  btn:{backgroundColor:"#27ae60",padding:15,borderRadius:8},
  btnText:{color:"#fff",textAlign:"center",fontWeight:"bold"},
});

export default SignupScreen;