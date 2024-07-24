import { Component, Input } from '@angular/core';
import { initCarousels } from 'flowbite';

@Component({
  selector: 'app-carousel-imgs',
  standalone: true,
  imports: [],
  templateUrl: './carousel-imgs.component.html',
  styleUrl: './carousel-imgs.component.css'
})
export class CarouselImgsComponent {
  //variables propias
  @Input({required: true}) images!: String[];

  ngOnInit(){
    this.verifyAmountImages();
  }

  verifyAmountImages(){
    if(this.images.length >1){
      initCarousels();
    }
  }

  testImages(){
    if(this.images.length <=1){
      this.images = this.images.concat(this.images).concat(this.images);
    }
  }
}
