export class Clock implements IClock {

    private year: number;
    private month: number;
    private week: number;
    private day: number;

    constructor(year = 0, month = 0, week = 0, day = 0) {
        this.year = year;
        this.month = month;
        this.week = week;
        this.day = day;
    }

    public getYear(): number {
        return this.year;
    }

    public getMonth(): number {
        return this.month;
    }

    public getWeek(): number {
        return this.week;
    }

    public getDay(): number {
        return this.day;
    }

    public setYear(year: number): void {
        this.year = year;
    }

    public setMonth(month: number, date?: number): void {
        this.month = month;
    }

    public setWeek(week: number): void {
        this.week = week;
    }

    public setDay(day: number): void {
        this.day = day;
    }

    public updateDate(): void {
        this.day++;
        // 5 Business Days in a week
        if (this.day > 5) {
            this.day = 1;
            this.week++;
            if (this.week > 4) {
                this.week = 1;
                this.month++;
                if (this.month > 12) {
                    this.month = 1;
                    this.year++;
                }
            }
        }
    }

    public getDateString(): string {
        return `Y${this.year} M${this.month} W${this.week} D${this.day}`;
    }

}