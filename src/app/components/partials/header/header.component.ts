import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { FeedService } from '../../../services/feed.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  user: any;
  searchResults!: any;

  constructor(private _userService: UserService,
    public dialogRef: MatDialog,
    private _feedService: FeedService,
    private _router: Router
  ) {
    _userService.userObservable.subscribe((resp: any) => {
      if (resp) {
        this.user = resp;
      }
    })
  }

  ngOnInit(): void {
  }

  createPost() {
    let dialog = this.dialogRef.open(CreatePostComponent);
    dialog.afterClosed().subscribe((resp: any) => {
      if (resp) {
        this._feedService.createNewPost(resp).subscribe({
          next: (feed) => {
            console.log("feed has been updated", feed);
          },
          error: (error) => {
            console.log("error creating new Post!", error);
          }
        })
      }
    })
  }

  logout() {
    this._userService.logout();
    this._router.navigate([''])
  }

  handleSearch(term: any) {
    if (term) {
      this._userService.searchExisitingUser(term).subscribe((Resp: any) => {
        this.searchResults = Resp;
      });
    }
    else {
      this.searchResults = []
    }
  }

}
