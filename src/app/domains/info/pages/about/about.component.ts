import { Component, signal } from '@angular/core';
import { WaveAudioComponent } from '@info/components/wave-audio/wave-audio.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [WaveAudioComponent, TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export default class AboutComponent {
  audio = signal({
    url: 'assets/audio/audioTest.mp3',
    title: 'Epoch',
    artist: 'Tycho',
  });

  duration = signal(1000);
  message = signal('Hola');

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber);
  }
  changeMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value);
  }
}
