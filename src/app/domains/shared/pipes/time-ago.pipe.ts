import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date): string {
    return formatDistanceToNow(value,{
      addSuffix: false,
      locale: es
    });
  }
}
