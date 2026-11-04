export type CertificateType = 'distinction' | 'participation';

export interface PrizeWinner {
  id: string;
  regNo: string;
  rollNo: string;
  name: string;
  schoolName: string;
  className: string;
  categoryId: string;
  categoryName: string;
  rank: 1 | 2 | 3 | 4 | 'passed'; // 1: Gold, 2: Silver, 3: Bronze, 4: Consolation, 'passed': Appeared & Passed
  positionTitle: string; // e.g. "1st Position (Champion)" or "Certified Participant (Passed)"
  prizeAwarded: string; // e.g. "Trophy + Gold Medal" or "Official Certificate of Participation & Passing"
  score?: number;
  maxScore?: number;
  photoUrl?: string;
  certificateType: CertificateType;
  status?: 'Ranker' | 'Passed';
}

export interface Category {
  id: string;
  code: string;
  classGroup: string;
  name: string;
  activityType: string;
  description?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'stage' | 'awards' | 'science' | 'candid';
  imageUrl: string;
  caption: string;
}
