import axios from "axios";

export const handleServiceError = (error: any): never => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
  throw new Error(error.message || "An unexpected error occurred");
};
