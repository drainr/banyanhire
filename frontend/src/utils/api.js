const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3005";

// Job-specific API layer used for dashboard listings.
export const fetchJobs = async () => {
	const response = await fetch(`${API_BASE}/jobs`);

	if (!response.ok) {
		let message = "Failed to fetch jobs";

		try {
			const errorBody = await response.json();
			if (errorBody?.message) {
				message = errorBody.message;
			}
		} catch {
			// Ignore JSON parsing errors and keep fallback message.
		}

		throw new Error(message);
	}

	const data = await response.json();
	return data.jobs || [];
};

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