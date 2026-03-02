import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSavedJobs } from "../context/SavedJobsContext";

const SavedJobsScreen = () => {
  const { savedJobs } = useSavedJobs();

  if (savedJobs.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No saved jobs yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={savedJobs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.company}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: { fontWeight: "bold", fontSize: 16 },
});

export default SavedJobsScreen;