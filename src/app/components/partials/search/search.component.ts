import { P } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  @Output() searchEmitter = new EventEmitter();
  @Input() searchResult!: any
  constructor() { }

  ngOnInit(): void {
  }

  search(term: string) {
    this.searchEmitter.emit(term)
  }
  onClick(currentUser: string) {
    console.log(currentUser, "IDDSs");
  }

}
