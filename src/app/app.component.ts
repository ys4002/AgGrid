import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, IGetRowsParams } from 'ag-grid-community';
import { Filter } from './model/filter.model';
import * as moment from 'moment';
import { ApiService } from './service/api.service';
import { DetailComponent } from './detail/detail.component';
import 'ag-grid-enterprise'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AgGrid';

  filter: Filter;

  @ViewChild('myGrid') myGrid: AgGridAngular;

   gridOptions: Partial<GridOptions>;
   gridApi;
   gridColumnApi;
   columnDefs = [
    { headerName: 'Id', field: 'expanded', cellRenderer: "agGroupCellRenderer"},
    { headerName: 'Brand', field: 'brand', rowGroup: true, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Client', field: 'client', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Code', field: 'code', sortable: true },
    {
      headerName: 'Date', field: 'date', sortable: true, 
    }
  ];
   cacheOverflowSize;
   maxConcurrentDatasourceRequests;
   infiniteInitialRowCount;


  constructor(
    private api: ApiService) {

      this.filter = new Filter();

    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 2;
    this.infiniteInitialRowCount = 2;

    this.gridOptions = {
      // headerHeight: 45,
      // rowHeight: 30,
      // cacheBlockSize: 40,
      // paginationPageSize: 40,
      // rowModelType: 'infinite',
      // infiniteInitialRowCount: 1
    }
  }

  onGridReady(params) {
    console.log('On Grid Ready');

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    var datasource = {
      getRows: (params: IGetRowsParams) => {
        //  TODO: Call a service that fetches list of users
        console.log("Fetching startRow " + params.startRow + " of " + params.endRow);
        console.log(params);
        this.filter.startRow = params.startRow;
        this.filter.endRow = params.endRow;
        this.filter.filter = params.filterModel!== undefined ? params.filterModel : "";
        this.filter.sort = params.sortModel[0]!== undefined ? params.sortModel[0].sort: "";
        console.log(this.filter);
        this.api.getMaster(this.filter)
          .subscribe(data => { 
            console.log(data);
            data.forEach((x : any)=> {
              x.expanded = false;
            });
            params.successCallback(data, 100) 
          });
      }
    }

    this.gridApi.setDatasource(datasource);
  }

  onCellClicked(params) {
    if (params.colDef.field == "expanded") {
      params.node.setExpanded(!params.node.expanded);
    }
  }

  onPaginationChanged(event) {

  }
  detailCellRenderer = "detailCellRenderer";
  frameworkComponents = {
    detailCellRenderer: DetailComponent,
  };
  
  icons= {
    groupExpanded: '<img src="https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/javascript-grid-icons/minus.png" style="height: 12px; width: 12px;padding-right: 2px"/>',
    groupContracted: '<img src="https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/javascript-grid-icons/plus.png" style="height: 12px; width: 12px;padding-right: 2px"/>',
  }

  ngOnInit() { 
    

  }
  
}
