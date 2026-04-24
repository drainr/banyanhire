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

export const fetchJobById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`);

  if (!response.ok) {
    let message = "Failed to fetch job";
    try {
      const errorBody = await response.json();
      if (errorBody?.message) message = errorBody.message;
    } catch {}
    throw new Error(message);
  }

  const data = await response.json();
  return data.job || data;
};

export const fetchMyJobs = async (token) => {
    const response = await fetch(`${API_BASE_URL}/jobs/my`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to fetch your jobs");
    const data = await response.json();
    return data.jobs || [];
};

export const fetchApplicants = async (jobId, token) => {
    const response = await fetch(`${API_BASE_URL}/applications/job/${jobId}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to fetch applicants");
    const data = await response.json();
    return data.applications || [];
};

export const fetchMyApplications = async (token) => {
    const res = await fetch(`${API_BASE_URL}/applications/my-applications`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch applications");
    }
    
    const data = await res.json();

    return data.applications || data.jobs || [];
};

const request = async (path, body) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
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
  return request("/auth/register", userData);
};

export const loginUser = async (credentials) => {
  return request("/auth/login", credentials);
};

export const createJob = async (jobData, token) => {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create job");
    }
    return response.json();
};

export const updateJob = async (jobId, jobData, token) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update job");
    }
    return response.json();
};

export const deleteJob = async (jobId, token) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete job");
    }
    return response.json();
};

export const fetchSavedJobs = async (token) => {
    const response = await fetch(`${API_BASE_URL}/bookmarks`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to fetch saved jobs");
    const data = await response.json();
    return data.savedJobs || [];
};

export const saveJob = async (jobId, token) => {
    const response = await fetch(`${API_BASE_URL}/bookmarks/${jobId}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to save job");
    return response.json();
};

export const unsaveJob = async (jobId, token) => {
    const response = await fetch(`${API_BASE_URL}/bookmarks/${jobId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to remove job");
    return response.json();
};

export const submitApplication = async (jobId, resumeURL, coverLetter, token) => {
    const response = await fetch(`${API_BASE_URL}/applications/apply`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            jobId,
            resumeURL,
            coverLetter: coverLetter || ""
        })
    });

    const data = await response.json();
    return data;
};

// ── Admin Functions ────────────────────────────────────────────────────────

export const fetchRecruiters = async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/admin/recruiters`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to fetch recruiters");
    const data = await response.json();
    return data.recruiters || [];
};

export const fetchSeekers = async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/admin/seekers`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to fetch seekers");
    const data = await response.json();
    return data.seekers || [];
};

export const disableUser = async (userId, reason, token) => {
    const response = await fetch(`${API_BASE_URL}/auth/admin/disable-user/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ reason })
    });
    if (!response.ok) throw new Error("Failed to disable user");
    return response.json();
};

export const fetchRecruiterJobs = async (recruiterId, token) => {
    const response = await fetch(`${API_BASE_URL}/jobs/recruiter/${recruiterId}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to fetch recruiter jobs");
    const data = await response.json();
    return data.jobs || [];
};