/*
 * Marketplace specific configuration.
 */

// export const integrationApiClientId = process.env.INTEGRATION_API_CLIENT_ID;
// export const integrationApiSecret = process.env.INTEGRATION_API_SECRET;
// export const integrationApiBaseUrl = process.env.INTEGRATION_API_BASE_URL;

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
  {
    key: 'Accountancy and financial management',
    label: 'Accountancy and financial management',
  },
  { key: 'Civil and structural engineering', label: 'Civil and structural engineering' },
  { key: 'Public Service', label: 'Public Service' },
  { key: 'Accounting', label: 'Accounting' },
  {
    key: 'Administration and Office Support',
    label: 'Administration and Office Support',
  },
  {
    key: 'Advertising, Arts, and Media',
    label: 'Advertising, Arts, and Media',
  },
  {
    key: 'Banking and Financial Services',
    label: 'Banking and Financial Services',
  },
  {
    key: 'Call Center and Customer Service',
    label: 'Call Center and Customer Service',
  },
  {
    key: 'Community Services and Development',
    label: 'Community Services and Development',
  },
  {
    key: 'Construction',
    label: 'Construction',
  },
  {
    key: 'Consulting and Strategy',
    label: 'Consulting and Strategy',
  },
  {
    key: 'Design and Architecture',
    label: 'Design and Architecture',
  },
  {
    key: 'Education and Training',
    label: 'Education and Training',
  },
  {
    key: 'Engineering',
    label: 'Engineering',
  },
  { key: 'Executive', label: 'Executive' },
  {
    key: 'Farming, Animals, and Conservation',
    label: 'Farming, Animals, and Conservation',
  },
  {
    key: 'Healthcare and Medical',
    label: 'Healthcare and Medical',
  },
  {
    key: 'Hospitality and Tourism',
    label: 'Hospitality and Tourism',
  },
  {
    key: 'Human Resources and Recruitment',
    label: 'Human Resources and Recruitment',
  },
  {
    key: 'Information Technology',
    label: 'Information Technology',
  },
  { key: 'Insurance', label: 'Insurance' },
  { key: 'Legal', label: 'Legal' },
  {
    key: 'Manufacturing, Transport, and Logistics',
    label: 'Manufacturing, Transport, and Logistics',
  },
  {
    key: 'Marketing and Communications',
    label: 'Marketing and Communications',
  },
  {
    key: 'Real Estate and Property',
    label: 'Real Estate and Property',
  },
  {
    key: 'Retail and Consumer Products',
    label: 'Retail and Consumer Products',
  },
  { key: 'Sales', label: 'Sales' },
  {
    key: 'Science and Technology',
    label: 'Science and Technology',
  },
  {
    key: 'Sports and Recreation',
    label: 'Sports and Recreation',
  },
  {
    key: 'Trades and Services',
    label: 'Trades and Services',
  },
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

