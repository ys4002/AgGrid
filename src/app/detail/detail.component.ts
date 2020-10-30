import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements ICellRendererAngularComp{

  data;
  constructor() { 
    console.log("detail");
  }

  refresh(params: any): boolean {
    return false;
  }

  agInit(params: any): void {
this.data=params.data;
  }
}
