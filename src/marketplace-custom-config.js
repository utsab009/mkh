/*
 * Marketplace specific configuration.
 */

export const yogaStyles = [
  { key: 'ashtanga', label: 'Ashtanga' },
  { key: 'hatha', label: 'Hatha' },
  { key: 'kundalini', label: 'Kundalini' },
  { key: 'restorative', label: 'Restorative' },
  { key: 'vinyasa', label: 'Vinyasa' },
  { key: 'yin', label: 'Yin' },
];

export const certificate = [
  { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
  { key: '200h', label: 'Registered yoga teacher 200h' },
  { key: '500h', label: 'Registered yoga teacher 500h' },
];

export const sectors = [
  { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
  { key: 'Accountancy and financial management', label: 'Accountancy and financial management' },
  { key: 'Civil and structural engineering', label: 'Civil and structural engineering' },
  // { key: 'Construction and building services', label: 'Construction and building services' },
  // { key: 'Consumer goods and FMCG', label: 'Consumer goods and FMCG' },
  // { key: 'Engineering', label: 'Engineering' },
  // { key: 'Financial services and insurance', label: 'Financial services and insurance' },
  // { key: 'Healthcare', label: 'Healthcare' },
  // { key: 'Hospitality, leisure and travel', label: 'Hospitality, leisure and travel' },
  // { key: 'HR and recruitment', label: 'HR and recruitment' },
  // { key: 'Investment banking and investment', label: 'Investment banking and investment' },
  // { key: 'IT and technology', label: 'IT and technology' },
  // { key: 'Law barristers', label: 'Law barristers' },
  // { key: 'Law solicitors', label: 'Law solicitors' },
  // { key: 'Logistics, transport and supply chain', label: 'Logistics, transport and supply chain' },
  // { key: 'Management and business', label: 'Management and business' },
  // { key: 'Management consulting', label: 'Management consulting' },
  // { key: 'Marketing, advertising and PR', label: 'Marketing, advertising and PR' },
  // { key: 'Media, journalism and publishing', label: 'Media, journalism and publishing' },
  // { key: 'Property', label: 'Property' },
  // { key: 'Public service, charity and social work', label: 'Public service, charity and social work' },
  // { key: 'Quantity surveying and building surveying', label: 'Quantity surveying and building surveying' },
  // { key: 'Retail, buying and merchandising', label: 'Retail, buying and merchandising' },
  // { key: 'Sales', label: 'Sales' },
  // { key: 'Science and research', label: 'Science and research' },
  // { key: 'Teaching and education', label: 'Teaching and education' },
];

export const Accountancyandfinancialmanagement = [
  { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
  { key: 'Accountant', label: 'Accountant' },
  { key: 'Accounting technician', label: 'Accounting technician' },
  { key: 'Auditor', label: 'Auditor' },
  { key: 'Corporate treasurer', label: 'Corporate treasurer' },
  { key: 'Financial manager', label: 'Financial manager' },
  { key: 'Management accountant', label: 'Management accountant' },
  { key: 'Tax inspector', label: 'Tax inspector' },
];


export const Civilandstructuralengineering = [
  { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
  { key: 'Civil engineer', label: 'Civil engineer' },
  { key: 'Engineering geologist', label: 'Engineering geologist' },
  { key: 'Geomatics/land surveyor', label: 'Geomatics/land surveyor' },
  { key: 'Site engineer', label: 'Site engineer' },
  { key: 'Structural engineer', label: 'Structural engineer' },
  { key: 'Transportation planner', label: 'Transportation planner' },
];


export const mentorLanguages = [
  { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
  { key: 'english', label: 'English' },
  { key: 'portuguese', label: 'Portuguese' },
  { key: 'japanese', label: 'Japanese' },
  { key: 'chinese', label: 'Chinese' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
export const keywordFilterConfig = {
  active: true,
};
