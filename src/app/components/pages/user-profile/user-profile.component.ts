import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedService } from '../../../services/feed.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  userId!: any;
  userData!: any;
  userProfile!: any
  currentUser!: any;
  isFollowing!: boolean;


  constructor(private _activatedRoutes: ActivatedRoute,
    private _feedService: FeedService,
    private _userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this._userService.getCurrentUser();
    this._activatedRoutes.params.subscribe((resp: any) => { // This logic bcan be refactored later, // pls do it
      this.userId = resp.userId;
    });

    // first fetching the users of the userId;
    this._userService.getExistingUsers().subscribe((r: any) => {
      this.userProfile = r.find((item: any) => item._id === this.userId)
      // since getExistingUsers is async function, it neeeds to be here only
      this.isFollowing = this.currentUser?.following?.includes(this.userProfile?._id);

    });
    
    // fetching users data
    this._feedService.getPost(this.userId).subscribe((resp: any) => {
      this.userData = resp;
    })
    
  }

  follow() {
    this._userService.follow(this.userProfile._id, this.currentUser._id).subscribe({
      next: () => {
        this.isFollowing = true;
        this.currentUser.following.push(this.userProfile?._id);
      },
      error: (err) => {
        console.log("Already following");
      }
    })
  }

  unfollow() {
    console.log("unfollowed clickeds");
    
    this._userService.unfollow(this.userProfile._id, this.currentUser._id).subscribe({
      next: () => {
        this.isFollowing = false;
        const index = this.currentUser.following.findIndex((item: any) => item._id === this.userProfile._id);
        if (index !== -1) {
          this.currentUser.following.splice(index, 1);
        }
      }
    });
  }

}
