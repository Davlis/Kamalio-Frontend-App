export class Post {
  title: string;
  date: string;
  thumbPhotoUrl: string;
  photoUrl?: string;
  description: string;
  upvotes: number;
  comments: number;
  active?: boolean;
}
