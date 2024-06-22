import api from "./api";

export const login = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const getUserInfo = async () => {
  const response = await api.get("/user");
  return response.data;
};
