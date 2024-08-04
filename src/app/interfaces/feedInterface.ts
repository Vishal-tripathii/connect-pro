import { IComment } from "./commentInterface";

export interface IFeed {
    author: string;
    description: string;
    timestamp: string;
    likes: number;
    comments: IComment[]
}