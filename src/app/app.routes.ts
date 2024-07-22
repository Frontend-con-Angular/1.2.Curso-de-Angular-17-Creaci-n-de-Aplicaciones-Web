import { Routes } from '@angular/router';
import { ListComponent } from '@products/components/list/list.component';
import { AboutComponent } from '@info/pages/about/about.component';
import { NotFoundComponent } from '@info/pages/not-found/not-found.component';
import { LayoutHeaderFooterComponent } from '@shared/components/layout-header-footer/layout-header-footer.component';
import { ProductDetailComponent } from '@products/pages/product-detail/product-detail.component';
import { HomeComponent } from '@info/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutHeaderFooterComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'store',
        component: ListComponent,
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
