export type JobItem = {
  id: number;
  title: string;
  company: string;
  daysAgo: number;
  badgeLetters: string;
  relevanceScore: number;
};

export type JobItemExpanded = JobItem & {
  salary: string;
  duration: string;
  location: string;
  description: string;
  companyURL: string;
  coverImgURL: string;
  reviews: string[];
  qualifications: string[];
};
