import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: object[];

  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.getPetsFromService();
  }

  getPetsFromService() {
    const obs = this._httpService.getPets();
    obs.subscribe((data: object[]) => {
      console.log('Got our pets', data);
      this.pets = data;
    })
  }

}
