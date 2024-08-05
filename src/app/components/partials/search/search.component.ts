import { P } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  @Output() searchEmitter = new EventEmitter();
  @Input() searchResult!: any
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  search(term: string) {
    this.searchEmitter.emit(term)
  }
  onClick(_id: string) {
    this._router.navigate(['user-profile', _id])
  }

}
