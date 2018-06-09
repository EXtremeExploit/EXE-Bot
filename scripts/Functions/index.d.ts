import { Connection } from 'mysql'

export declare class Functions {
    constructor();
    clean(text: string): string;
    reverseString(string: string): string;
    fixDecimals(number: number): string;
    replacedWikis(string: string): string;
    connectToDatabase(): Connection;
    convertMS(ms: number): {
        miliseconds: number,
        seconds: number,
        minutes: number,
        hours: number,
        days: number
    }
}
