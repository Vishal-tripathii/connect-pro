import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from '../../../services/feed.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent implements OnInit {

  @Input() post!: any;
  currentUser!: any;

  constructor(private _feedService: FeedService, private _userService: UserService) {
    this.currentUser = this._userService.getCurrentUser();
  }
  ngOnInit(): void {
  }

  likeAction(postId: string) {
    this._feedService.likeAction(postId, this.currentUser?._id).subscribe({
      next: (like) => {
        console.log(like, "liked post sucessfully");
      },
      error: (err) => {
        console.log(err, "err in liking post");
      }
    })
  }

}
