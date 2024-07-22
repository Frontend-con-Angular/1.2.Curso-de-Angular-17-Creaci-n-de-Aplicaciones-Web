import { Component } from '@angular/core';
import { FilterComponent } from '@products/components/filter/filter.component';
import { ListComponent } from '@products/components/list/list.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    FilterComponent,
    ListComponent
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

}
