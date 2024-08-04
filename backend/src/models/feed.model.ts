import { Schema, model } from "mongoose";

interface Comment {
  author: string;
  content: string;
  timestamp: string;
}

export interface Feed {
  author: string;
  description: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

const commentSchema = new Schema<Comment>({
  author: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const feedSchema = new Schema<Feed>({
  author: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: [commentSchema], default: [] },
});

export const Feed = model<Feed>('Feed', feedSchema);