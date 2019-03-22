export class Order {
    id: number;
    name: string;
    items: any[];

    constructor(id: number, name: string, items: any[]) {
        this.id = id;
        this.name = name;
        this.items = items;
    }
}
