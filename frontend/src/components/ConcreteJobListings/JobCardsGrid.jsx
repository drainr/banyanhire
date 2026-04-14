import React from 'react';
import JobCardTemplate from './JobCardTemplate.jsx';
import { createJobCardCollection } from './jobCardFactory.js';

const JobCardsGrid = ({ count = 8 }) => {
  const jobCards = createJobCardCollection(count);

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 xl:grid-cols-4">
      {jobCards.map((card) => (
        <JobCardTemplate
          key={card.id}
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
