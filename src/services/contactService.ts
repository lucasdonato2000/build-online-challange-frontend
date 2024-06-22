import axios from "axios";
import api from "./api";

export const getContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
};
