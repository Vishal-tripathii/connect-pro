import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IFeed } from '../interfaces/feedInterface';
import { HttpClient } from '@angular/common/http';
import { DELETE_COMMENT_URL, DELETE_POST_URL, GET_POSTS, GET_PROFILE_POST, LIKE_POST_URL, POST_COMMENT_URL, POST_URL, UNLIKE_POST_URL } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private _http: HttpClient) { }

  createNewPost(newPost: IFeed): Observable<IFeed> {
    console.log("inside");

    return this._http.post<IFeed>(POST_URL, newPost).pipe(
      tap({
        next: (post) => {
          console.log("Post is created", post);
        },
        error: (error) => {
          console.log("Error occured in creatng new Post", error);
        }
      })
    );
  }
  getPost(userId: string): Observable<IFeed> {
    return this._http.get<IFeed>(`${GET_POSTS}?userId=${userId}`).pipe(
      tap({
        next: (posts) => {
          console.log("fetched posts", posts);
        },
        error: (err) => {
          console.log("error fetching posts", err);

        }
      })
    )
  }

  getProfilePosts(userId: string): Observable<IFeed> {
    return this._http.get<IFeed>(`${GET_PROFILE_POST}?userId=${userId}`);
  }

  likeAction(postId: string, userId: string): Observable<any> {
    return this._http.post<any>(LIKE_POST_URL, { postId: postId, userId: userId }).pipe(
      tap({
        next: (like) => {
          console.log("liked sucessfully", like);
        },
        error: (err) => {
          console.log(err, "error is liking");
        }
      })
    )
  }
  unlikeAction(postId: string, userId: string): Observable<any> {
    return this._http.post<any>(UNLIKE_POST_URL, { postId: postId, userId: userId }).pipe(
      tap({
        next: (unlike) => {
          console.log(unlike, "post unliked sucess");
        },
        error: (err) => {
          console.log(err, "error in unliking this post");
        }
      })
    )
  }

  postComment(postId: string, commentData: any): Observable<any> {
    return this._http.post<any>(POST_COMMENT_URL, { postId: postId, commentData: commentData }).pipe(
      tap({
        next: (postComment) => {
          console.log("posted comment sucessfully", postComment);
        },
        error: (err) => {
          console.log(err, "Error in posting comment!!!!!");

        }
      })
    )
  }
  deleteComment(postId: string, commentId: string): Observable<any> {
    return this._http.post(DELETE_COMMENT_URL, { postId: postId, commentId: commentId });
  }

  deletePost(_postId: string): Observable<any> {
    return this._http.post<any>(DELETE_POST_URL, { _postId: _postId });
  }

}
