import { Pipe, PipeTransform } from '@angular/core';
import { Formation } from 'app/model/formation';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class PipePipe implements PipeTransform {
      transform(formations: Formation[], filterargs: string): Formation[] {
        if (!formations || !filterargs) {
            return formations;
        }
        return formations.filter(item => item.nom.toLowerCase().indexOf(filterargs.toLowerCase()) !== -1);
    }
}
