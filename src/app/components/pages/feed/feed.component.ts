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
  post =
    {
      id: '1',
      author: 'Jane Doe',
      authorProfilePicture: 'https://via.placeholder.com/40',
      content: 'Excited to share that I have started a new position at Company XYZ!',
      timestamp: new Date('2023-01-01T10:00:00Z'),
      likes: 25,
      comments: [
        {
          id: 'c1',
          author: 'John Smith',
          content: 'Congratulations, Jane!',
          timestamp: new Date('2023-01-01T11:00:00Z')
        },
      ]
    }

  feedTask!: IFeed[]

  constructor(private _feedService: FeedService, private _userService: UserService) {
    let currentUser = this._userService.getCurrentUser()
    let taskObservable: Observable<any>
    taskObservable = this._feedService.getPost(currentUser._id);
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
}
