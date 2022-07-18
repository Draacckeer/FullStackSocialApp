import {UserLikes} from "./interfaces/userLikes";
import {Roles} from "./interfaces/roles";
import {UserRequestFriends} from "./interfaces/userRequestFriends";
import {UserRequestOfFriends} from "./interfaces/userRequestOfFriends";
import {UserFriends} from "./interfaces/userFriends";
import {UserOfFriends} from "./interfaces/userOfFriends";

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  avatar: string;
  likes: number;
  userLikes: UserLikes[];
  userRequestFriends: UserRequestFriends[];
  userRequestOfFriends: UserRequestOfFriends[];
  userFriends: UserFriends[];
  userOfFriends: UserOfFriends[];
  roles: Roles[];
}
