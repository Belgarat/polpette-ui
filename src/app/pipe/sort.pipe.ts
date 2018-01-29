import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort',
    pure: false
})
export class SortPipe implements PipeTransform {
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
	    if ( a[args] < b[args] ){
	    	return -1;
	    }else if( a[args] > b[args] ){
	        return 1;
	    }else{
	    	return 0;	
	    }
    });
    return array;
  }
}
@Pipe({
    name: 'sortnum',
    pure: false
})
export class SortNumPipe implements PipeTransform {
    transform(array: Array<string>, args: string): Array<string> {
      array.sort((a: any, b: any) => {
          if ( Number(a[args]) > Number(b[args]) ){
              return -1;
          }else if( Number(a[args]) < Number(b[args]) ){
              return 1;
          }else{
              return 0;	
          }
      });
      return array;
    }
  }