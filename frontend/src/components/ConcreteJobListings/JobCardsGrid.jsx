import React, { useState, useEffect } from 'react';
import JobCardTemplate from './JobCardTemplate.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchSavedJobs, saveJob, unsaveJob, deleteJob } from '../../utils/api.js';

const fallbackImageUrl =
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80';

const mapDbJobToCard = (job) => ({
    id: job._id,
    title: job.title,
    company: job.institution,
    type: job.employmentType || job.category || 'Role',
    location: job.location,
    imageUrl: job.imageUrl || fallbackImageUrl,
    imageAlt: `${job.title} role image`,
    description: job.description,
    buttonText: 'view role',
});

const JobCardsGrid = ({ jobs = null, currentPage = 1, pageSize = 8, onJobDeleted }) => {
    const { user, token } = useAuth();
    const [savedJobIds, setSavedJobIds] = useState([]);

    useEffect(() => {
        if (user?.role === "seeker" && token) {
            fetchSavedJobs(token)
                .then(saved => setSavedJobIds(saved.map(j => j._id)))
                .catch(() => {});
        }
    }, [user, token]);

    const handleBookmark = async (jobId) => {
        if (!token) return;
        try {
            if (savedJobIds.includes(jobId)) {
                await unsaveJob(jobId, token);
                setSavedJobIds(prev => prev.filter(id => id !== jobId));
            } else {
                await saveJob(jobId, token);
                setSavedJobIds(prev => [...prev, jobId]);
            }
        } catch (err) {
            console.error("Bookmark error:", err);
        }
    };

    const handleDelete = async (jobId) => {
        if (!token) return;
        try {
            await deleteJob(jobId, token);
            if (onJobDeleted) onJobDeleted(jobId);
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const jobCards = jobs.slice(startIndex, endIndex).map(mapDbJobToCard);

    return (
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 xl:grid-cols-4">
            {jobCards.map((card) => (
                <JobCardTemplate
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    company={card.company}
                    type={card.type}
                    location={card.location}
                    imageUrl={card.imageUrl}
                    imageAlt={card.imageAlt}
                    description={card.description}
                    buttonText={card.buttonText}
                    userRole={user?.role}
                    isBookmarked={savedJobIds.includes(card.id)}
                    onBookmark={handleBookmark}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default JobCardsGrid;