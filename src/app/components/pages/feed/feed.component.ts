import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../services/feed.service';
import { Observable } from 'rxjs';
import { IFeed } from '../../../interfaces/feedInterface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {

  feedTask!: IFeed[];
  currentUser!: any;

  constructor(private _feedService: FeedService, private _userService: UserService) {
    this.currentUser = this._userService.getCurrentUser()
    let taskObservable: Observable<any>
    taskObservable = this._feedService.getPost(this.currentUser?._id);
    taskObservable.subscribe((serverResponse: any) => {
      this.sortPostsByTime(serverResponse)
    })


  }

  ngOnInit(): void {
  }

  sortPostsByTime(posts: IFeed[]) {
    posts.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    });
    this.feedTask = posts;
  }

  handlePostDeletion(postId: any) {
    this._feedService.deletePost(postId).subscribe({
      next: (del) => {
        const index = this.feedTask.findIndex(item => item._id === postId)
        if (index !== -1) {
          this.feedTask.splice(index, 1);
        }
      },
      error: (err) => {
        console.log("Error deleting the post: ", err);
      }
    })
  }
}
