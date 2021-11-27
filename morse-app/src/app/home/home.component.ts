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

  ditLength = 500;

  morseInput = '';
  morseOutput = '';
  controlArray: Array<MorseControl> | null = null;
  flasherOn = false;

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
    if(this.controlArray){
      this.flasherOn = false;
      this.recursiveLightControl(this.controlArray, 0);
    }
  }

  recursiveLightControl = (controlArray: Array<MorseControl>, index: number) => {
    const con = controlArray[index];    

    const spaceSource = timer(this.ditLength);
    this.flasherOn = false;
    spaceSource.subscribe(spaceCount => {

      this.flasherOn = con.state;
      console.log(con.value);
      const source = timer(this.ditLength*con.time);      
      source.subscribe(count => {

        if(index < controlArray.length - 1) {
          this.recursiveLightControl(controlArray, index + 1);
        } else {
          this.flasherOn = false;
        }
      })
      
    })
  }

}
