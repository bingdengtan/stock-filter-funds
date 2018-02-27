import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class CoreUtils {
    static FORMAT_DATE = 'MMM D YYYY';
    static FORMAT_DATE_TIME = 'MMM D YYYY HH:mm:ss';

    getAppHostName(): String {
        return location.protocol + '//' + location.hostname;
    }

    getDateFormat(date): String {
        let val;
        date = moment.utc(date);
        if (date.isValid) {
            val = date.format(CoreUtils.FORMAT_DATE_TIME);
        }
        return val;
    }
}

export interface GridColumn {
    display: boolean;
    title: String;
    filedName: String;
    width: String;
    columnFormat: any;
    sort: any;  // sort object {enable: boolean, sortBy: string}, if the sortBy is null, then it will use the filed name to sort
}
