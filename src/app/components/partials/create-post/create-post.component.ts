import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;

  constructor(private _fb: FormBuilder,
    public dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService) { }

  ngOnInit(): void {
    let currentUser = this._userService.getCurrentUser();
    this.createPostForm = this._fb.group({
      author: [currentUser.name],
      description: ['', [Validators.required]],
      timestamp: [new Date()],
      comments: [[]],
      likes: [0]
    })
  }

  get fc() {
    return this.createPostForm.controls
  }

  submit() {
    if (this.createPostForm.dirty && this.createPostForm.valid)
      this.dialogRef.close(this.createPostForm.value)
  }

  cancel() {
    this.dialogRef.close()
  }

}
