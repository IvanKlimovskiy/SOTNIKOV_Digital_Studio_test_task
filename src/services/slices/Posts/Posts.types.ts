export type User = {
  address: {
    city: string;
    geo: { lat: string; lng: string };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
};
export type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export type PostsState = {
  fetchRequest: boolean;
  fetchSuccess: boolean;
  fetchFailed: boolean;
  loading: boolean;
  posts: Post[];
  users: User[];
  currentPostIds: number[];
};
