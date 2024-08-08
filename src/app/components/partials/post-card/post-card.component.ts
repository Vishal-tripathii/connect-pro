import { Component, Input, OnInit } from '@angular/core';
import { FeedService } from '../../../services/feed.service';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent implements OnInit {

  @Input() post!: any;
  currentUser!: any;
  isPostLiked: boolean = false;
  likesCount!: any;

  commentForm!: FormGroup
  isSubmitted: boolean = false;
  showComments: boolean = false;
  commentCounts!: number;

  constructor(private _feedService: FeedService,
    private _userService: UserService,
    private _fb: FormBuilder) {
    this.currentUser = this._userService.getCurrentUser();
  }
  ngOnInit(): void {
    // creating the form for comments //
    this.commentForm = this._fb.group({
      name: [this.currentUser?.name],
      userId: [this.currentUser?._id],
      content: ['', [Validators.required]],
      timestamp: [new Date()]
    });

    const index = this.post.likes.findIndex((item: any) => item.userId === this.currentUser._id);
    if (index !== -1) {
      this.isPostLiked = true;
    }
    this.likesCount = this.post.likes.length;
    this.commentCounts = this.post.comments.length;
  }

  submit(postId: string) {
    this.isSubmitted = true;
    if (this.commentForm.dirty && this.commentForm.invalid) return;
    console.log(postId, this.commentForm.value, "bhalues");

    this._feedService.postComment(postId, this.commentForm.value).subscribe({
      next: (postComm) => {
        console.log(postComm, "commented sucess");
      },
      error: (err) => {
        console.log("Error in commenting post", err);

      }
    })


  }

  toggleComments() {
    return this.showComments = !this.showComments;
  }

  likeAction(postId: string) {
    if (!this.isPostLiked) {
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
    else {
      this._feedService.unlikeAction(postId, this.currentUser?._id).subscribe({
        next: (unlike) => {
          console.log(unlike, "unliked post sucessfully");
          this.isPostLiked = false;
          this.likesCount--;
        },
        error: (err) => {
          console.log(err, "err in unliking post");
        }
      })
    }
  }

}
