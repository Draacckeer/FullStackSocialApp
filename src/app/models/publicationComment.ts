export interface PublicationComment {
  id: number;
  comment: string;
  userid: number;
  username: string;
  userAvatar: string;
  publication: number;
  line: number;
  level: number;
  level1: number;
  level2: number;
  level3: number;
  createdAt: string;
  updatedAt: string;
}
