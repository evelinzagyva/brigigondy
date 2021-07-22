import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insta-feed',
  templateUrl: './insta-feed.component.html',
  styleUrls: ['./insta-feed.component.scss']
})
export class InstaFeedComponent implements OnInit {

  constructor(private http:HttpClient) {
    
   }

  ngOnInit(): void {
    
    //  var feed = new Instafeed({
    //     accessToken: 'IGQVJVUF8zeHhYMEllcDNSdl9NWTRqWDFoZAUFubUlmUDBrSHlQcmdjZAEVJOWlUS0VSSWFqVVFkM3ljRm9SQlNCalVySTVuaVNQeEFTODhiTkZAwX2lIUHFIeFlrOGVQUml1UFlrc1ZA3bVVCXzdkREFOVwZDZD'
    //  });

    //  feed.run();
  }

  

}



