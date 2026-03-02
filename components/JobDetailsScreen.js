import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { useSavedJobs } from "../context/SavedJobsContext";

const JobDetailsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { saveJob, savedJobs } = useSavedJobs();

  useEffect(() => {
    fetch("https://remotive.com/api/remote-jobs")
      .then((response) => response.json())
      .then((json) => {
        const jobData = json.jobs.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          company: item.company_name,
          logo: item.company_logo_url,
          location: item.candidate_required_location,
          jobType: item.job_type,
          url: item.url,
        }));
        setJobs(jobData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Remotive API Error:", error);
        setLoading(false);
      });
  }, []);

  const handleApply = (jobTitle) => {
    Alert.alert("Success", `Applied successfully to ${jobTitle}`);
  };

  const handleSave = (job) => {
    const alreadySaved = savedJobs.find((j) => j.id === job.id);

    if (alreadySaved) {
      Alert.alert("Info", "Job already saved");
    } else {
      saveJob(job);
      Alert.alert("Saved", "Job saved successfully");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Remote Jobs</Text>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            {/* HEADER */}
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                {item.logo ? (
                  <Image source={{ uri: item.logo }} style={styles.logo} />
                ) : (
                  <View style={[styles.logo, styles.placeholderLogo]} />
                )}
                <View style={styles.titleContainer}>
                  <Text style={styles.jobTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.companyName}>{item.company}</Text>
                </View>
              </View>
            </View>

            {/* TAGS */}
            <View style={styles.detailsRow}>
              <Text style={styles.tag}>{item.jobType}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>

            {/* DESCRIPTION */}
            <Text style={styles.jobDesc} numberOfLines={3}>
              {item.description.replace(/<[^>]*>?/gm, "")}
            </Text>

            {/* BUTTON ROW */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => handleApply(item.title)}
              >
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSave(item)}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f4f4f4" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    marginLeft: 5,
  },

  jobCard: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  logo: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },

  placeholderLogo: { backgroundColor: "#ddd" },

  titleContainer: { flex: 1 },

  jobTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },

  companyName: {
    color: "#4a90e2",
    fontSize: 12,
    fontWeight: "600",
  },

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  tag: {
    backgroundColor: "#e3f2fd",
    color: "#1565c0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: "bold",
  },

  location: {
    color: "#757575",
    fontSize: 11,
    fontStyle: "italic",
  },

  jobDesc: {
    color: "#666",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  applyButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },

  saveButton: {
    backgroundColor: "#43a047",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default JobDetailsScreen;