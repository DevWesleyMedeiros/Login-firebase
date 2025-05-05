// consumir api
import axios from "axios";
import { db } from "@services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const inputSearchBooks: HTMLInputElement = document.getElementById(
  "search"
) as HTMLInputElement;
const btnSearchBooks: HTMLButtonElement = document.getElementById(
  "btn_search"
) as HTMLButtonElement;

const inputSearchBooksValue: string = inputSearchBooks.value;

const getBooks = async (inputSearchBooksValue: string) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${inputSearchBooksValue}&key=AIzaSyA2rQGEOybXiHvq5BP3M_wC8XjHTQ7Xl7Y`;
  const response = await axios.get(url);
  return response.data;
};
