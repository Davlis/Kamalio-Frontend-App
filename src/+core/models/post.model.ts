export class Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  photoUrl?: string;
  thumbPhotoUrl?: string;
  rating: number;
  commentCount: number;
  createdAt: string;
  updatedAt?: string;
  myVote: number;

  PostLocation?: {
    id: string,
    longitude: number,
    latitude: number,
    postId: string,
    createdAt: string,
    updatedAt: string,
    distance: 'HERE' | 'VERY_CLOSE' | 'CLOSE' | 'FAR' | 'VERY_FAR'
  }
}
