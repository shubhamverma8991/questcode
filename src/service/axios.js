import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust the base URL to match your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to handle GET requests
const getRequest = (url) => {
  console.log(url);

  return api
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error in GET request:", error);
      throw error;
    });
};

// Helper function to handle POST requests
const postRequest = (url, data) => {
  return api
    .post(url, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error in POST request:", error);
      throw error;
    });
};

// Helper function to handle PUT requests
const putRequest = (url, data) => {
  return api
    .put(url, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error in PUT request:", error);
      throw error;
    });
};

// Helper function to handle DELETE requests
const deleteRequest = (url) => {
  return api
    .delete(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error in DELETE request:", error);
      throw error;
    });
};

// Exporting API functions to use dynamically across the project
// Language API functions
export const getAllLanguages = () => getRequest("/language/all");

export const createLanguage = (data) => postRequest("/languages", data);

// Question API functions based on Language
export const getQuestionsByLanguage = (languageName, page, size) => getRequest(`/questions/${languageName}?page=${page}&size=${size}`);

export const getQuestionById = (languageName, id) => getRequest(`/questions/${languageName}/${id}`);

export const createQuestion = (languageName, data) => postRequest(`/questions/${languageName}`, data);

export const updateQuestion = (languageName, id, data) => putRequest(`/questions/${languageName}/${id}`, data);

export const deleteQuestion = (languageName, id) => deleteRequest(`/questions/${languageName}/${id}`);
