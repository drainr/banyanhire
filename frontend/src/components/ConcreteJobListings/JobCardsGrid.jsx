import React from 'react';
import JobCardTemplate from './JobCardTemplate.jsx';

const fallbackImageUrl =
  'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80';

// Normalize backend job fields into the shape expected by JobCardTemplate.
const mapDbJobToCard = (job) => ({
  key: job._id,
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

const JobCardsGrid = ({ jobs = null, currentPage = 1, pageSize = 8 }) => {
  // Slice only the current page so page 2 renders items 9-16 for pageSize=8.
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
        />
      ))}
    </div>
  );
};

export default JobCardsGrid;
