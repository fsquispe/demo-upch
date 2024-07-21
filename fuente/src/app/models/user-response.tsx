import { IUser, } from "./user";
import { IInfo, } from "./info";

export interface IUserResponse {
  results: IUser[];
  info: IInfo;
}