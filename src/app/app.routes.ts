import { Routes } from '@angular/router';
import { LayoutHeaderFooterComponent } from '@shared/components/layout-header-footer/layout-header-footer.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutHeaderFooterComponent,
    children: [
      {
        path: '',
        loadComponent: ()=> import('@info/pages/home/home.component').then(component=>component.HomeComponent)
      },
      {
        path: 'store',
        loadComponent: ()=> import('@products/pages/store/store.component').then(component=>component.StoreComponent)
      },
      {
        path: 'about',
        loadComponent: ()=> import('@info/pages/about/about.component')
      },
      {
        path: 'contact',
        loadComponent: ()=> import('@info/pages/contact/contact.component')
      },
      {
        path: 'product/:id',
        loadComponent: ()=> import('@products/pages/product-detail/product-detail.component')
      }
    ]
  },
  {
    path: '**',
    loadComponent: ()=> import('@info/pages/not-found/not-found.component')
  }
];
