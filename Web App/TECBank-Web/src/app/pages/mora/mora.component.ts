import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mora',
  templateUrl: './mora.component.html',
  styleUrls: ['./mora.component.css']
})
export class MoraComponent implements OnInit {

  title = 'reportviewerapp';
  public serviceUrl: string;
  public reportPath: string;

  constructor() { 

    this.serviceUrl = 'http://localhost:4200/api';
    this.reportPath = '~/Resources/Report.rdl';

  }

  ngOnInit(): void {
  }

}