export const Accounting = [
  { key: 'Account Officer', label: 'Account Officer' },
  { key: 'Accounting Clerk', label: 'Accounting Clerk' },
  { key: 'Accounting Manager', label: 'Accounting Manager' },
  { key: 'Accounting Supervisor', label: 'Accounting Supervisor' },
  { key: 'Accounts Payable Manager', label: 'Accounts Payable Manager' },
  { key: 'Assistant Controller', label: 'Assistant Controller' },
  { key: 'Auditor', label: 'Auditor' },
  { key: 'Billing Coordinator', label: 'Billing Coordinator' },
  { key: 'Budget Analyst', label: 'Budget Analyst' },
  { key: 'Controller', label: 'Controller' },
  { key: 'Credit Controller', label: 'Credit Controller' },
  { key: 'Finance Director', label: 'Finance Director' },
  { key: 'Financial Coordinator', label: 'Financial Coordinator' },
  { key: 'Junior Accountant', label: 'Junior Accountant' },
  { key: 'Payroll Coordinator', label: 'Payroll Coordinator' },
  { key: 'Payroll Specialist', label: 'Payroll Specialist' },
  { key: 'Staff Accountant', label: 'Staff Accountant' },
  { key: 'Tax Manager', label: 'Tax Manager' },
  { key: 'Treasury Assistant', label: 'Treasury Assistant' },
  { key: 'Accountant', label: 'Accountant' },
  { key: 'Accounting Coordinator', label: 'Accounting Coordinator' },
  { key: 'Accounting Officer', label: 'Accounting Officer' },
  { key: 'Accounts Assistant', label: 'Accounts Assistant' },
  { key: 'Accounts Receivable', label: 'Accounts Receivable' },
  { key: 'Audit Associate', label: 'Audit Associate' },
  { key: 'Billing Analyst', label: 'Billing Analyst' },
  { key: 'Billing Specialist', label: 'Billing Specialist' },
  { key: 'Chartered Accountant', label: 'Chartered Accountant' },
  { key: 'Cost Accountant', label: 'Cost Accountant' },
  { key: 'Entry Level Accountant', label: 'Entry Level Accountant' },
  { key: 'Financial Accountant', label: 'Financial Accountant' },
  { key: 'Full Charge Bookkeeper', label: 'Full Charge Bookkeeper' },
  { key: 'Payroll Administrator', label: 'Payroll Administrator' },
  { key: 'Payroll Manager', label: 'Payroll Manager' },
  { key: 'Project Accountant', label: 'Project Accountant' },
  { key: 'Tax Accountant', label: 'Tax Accountant' },
  { key: 'Tax Preparer', label: 'Tax Preparer' },
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

export const PublicServices = [
  { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
  { key: 'Academic librarian', label: 'Academic librarian' },
  { key: 'Advice worker', label: 'Advice worker' },
  { key: 'Aid worker/humanitarian worker', label: 'Aid worker/humanitarian worker' },
  { key: 'Amenity horticulturist', label: 'Amenity horticulturist' },
  { key: 'Archivist', label: 'Archivist' },
  { key: 'Armed forces officer', label: 'Armed forces officer' },
  { key: 'Arts administrator', label: 'Arts administrator' },
];

export const nonPublicRoles = [
  { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
  { key: 'Operational Level', label: 'Operational Level' },
  { key: 'Front Line Management', label: 'Front Line Management' },
  { key: 'Middle Management', label: 'Middle Management' },
  { key: 'Senior Management', label: 'Senior Management' },
  { key: 'C Suite Role', label: 'C Suite Role' },
];

export const publicRoles = [
  { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
  {
    key: 'AA/Adminstrative Assistant/Clerical Officer',
    label: 'AA/Adminstrative Assistant/Clerical Officer',
  },
  {
    key: 'AO/Adminstrative Officer/Staff Officer',
    label: 'AO/Adminstrative Officer/Staff Officer',
  },
  { key: 'EO/Executive Officer', label: 'EO/Executive Officer' },
  { key: 'HEO/Higher Executive Officer', label: 'HEO/Higher Executive Officer' },
  {
    key: 'FS/Fast Stream Higher Executive Officer',
    label: 'FS/Fast Stream Higher Executive Officer',
  },
  { key: 'SEO/Senior Executive Officer', label: 'SEO/Senior Executive Officer' },
  {
    key: 'SEO/Vets Senior Executive Officer Veterinary Band C',
    label: 'SEO/Vets Senior Executive Officer Veterinary Band C',
  },
  { key: 'VO/Veterinary Officer', label: 'VO/Veterinary Officer' },
  {
    key: 'Grade 6 & 7/Assistance Principle Officer',
    label: 'Grade 6 & 7/Assistance Principle Officer',
  },
  { key: 'Grade 5/ Principle Office', label: 'Grade 5/ Principle Office' },
  {
    key: 'SEO/Vets Senior Executive Officer Veterinary Band C',
    label: 'SEO/Vets Senior Executive Officer Veterinary Band C',
  },
  { key: 'Grade 2/ Assistant Secretary', label: 'Grade 2/ Assistant Secretary' },
  { key: 'Permanent Secretary/ Secretary', label: 'Permanent Secretary/ Secretary' },
  { key: 'General', label: 'General' },
];

export const mentorLanguages = [
  // { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
  { key: 'english', label: 'English' },
  { key: 'portuguese', label: 'Portuguese' },
  { key: 'japanese', label: 'Japanese' },
  { key: 'chinese', label: 'Chinese' },
  { key: 'hindi', label: 'Hindi' },
  { key: 'spanish', label: 'Spanish' },
  { key: 'arabic', label: 'Arabic' },
  { key: 'malay', label: 'Malay' },
  { key: 'russian', label: 'Russian' },
  { key: 'bengali', label: 'Bengali' },
  { key: 'french', label: 'French' },
  { key: 'German', label: 'German' },
];

export const profileTypes = [
  { key: 'interview', label: 'Interview' },
  { key: 'jobrole', label: 'JobRole' },
];

export const mentorShifts = [
  { key: 'none', listingLabel: 'None', hideFromFilters: true, hideFromListingInfo: true },
  {
    key: 'anytime',
    listingLabel: 'I am available to mentor at any point of time',
    label: 'I wish to have a mentor who is available at any point of time',
  },
  {
    key: 'workingHours',
    listingLabel: 'I am available to mentor during working hours (9am to 6pm)',
    label: 'I wish to have a mentor who is available during working hours (9am to 6pm)',
  },
  {
    key: 'outsideWorkingHours',
    listingLabel: 'I am available to mentor outside of working hours (6pm to 10pm)',
    label: 'I wish to have a mentor who is available outside of working hours (6pm to 10pm)',
  },
  {
    key: 'weekends',
    listingLabel: 'I am available to mentor over the weekend (friday evening, saturday or sunday)',
    label:
      'I wish to have a mentor who is available over the weekend (friday evening, saturday or sunday)',
  },
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
