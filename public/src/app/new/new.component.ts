import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  pet: object;
  messages: string[];

  constructor(
    private _httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.messages = [];
    this.pet = {
      name: '',
      type: '',
      description: '',
      skill_1: '',
      skill_2: '',
      skill_3: '',
      likes: 0
    }
  }

  onSubmit() {
    this.messages = [];
    const obs = this._httpService.createPet(this.pet);
    obs.subscribe((data: any) => {
      if (data.errors) {
        for (let i in data.errors) {
          this.messages.push(data.errors[i].message);
        }
      } else {
        console.log('Adding pet', data);
        this.rootRoute();
      }
    })
  }


  rootRoute() {
    this.router.navigate(['/pets'], {
      queryParams: { refresh: new Date().getTime() }
    });
  }
}
