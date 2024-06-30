import contactRepository from "../repositories/contactRepository";
import { Contact, ContactsResponse } from "../types";
import { handleServiceError } from "../utils/errorHandler";

export const getContacts = async (
  limit: number,
  offset: number,
  searchTerm: string
): Promise<ContactsResponse | undefined> => {
  try {
    return await contactRepository.getContacts(limit, offset, searchTerm);
  } catch (error) {
    handleServiceError(error);
  }
};

export const getContactById = async (
  contactId: string
): Promise<Contact | undefined> => {
  try {
    return await contactRepository.getContactById(contactId);
  } catch (error) {
    handleServiceError(error);
  }
};

export const getAllContacts = async (): Promise<
  ContactsResponse | undefined
> => {
  try {
    const { total } = await contactRepository.getContacts(1, 0, "");
    return await contactRepository.getAllContacts(total);
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
