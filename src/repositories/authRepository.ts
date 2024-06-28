import api from "../services/api";

const userRepository = {
  async login(email: string, password: string) {
    const response = await api.post("/login", { email, password });
    return response.data;
  },

  async getUserInfo() {
    const response = await api.get("/user");
    return response.data;
  },
};

export default userRepository;
