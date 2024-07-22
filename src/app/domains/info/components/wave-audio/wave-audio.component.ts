import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {

  @Input({required: true}) audioUrl!: string;
  @Input({required: true}) audioName!: string;
  @Input({required: true}) artist!: string;

  @ViewChild('wave') container!: ElementRef;

  private ws!: WaveSurfer;

  isPlaying = signal(false);
  duration = signal('');
  currentTime = signal('0:00');

  ngAfterViewInit(){
    this.ws = WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement,
      waveColor: 'violet',
      progressColor: 'purple',
    });
    this.ws.on('pause', ()=>this.isPlaying.set(false));
    this.ws.on('play', ()=>this.isPlaying.set(true));
    this.ws.on('audioprocess', (currentTime)=>this.currentTime.set(this.formatTime(currentTime)));
    this.ws.on('ready', () =>this.duration.set(this.formatTime(this.ws.getDuration())));
  }

  playPause(){
    this.ws.playPause();
  }
  formatTime(seconds: number): string {
    const time = Math.floor(seconds);
    const minutesPart = Math.floor(time / 60);
    const secondsPart = time % 60;
    const formattedSeconds = secondsPart < 10 ? `0${secondsPart}` : `${secondsPart}`;
    return `${minutesPart}:${formattedSeconds}`;
  }
}
