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
  isPostLiked!: boolean;
  likesCount!: any;

  constructor(private _feedService: FeedService, private _userService: UserService) {
    this.currentUser = this._userService.getCurrentUser();
  }
  ngOnInit(): void {
    const index = this.post.likes.findIndex((item: any) => item.userId === this.currentUser._id);
    if (index !== -1) {
      this.isPostLiked = true;
    }
    this.likesCount = this.post.likes.length;
  }

  likeAction(postId: string) {
    this._feedService.likeAction(postId, this.currentUser?._id).subscribe({
      next: (like) => {
        console.log(like, "liked post sucessfully");
        this.isPostLiked = true;
        this.likesCount++;
      },
      error: (err) => {
        console.log(err, "err in liking post");
      }
    })
  }

}
