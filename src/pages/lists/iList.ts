import { IUser } from "../user/iUser";
import { IWord } from "../add-word/iWord";

export class IList {
  id: number;
  name: string;
  language: string;
  created_at: string;
  updated_at: string;
  items: IWord[];
  user: IUser;
  url: string;
}