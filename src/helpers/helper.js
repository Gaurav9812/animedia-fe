export const days = Array(31).fill(" ");

export const months = {
  1: "January",
  2: "Febrary",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const startYear = 1950;

export const endYear = new Date().getFullYear() - 1;

export const years = Array(endYear - startYear).fill("");

export const tokenKey = "_identity";

export const SIDE_BAR_IMG = 'https://geektrust.sgp1.digitaloceanspaces.com/assets/svg/meditating_girl.svg';

export const addOnLocalStorage=(key,value)=>{
  localStorage.setItem(key,value);
}

export const deleteFromLocalStorage=(key)=>{
  localStorage.removeItem(key);
}

export const getFromLocalStorage=(key)=>{
  return localStorage.getItem(key);
}


export const removeFromLocalStorage=(key)=>{
  return localStorage.removeItem(key);
}


export const resolveFields = (field)=>{
    return allFields()[field];
}

export const CHAR_LIMT_IN_BIO = 100;

const allFields = ()=>{
  return {
    cover_photo:"Cover Photo",
    profile_photo:"Profile Photo"
  }
}

 export const skills = [
  'Algorithms',
  'Analytical Skills',
  'Big Data',
  'Calculating',
  'Compiling Statistics',
  'Data Analytics',
  'Data Mining',
  'Database Design',
  'Database Management',
  'Documentation',
  'Modeling',
  'Modification',
  'Needs Analysis',
  'Quantitative Research',
  'Quantitative Reports',
  'Statistical Analysis',
  'Applications',
  'Certifications',
  'Coding',
  'Computing',
  'Configuration',
  'Customer Support',
  'Debugging',
  'Design',
  'Development',
  'Hardware',
  'Implementation',
  'Information Technology',
  'Infrastructure',
  'Languages',
  'Maintenance',
  'Network Architecture',
  'Network Security',
  'Networking',
  'New Technologies',
  'Operating Systems',
  'Programming',
  'Restoration',
  'Security',
  'Servers',
  'Software',
  'Solution Delivery',
  'Storage',
  'Structures',
  'Systems Analysis',
  'Technical Support',
  'Technology',
  'Testing',
  'Tools',
  'Training',
  'Troubleshooting',
  'Usability',
  'Benchmarking',
  'Budget Planning',
  'Engineering',
  'Fabrication',
  'Following Specifications',
  'Operations',
  'Performance Review',
  'Project Planning',
  'Quality Assurance',
  'Quality Control',
  'Scheduling',
  'Task Delegation',
  'Task Management',
  'Blogging',
  'Digital Photography',
  'Digital Media',
  'Facebook',
  'Instagram',
  'Networking',
  'Pinterest',
  'SEO',
  'Social Media Platforms',
  'Twitter',
  'Web Analytics',
  'Client Relations',
  'Email',
  'Requirements Gathering',
  'Research',
  'Subject Matter Experts (SMEs)',
  'Technical Documentation'
];

