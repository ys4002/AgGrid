import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'ag-grid-enterprise'
import { LicenseManager } from 'ag-grid-enterprise';

LicenseManager.setLicenseKey(`CompanyName=Phototype,LicensedGroup=Phototype,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-008616,ExpiryDate=24_July_2021_[v2]_MTYyNzA4MTIwMDAwMA==155596b8bf655e6121673a112d61d54b`);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
