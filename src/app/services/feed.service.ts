import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IFeed } from '../interfaces/feedInterface';
import { HttpClient } from '@angular/common/http';
import { GET_POSTS, POST_URL } from '../constants/urls';

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
  getPost(): Observable<IFeed> {
    return this._http.get<IFeed>(GET_POSTS).pipe(
      tap({
        next: (posts) => {
          console.log("fetched posts", posts);
        },
        error:(err) => {
          console.log("error fetching posts", err);
          
        }
      })
    )
  }
}
