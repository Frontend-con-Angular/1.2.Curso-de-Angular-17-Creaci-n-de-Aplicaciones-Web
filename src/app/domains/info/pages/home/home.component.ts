import { Component } from '@angular/core';
import { BannerComponent } from '@info/components/banner/banner.component';
import { ListCategoriesComponent } from '@products/components/list-categories/list-categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    ListCategoriesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
