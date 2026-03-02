import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Dev");
  const [dob, setDob] = useState("2008-05-20");
  const [email, setEmail] = useState("dev@example.com");
  const [phone, setPhone] = useState("9876543210");
  const [skills, setSkills] = useState("React Native, JavaScript");

  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);

  const pickImage = async () => {
    if (!isEditing) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const pickResume = async () => {
    if (!isEditing) return;

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      if (!result.canceled) {
        setResume(result.assets[0].name);
        Alert.alert("Resume Uploaded", result.assets[0].name);
      }
    } catch (err) {
      Alert.alert("Error", "Unable to upload resume");
    }
  };

  const handleSave = () => {
    if (!name || !dob || !phone || !email) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Photo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarPlaceholderText}>Upload Photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={isEditing}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDob}
          editable={isEditing}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          editable={isEditing}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Skills</Text>
        <TextInput
          style={styles.input}
          value={skills}
          onChangeText={setSkills}
          editable={isEditing}
        />

        {/* Resume Upload */}
        <TouchableOpacity
          style={[styles.resumeBtn, !isEditing && styles.disabledBtn]}
          onPress={pickResume}
        >
          <Text style={styles.resumeBtnText}>
            {resume ? "Change Resume" : "Upload Resume"}
          </Text>
        </TouchableOpacity>

        {resume && <Text style={styles.resumeFile}>Selected: {resume}</Text>}

        {/* Edit / Save */}
        {isEditing ? (
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },

  header: {
    alignItems: "center",
    padding: 25,
    backgroundColor: "#fff",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  avatarPlaceholder: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  avatarPlaceholderText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },

  formContainer: { padding: 20 },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },

  resumeBtn: {
    borderWidth: 1,
    borderColor: "#4a90e2",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#fff",
  },

  resumeBtnText: {
    color: "#4a90e2",
    fontWeight: "500",
  },

  resumeFile: {
    color: "green",
    marginBottom: 15,
    fontWeight: "500",
  },

  editBtn: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
  },

  editBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  saveBtn: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
  },

  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  disabledBtn: {
    opacity: 0.5,
  },
});

export default ProfileScreen;