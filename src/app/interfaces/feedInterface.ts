import { IComment } from "./commentInterface";

export interface IFeed {
    _id: string;
    id: string;
    author: string;
    description: string;
    timestamp: string;
    likes: number;
    comments: IComment[]
}