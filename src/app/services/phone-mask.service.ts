import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneMaskService {
  format: string;
  keypress:boolean=false;
  constructor() { 
    this.format="+38 (ddd) ddd-dd-dd";
  }
  formatNumber(number:string) { 
   // if(number=="") return number;
    let format=this.format;
    var formattedNumber,
        indexFormat,
        indexNumber,
        currentFormat,
        currentNumber

    formattedNumber = '';
    number = String(number).replace(/\D/g, '');
let lengthFormat= format.length;
let lengthNumber= number.length;
    for (indexNumber = 0,  indexFormat=0; indexFormat < lengthFormat; indexFormat = indexFormat + 1) {
      if(indexNumber>lengthNumber) break;
      currentFormat=format.charAt(indexFormat);
      currentNumber=number.charAt(indexNumber);
      if(currentFormat==currentNumber){
        indexNumber++;
        formattedNumber+=currentNumber;
        continue
      }
      if (/\d/g.test(currentNumber)) {
        if (currentFormat !== 'd') {
          formattedNumber+=currentFormat;
          continue
        }
        else{
          formattedNumber+=currentNumber;
          indexNumber++;
        }
      }
    }
 /*   for (indexFormat = 0, indexNumber = 0; indexFormat < format.length; indexFormat = indexFormat + 1) {
      if (/\d/g.test(format.charAt(indexFormat))) {
        if (format.charAt(indexFormat) === number.charAt(indexNumber)) {
          formattedNumber += number.charAt(indexNumber);
          indexNumber = indexNumber + 1;
        } else {
          formattedNumber += format.charAt(indexFormat);
        }
      } else if (format.charAt(indexFormat) !== 'd') {
        if (number.charAt(indexNumber) !== '' || format.charAt(indexFormat) === '+') {
          formattedNumber += format.charAt(indexFormat);
        }
      } else {
        if (number.charAt(indexNumber) === '') {
          formattedNumber += '';
        } else {
          formattedNumber += number.charAt(indexNumber);
          indexNumber = indexNumber + 1;
        }
      }
    }
    
    lastCharacter = format.charAt(formattedNumber.length);
    if (lastCharacter !== 'd') {
      formattedNumber += lastCharacter;
    }*/
   
    return formattedNumber;
  }
}
