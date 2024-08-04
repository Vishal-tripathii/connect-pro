import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  post =
    {
      id: '1',
      author: 'Jane Doe',
      authorProfilePicture: 'https://via.placeholder.com/40',
      content: 'Excited to share that I have started a new position at Company XYZ!',
      timestamp: new Date('2023-01-01T10:00:00Z'),
      likes: 25,
      comments: [
        {
          id: 'c1',
          author: 'John Smith',
          content: 'Congratulations, Jane!',
          timestamp: new Date('2023-01-01T11:00:00Z')
        },
      ]
    }
  

  constructor() {}

  ngOnInit(): void {
  }

}
