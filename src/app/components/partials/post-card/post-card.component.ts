import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeedService } from '../../../services/feed.service';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Output() deletePostEvent = new EventEmitter();

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
        this.post.comments?.push(this.commentForm.value)
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

  deleteComment(postId: string, commentId: string) {
    console.log(commentId, "commentId");

    this._feedService.deleteComment(postId, commentId).subscribe(
      {
        next: (deleteComment) => {
          console.log("comment Deleted sucessfully", deleteComment);
          const index = this.post.comments?.findIndex((item: any) => item?._id === commentId);
          if (index !== -1) {
            this.post.comments?.splice(index, 1);
            this.commentCounts--;
          }
        },
        error: (err) => {
          console.log(err, "!!ERROR in deleting comment");

        }
      }
    );
  }

  deletePost(_postId: string) {// i am not able to Update the UI here so i need to handle the deletion at parent level
    if (_postId) {
      this.deletePostEvent.emit(_postId)
    }
  }

}
