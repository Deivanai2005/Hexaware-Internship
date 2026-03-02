import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const features = [
    { id: '1', title: 'Find Jobs', desc: 'Search thousands of jobs' },
    { id: '2', title: 'Apply Fast', desc: 'One click application' },
    { id: '3', title: 'Get Hired', desc: 'Top companies waiting' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to HireXpert</Text>
      </View>
      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  header: { padding: 20, backgroundColor: '#4a90e2', alignItems: 'center' },
  headerText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', margin: 10, padding: 15, borderRadius: 8, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardDesc: { color: '#666' }
});

export default HomeScreen;