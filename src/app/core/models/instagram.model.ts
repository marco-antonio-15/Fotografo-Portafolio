export interface BeholdSize {
  mediaUrl: string;
  height: number;
  width: number;
}

export interface BeholdPost {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  permalink: string;
  caption?: string;
  prunedCaption?: string;
  timestamp: string;
  sizes: {
    small: BeholdSize;
    medium: BeholdSize;
    large: BeholdSize;
    full: BeholdSize;
  };
}

export interface BeholdFeed {
  username: string;
  biography?: string;
  profilePictureUrl?: string;
  followersCount?: number;
  posts: BeholdPost[];
}
