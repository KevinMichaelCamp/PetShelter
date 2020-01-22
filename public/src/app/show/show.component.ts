import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  pet: any;
  params_id: string;
  messages: string[];
  liked_num: number;

  constructor(
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getParams();
    this.getPetFromService();
    this.messages = [];
    this.liked_num = 0;
  }

  getParams() {
    this.route.params.subscribe((params: Params) => {
      console.log('Pet ID:', params.id);
      this.params_id = params.id;
    });
  }

  getPetFromService() {
    const obs = this._httpService.getPet(this.params_id);
    obs.subscribe((data: object) => {
      console.log('Got pet by ID', data);
      this.pet = data;
    })
  }

  onAdopt() {
    const obs = this._httpService.deletePet(this.pet._id);
    obs.subscribe((data: any) => {
      if (data.errors) {
        for (let i in data.errors) {
          this.messages.push(data.errors[i].message);
        }
      } else {
        console.log('Removing pet', data);
        this.rootRoute();
      }
    })
  }

  onLike() {
    this.pet.likes ++;
    this.liked_num ++;
    const obs = this._httpService.likePet(this.pet._id, this.pet);
    obs.subscribe((data: any) => {
      if (data.errors) {
        for (let i in data.errors) {
          this.messages.push(data.errors[i].message);
        }
      } else {
        console.log('Liking pet', data);
      }
    })
  }

  rootRoute() {
    this.router.navigate(['/pets'], {
      queryParams: { refresh: new Date().getTime() }
    });
  }
}
