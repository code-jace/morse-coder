export class MorseControl { 
    state: boolean = false; 
    time: number = 1 
    value: string = 'letterspace';

    constructor(value: string){
        const self = this;
        if(value === 'space'){
            self.state = false;
            self.time = 1; // 3 long but allow for dark space on each end
            self.value = 'letterspace';
        } else if (value === '.') {
            self.state = true;
            self.time = 1;
            self.value = 'dit';
        } else if (value === '-') {
            self.state = true;
            self.time = 3;
            self.value = 'dah';
        } else if (value === ' ') {
            self.state = false;
            self.time = 5; // 7 long but allow for dark space on each end
            self.value = 'SPACE';
        }
    }
    
}
