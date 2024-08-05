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


  constructor(private _activatedRoutes: ActivatedRoute,
    private _feedService: FeedService,
    private _userService: UserService) { }

  ngOnInit(): void {
    this._activatedRoutes.params.subscribe((resp: any) => { // This logic bcan be refactored later, // pls do it
      this.userId = resp.userId;
    });

    // first fetching the users of the userId;
    this._userService.getExistingUsers().subscribe((r: any) => {
      this.userProfile = r.find((item: any) => item._id === this.userId)
    });

    // fetching users data
    this._feedService.getPost(this.userId).subscribe((resp: any) => {
      this.userData = resp;
    })

  }

}
