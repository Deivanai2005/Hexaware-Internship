import React, { createContext, useContext, useState } from "react";

const SavedJobsContext = createContext();

export const SavedJobsProvider = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState([]);

  const saveJob = (job) => {
    if (!savedJobs.find((j) => j.id === job.id)) {
      setSavedJobs([...savedJobs, job]);
    }
  };

  return (
    <SavedJobsContext.Provider value={{ savedJobs, saveJob }}>
      {children}
    </SavedJobsContext.Provider>
  );
};

export const useSavedJobs = () => useContext(SavedJobsContext);