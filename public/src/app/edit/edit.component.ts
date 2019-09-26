import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet: any;
  params_id: string;
  messages: string[];

  constructor(
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getParams();
    this.getPetFromService();
    this.messages = [];
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

  onSubmit() {
    this.messages = [];
    const obs = this._httpService.updatePet(this.pet._id, this.pet);
    obs.subscribe((data: any) => {
      if (data.errors) {
        for (let i in data.errors) {
          this.messages.push(data.errors[i].message);
        }
      } else {
        console.log('Updating pet info', data);
        this.gotoShow();
      }
    })
  }
  
  gotoShow() {
    this.router.navigate([`/pets/${this.pet._id}`]);
  }
}
