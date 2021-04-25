import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insta-feed',
  templateUrl: './insta-feed.component.html',
  styleUrls: ['./insta-feed.component.scss']
})
export class InstaFeedComponent implements OnInit {

  accessToken:string;
  

  constructor(private http:HttpClient) {
    
   }

  ngOnInit(): void {
  }

  

}



