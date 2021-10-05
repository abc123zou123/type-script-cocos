export class Queue<T> {
    private arr: Array<T> = [];

    public get Count(): number {
        return this.arr.length;
    }

    public Clear() {
        this.arr = [];
    }

    public Contains(item: T): boolean {
        return this.arr.indexOf(item) >= 0;
    }

    public Dequeue(): T {
        if (this.arr.length <= 0)
            return null;
        let result: T = this.arr[0];
        this.arr.splice(0, 1);
        return result;
    }

    public Enquque(item: T) {
        this.arr.push(item);
    }

    public Peek(): T {
        if (this.arr.length <= 0)
            return null;
        let result: T = this.arr[0];
        return result;
    }

    public ToArray(): T[] {
        let result: Array<T> = [];
        result.concat(this.arr);
        return result;
    }

    public ToString(): string {
        let result: string = "";
        for (let item of this.arr) {
            result += item + " ";
        }
        return result;
    }
}

