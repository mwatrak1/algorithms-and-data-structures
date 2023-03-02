class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    var element = new Node(val);
    if (!this.head) {
      this.head = element;
      this.tail = this.head;
    } else {
      this.tail.next = element;
      this.tail = element;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) {
      console.log("List is already empty!");
      return undefined;
    } else if (this.length == 1) {
      this.head = null;
      this.tail = null;
      this.length -= 1;
    } else {
      let previous = this.traverse();
      previous.next = null;
      this.tail = previous;
      this.length -= 1;
    }
  }

  traverse() {
    let current = this.head;
    while (current) {
      if (current.next.val === this.tail.val) {
        return current;
      } else {
        current = current.next;
      }
    }
  }

  shift() {
    if (!this.head) {
      return undefined;
    }
    var current = this.head;
    this.head = current.next;
    this.length -= 1;
    if (this.length === 0) {
      this.tail = null;
    }
  }

  unshift(val) {
    if (!this.head) {
      this.head = new Node(val);
      this.tail = this.head;
    } else {
      let current = this.head;
      this.head = new Node(val);
      this.head.next = current;
      this.length += 1;
    }
  }

  find(index) {
    var currentIndex = 0;
    var currentNode = this.head;
    if (index >= this.length || index < 0) {
      return null;
    } else {
      while (currentIndex < index) {
        currentNode = currentNode.next;
        currentIndex++;
      }
      return currentNode;
    }
  }

  changeValue(index, value) {
    var found = this.find(index);
    if (found) {
      found.val = value;
      return true;
    }
    return false;
  }

  insert(index, value) {
    if (index === this.length) return !!this.push(value);
    if (index === 0) this.unshift(value);

    if (index > 0 && index < this.length) {
      var previous = this.find(index - 1);
      var current = previous.next;

      var newNode = new Node(value);
      
      previous.next = newNode;
      previous.next.next = current;
      
      this.length++;
      return true;
    } else {
      return false;
    }
  }

  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) {
      this.shift();
      return true;
    } else if (index === this.length - 1) {
      return !!this.pop();
    } else {
      var before = this.find(index - 1);
      var after = before.next.next;
      before.next = after;
      list.length--;
      return true;
    }
  }

  reverse() {
    var node = this.head;
    this.head = this.tail;
    this.tail = node;

    var next;
    var prev = null;


    for (var i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }

    return this;
  }
}

const linkedList = new SinglyLinkedList();
linkedList.push(1);
linkedList.push(2);
linkedList.push(4);
linkedList.push(8);

linkedList.reverse();

console.log(linkedList);
