const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3005/api";

// Job-specific API layer used for dashboard listings.
export const fetchJobs = async () => {
	const response = await fetch(`${API_BASE_URL}/jobs`);

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
