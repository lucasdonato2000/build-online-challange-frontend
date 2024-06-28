import contactRepository from "../repositories/contactRepository";
import { Contact } from "../types";
import axios from "axios";

const handleServiceError = (error: any): never => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
  throw new Error(error.message || "An unexpected error occurred");
};

export const getContacts = async (
  limit: number,
  offset: number,
  searchTerm: string
): Promise<{ total: number; contacts: Contact[] } | undefined> => {
  try {
    return await contactRepository.getContacts(limit, offset, searchTerm);
  } catch (error) {
    handleServiceError(error);
  }
};

export const addContact = async (
  contact: Partial<Contact>,
  profilePicture?: File
): Promise<Contact | undefined> => {
  try {
    return await contactRepository.addContact(contact, profilePicture);
  } catch (error) {
    handleServiceError(error);
  }
};

export const updateContact = async (
  id: number,
  contact: Partial<Contact>,
  profilePicture?: File
): Promise<Contact | undefined> => {
  try {
    return await contactRepository.updateContact(id, contact, profilePicture);
  } catch (error) {
    handleServiceError(error);
  }
};

export const deleteContact = async (id: number): Promise<void> => {
  try {
    return await contactRepository.deleteContact(id);
  } catch (error) {
    handleServiceError(error);
  }
};
