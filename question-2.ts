
class QueueElement {
    constructor(private element: any, public priority: any) {

    }
}
class PriorityQueue {

    constructor(private items = []) { }
    /**
     * adds an item to the priority queue with a given priority
     * @param item 
     * @param priority 
     */
    public insert(item, priority) {
        var qElement = new QueueElement(item, priority);
        var contain = false;

        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(qElement);
        }

    }

    /**
     * removes and returns the item with the highest priority (i.e., the lowest priority number)
     * @return QueueElement
     */
    public pop() {
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }
    /**
     * returns the item with the highest priority without removing it
     * @return QueueElement
     */
    public peek() {
        // returns the highest priority element
        // in the Priority queue without removing it.
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }
    /**
     * returns true if the priority queue is empty, false otherwise
     * @return boolean
     */
    public isEmpty = (): boolean => this.items.length == 0;
    print(): string {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i].element + " ";
        return str;
    }
}

let queue = new PriorityQueue();
console.log(queue.isEmpty());

// returns "No elements in Queue"
console.log(queue.peek());

// adding elements to the queue
queue.insert("Google", 2);
queue.insert("Facebook", 1);
queue.insert("Twitter", 1);
queue.insert("Microsoft", 2);
queue.insert("CMC", 3);


// prints Facebook
console.log(queue.peek().element);



// removes Facebook

// [Facebook Twitter Google Microsoft CMC]
//print Facebook
console.log(queue.pop().element);

// Adding ReGov
queue.insert("ReGov", 2);

// prints [Twitter Google Microsoft ReGov CMC]
console.log(queue.print());

