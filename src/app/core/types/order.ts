export class Order {
    id: number;
    items: any[];
    note: string;
    status: string;
    buyerId: number;
    date: Date;
    estimatedDate: Date;
    rejecetedNote: string;
    createdDate: Date;

    constructor(items: any[], note: string, buyerId: number, date: Date) {
        this.items = items;
        this.note = note;
        this.buyerId = buyerId;
        this.date = date;
    }
}
