export interface PrizeWinner {
  id: string;
  regNo: string;
  rollNo: string;
  name: string;
  schoolName: string;
  className: string;
  categoryId: string;
  categoryName: string;
  rank: 1 | 2 | 3 | 4; // 1: Gold, 2: Silver, 3: Bronze, 4: Consolation
  positionTitle: string; // e.g. "1st Position (Champion)"
  prizeAwarded: string; // e.g. "Trophy + Gold Medal + Certificate"
  score: number;
  maxScore: number;
  photoUrl?: string;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  gradeGroup: string;
  prizeCount: number; // e.g. 3 or 4 winners
  description?: string;
  iconName?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'stage' | 'awards' | 'science' | 'candid';
  imageUrl: string;
  caption: string;
}
