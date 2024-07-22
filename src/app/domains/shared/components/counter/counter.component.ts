import { CommonModule } from '@angular/common';
import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  @Input({required: true}) duration: number = 0;
  @Input({required: true}) message: string = '';

  counter = signal<number>(0);

  intervalCounter: number | undefined;

  random1: string = 'primitivo antiguo';
  random2 = signal<String>('signal antiguo');

  constructor(){
    // NO ASYNC
    // before render
    // una vez
    console.log('constructor');
    console.log('_'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges){
    //before and during render
    console.log('ngOnChanges')
    console.log('_'.repeat(10));
    console.log(changes);

    //verificar que elemento se modifico
    const duration = changes['duration'];
    if(duration && duration.currentValue != duration.previousValue) this.verificarDuration();
  }
  ngOnInit(){
    // before render of the component
    // una vez
    // async, then, subs
    console.log('ngOnInit');
    console.log('_'.repeat(10));
    console.log('message=>', this.message);
    console.log('duration=>', this.duration);

    this.intervalCounter = window.setInterval(()=>{
      this.counter.update(count=>count+1);
      console.log('run interval');
    }, 1000);
  }
  ngAfterViewInit(){
    // after render
    // hijos componentes de este ya fueron pintados
    console.log('ngAfterViewInit');
    console.log('_'.repeat(10));
  }
  ngOnDestroy(){
    // after render
    // antes de ser destruido
    console.log('ngOnDestroy');
    console.log('_'.repeat(10));

    if(this.intervalCounter) window.clearInterval(this.intervalCounter);
  }

  //Funciones de actualizacion de input
  verificarDuration(){
    if(this.duration <= 0) this.message = 'La duracion es invalida';
    if(this.duration < 1000 && this.duration > 0) this.message = 'La duracion es valida';
    if(this.duration >= 1000) this.message = 'La duracion es muy larga';
  }


  //Funciones de eventos
  actualizarDatosRandom(){
    this.random1 = 'primitivo nuevo';
    this.random2.set('signal nuevo');
  }
}
