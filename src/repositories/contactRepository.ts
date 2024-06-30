import api from "../services/api";
import { Contact, ContactsResponse } from "../types";

const contactRepository = {
  async getContacts(
    limit: number,
    offset: number,
    searchTerm: string
  ): Promise<ContactsResponse> {
    const response = await api.get(
      `/contacts?limit=${limit}&offset=${offset}&searchTerm=${searchTerm}`
    );
    return response.data;
  },
  async getAllContacts(limit: number): Promise<ContactsResponse> {
    const response = await api.get(
      `/contacts?limit=${limit}&offset=0&searchTerm=`
    );
    return response.data;
  },

  async getContactById(contactId: string): Promise<Contact> {
    const response = await api.get(`/contacts/${contactId}`);
    return response.data.contact;
  },

  async addContact(
    contact: Partial<Contact>,
    profilePicture?: File
  ): Promise<Contact> {
    const formData = new FormData();
    Object.keys(contact).forEach((key) => {
      formData.append(key, contact[key as keyof Contact] as string | Blob);
    });

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    const response = await api.post("/contacts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async updateContact(
    id: number,
    contact: Partial<Contact>,
    profilePicture?: File
  ): Promise<Contact> {
    const formData = new FormData();
    Object.keys(contact).forEach((key) => {
      formData.append(key, contact[key as keyof Contact] as string | Blob);
    });

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    const response = await api.put(`/contacts/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.updatedContact;
  },

  async deleteContact(id: number): Promise<void> {
    await api.delete(`/contacts/${id}`);
  },
};

export default contactRepository;
