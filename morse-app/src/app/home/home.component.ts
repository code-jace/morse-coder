import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { MorseService } from 'src/services/morse.service';
import { MorseControl } from '../model/MorseControl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ditLength = 300;
  loopTransmit = false; // TODO improve loop logic

  morseInput = '';
  morseOutput = '';
  controlArray: Array<MorseControl> | null = null;
  flasherOn = false;

  transmitting = false;
  letterCount = 0;
  currentIndex = 0;

  constructor(public morseService: MorseService) { 
  }

  ngOnInit(): void {
  }

  textToMorseClick = (): void => {
    this.morseOutput = '';
    this.controlArray = null;
    this.morseOutput = this.morseService.textToMorse(this.morseInput);
       
    this.controlArray = this.morseService.morseToControlArray(this.morseOutput);

  }

  runFlasher = (): void => {
    if(this.controlArray && !this.transmitting){
      this.flasherOn = false;
      this.transmitting = true;
      this.letterCount = this.controlArray.length;
      this.currentIndex = 0;
      this.recursiveLightControl(this.controlArray, 0);
    }
  }

  percentTransmit = (): number => {
    return Math.round(this.currentIndex/this.letterCount*100);
  }

  recursiveLightControl = (controlArray: Array<MorseControl>, index: number) => {
    const con = controlArray[index];    
    
    const spaceSource = timer(this.ditLength);
    this.flasherOn = false;
    spaceSource.subscribe(spaceCount => {

      this.flasherOn = con.state;
      console.log(con.value);
      this.currentIndex = index;
      const source = timer(this.ditLength*con.time);      
      source.subscribe(count => {
       
        if(index < controlArray.length - 1) {
          this.recursiveLightControl(controlArray, index + 1);
        } else {

          this.flasherOn = false;
          this.transmitting = false;
          if(this.loopTransmit) {
            console.log('loop ends');
            const loopSource = timer(this.ditLength*2);      
            loopSource.subscribe(count => { 
              this.runFlasher();
            })            
          } else {
            console.log('end');
            
          }
        }
      })
      
    })
  }

}
