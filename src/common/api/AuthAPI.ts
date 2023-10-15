import axios from "../../interceptors/AuthInterceptor";

export const signIn = async (
  email: string,
  password: string
): Promise<void> => {
  const response = await axios.post("/auth/login", {
    email,
    password,
  });
  const newToken = response.data.token;
  localStorage.setItem("token", newToken);
};

export const removeToken = (): void => localStorage.removeItem("token");
export const getToken = (): string | null => localStorage.getItem("token");

export const checkToken = async (): Promise<void> => {
  await axios.get("/auth/profile");
};
