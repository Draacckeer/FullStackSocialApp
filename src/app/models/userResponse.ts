import {UserLikes} from "./interfaces/userLikes";
import {Roles} from "./interfaces/roles";

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  avatar: string;
  likes: string;
  userLikes: UserLikes[];
  roles: Roles[];
}
