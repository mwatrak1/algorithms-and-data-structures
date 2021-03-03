class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Stack {
    constructor(){
        this.first = null
        this.last = null
        this.length = 0
    }

    push(value){
        var newNode = new Node(value)

        if (!this.first){
            this.first = newNode
            this.last = newNode
        } else {
            var current = this.first
            this.first = newNode
            this.first.next = current
        }

        return ++this.length

    }

    pop(){
        if (!this.first) return null

        var current = this.first

        if (this.length === 1){
            this.first = null
            this.last = null
        } else {
            this.first = this.first.next
        }

        this.length --
        return current.value

    }
}