import fourwindInternship from './fourwindInternship.js';
import cleanCafe from './cleanCafe.js';
import harborLaneStudio from './harborLaneStudio.js';
import greenLoopMarketing from './greenLoopMarketing.js';
import northsideWarehouse from './northsideWarehouse.js';
import cedarClinicFrontDesk from './cedarClinicFrontDesk.js';
import cedarClinicFrontDesk2 from './cedarClinicFrontDesk2.js';
import bloomBakeshop from './bloomBakeshop.js';
import trailheadDelivery from './trailheadDelivery.js';

const jobCardTemplates = [
  fourwindInternship,
  cleanCafe,
  harborLaneStudio,
  greenLoopMarketing,
  northsideWarehouse,
  cedarClinicFrontDesk,
  cedarClinicFrontDesk2,
  bloomBakeshop,
  trailheadDelivery,
];

// override card information with concrete cards
export const createJobCard = (overrides = {}) => ({
  title: 'Card Title',
  company: 'Company Name',
  type: 'Role Type',
  location: 'Location',
  imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
  imageAlt: 'Job card preview image',
  description: 'Job description',
  buttonText: 'read more',
  ...overrides,
});

export const getJobCardCount = () => jobCardTemplates.length;

export const createJobCardCollection = ({ page = 1, pageSize = jobCardTemplates.length } = {}) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return jobCardTemplates.slice(startIndex, endIndex).map((card) => createJobCard(card));
};
