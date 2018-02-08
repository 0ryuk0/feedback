import { Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  appTitle = '';
  constructor(private _sharedService: SharedService, private _router: Router) { }

  ngOnInit() {
    this.appTitle = this._sharedService._appTitle;
  }

}
