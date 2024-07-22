import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-header-footer',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './layout-header-footer.component.html',
  styleUrl: './layout-header-footer.component.css'
})
export class LayoutHeaderFooterComponent {

}
