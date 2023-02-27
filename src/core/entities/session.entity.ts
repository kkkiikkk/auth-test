import { User } from "./user.entity";
export class Session {
  _id?: string;
  user?: User | string;
}
