import { IComment } from "./commentInterface";

export interface IFeed {
    id: string;
    author: string;
    description: string;
    timestamp: string;
    likes: number;
    comments: IComment[]
}