const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3005";

const request = async (path, body) => {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
};

export const registerUser = async (userData) => {
  return request("/api/auth/register", userData);
};

export const loginUser = async (credentials) => {
  return request("/api/auth/login", credentials);
};