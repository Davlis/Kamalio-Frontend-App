export class Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  photoUrl?: string;
  rating: number;
  commentCount: number;
  createdAt: string;
  updatedAt?: string;

  thumbPhotoUrl?: string;

  active?: boolean;
}
