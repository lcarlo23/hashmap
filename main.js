class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.size = 16;
        this.buckets = new Array(this.size);
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error('Trying to access index out of bound');
        }

        if (
            this.buckets[index] === undefined ||
            this.buckets[index].key === key
        ) {
            this.buckets[index] = { key, value, next: null };
        } else {
            this.buckets[index].next = { key, value, next: null };
        }

        if (this.length() > this.size * this.loadFactor) {
            this.buckets.length = this.size * 2;
        }
    }

    get(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error('Trying to access index out of bound');
        }

        if (this.buckets[index] == undefined) return null;

        let currentNode = this.buckets[index];

        while (currentNode != null) {
            if (currentNode.key === key) return currentNode.value;
            else currentNode = currentNode.next;
        }

        return null;
    }

    has(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error('Trying to access index out of bound');
        }

        if (this.buckets[index] == undefined) return false;

        let currentNode = this.buckets[index];

        while (currentNode != null) {
            if (currentNode.key === key) return true;
            else currentNode = currentNode.next;
        }

        return false;
    }

    remove(key) {
        if (this.has(key)) {
            const index = this.hash(key);

            if (index < 0 || index >= this.buckets.length) {
                throw new Error('Trying to access index out of bound');
            }

            let previousNode = null;
            let currentNode = this.buckets[index];

            if (currentNode.key === key) {
                currentNode.next != null
                    ? (this.buckets[index] = currentNode.next)
                    : (this.buckets[index] = {});
                return true;
            } else {
                while (currentNode.key != key) {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                }
                if (currentNode.key === key) {
                    previousNode.next = currentNode.next;
                    return true;
                }
            }
        } else return false;
    }

    length() {
        let length = 0;

        for (let i = 0; i <= this.size; i++) {
            if (this.buckets[i]) {
                length++;
                if (this.buckets[i].next != null) {
                    let currentNode = this.buckets[i].next;

                    while (currentNode != null) {
                        length++;
                        currentNode = currentNode.next;
                    }
                }
            }
        }

        return length;
    }

    clear() {
        this.buckets = new Array(this.size);
        return 'all clear';
    }

    keys() {
        let array = [];

        for (let i = 0; i <= this.size; i++) {
            if (this.buckets[i]) {
                array.push(this.buckets[i].key);
                if (this.buckets[i].next != null) {
                    let currentNode = this.buckets[i].next;
                    while (currentNode != null) {
                        array.push(currentNode.key);
                        currentNode = currentNode.next;
                    }
                }
            }
        }

        return array;
    }

    values() {
        let array = [];

        for (let i = 0; i <= this.size; i++) {
            if (this.buckets[i]) {
                array.push(this.buckets[i].value);
                if (this.buckets[i].next != null) {
                    let currentNode = this.buckets[i].next;
                    while (currentNode != null) {
                        array.push(currentNode.value);
                        currentNode = currentNode.next;
                    }
                }
            }
        }

        return array;
    }

    entries() {
        let array = [];

        for (let i = 0; i <= this.size; i++) {
            if (this.buckets[i]) {
                array.push([this.buckets[i].key, this.buckets[i].value]);
                if (this.buckets[i].next != null) {
                    let currentNode = this.buckets[i].next;
                    while (currentNode != null) {
                        array.push([currentNode.key, currentNode.value]);
                        currentNode = currentNode.next;
                    }
                }
            }
        }

        return array;
    }
}

const test = new HashMap(); // or HashMap() if using a factory

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

test.set('hat', 'white');
test.set('banana', 'orange');
test.set('moon', 'silver');
