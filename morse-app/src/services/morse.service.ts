import { Injectable } from '@angular/core';
import { MorseControl } from 'src/app/model/MorseControl';

interface StringMap { [key: string]: string; }


@Injectable({
  providedIn: 'root'
})

export class MorseService {

MORSE_ALPHABET: StringMap = 
{
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  'a': '.-',
  'b': '-...',
  'c': '-.-.',
  'd': '-..',
  'e': '.',
  'f': '..-.',
  'g': '--.',
  'h': '....',
  'i': '..',
  'j': '.---',
  'k': '-.-',
  'l': '.-..',
  'm': '--',
  'n': '-.',
  'o': '---',
  'p': '.--.',
  'q': '--.-',
  'r': '.-.',
  's': '...',
  't': '-',
  'u': '..-',
  'v': '...-',
  'w': '.--',
  'x': '-..-',
  'y': '-.--',
  'z': '--..',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  '!': '-.-.--',
  '-': '-....-',
  '/': '-..-.',
  '@': '.--.-.',
  '(': '-.--.',
  ')': '-.--.-'
}

  constructor() { }

  textToMorse = (text: string): string => {
    const morseArray = [];

    for(var i = 0; i < text.length; i++){
      const character = text[i].toLowerCase();
      
      if(character === ' '){
        morseArray.push('/');
      }
      else if (this.MORSE_ALPHABET[character]) {
        morseArray.push(this.MORSE_ALPHABET[character])
      }

    }

    const message = morseArray.join(' ');

    return message;
  }

  morseToControlArray = (morse: string): Array<MorseControl> => {
    const controlArray: Array<MorseControl>  = [];

    for(var i = 0; i < morse.length; i++){           
      if(morse[i] === ' '){
        controlArray.push(new MorseControl('space'));
      } else if (morse[i] === '/') {
        controlArray.push(new MorseControl(' '));
      } else {
        controlArray.push(new MorseControl(morse[i]))
      }      

    }

    return controlArray;
  }
  
}
