import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const api = axios.create({
  baseURL: `https://www.googleapis.com/books/v1/`,
  params: {
    key: apiKey,
  },
});