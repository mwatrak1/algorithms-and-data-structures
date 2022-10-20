class Node {
    constructor(value, priority){
        this.value = value
        this.priority = priority
    }
}

class PriorityQueue {
    // based on a binary heap
    constructor(){
        this.values = []
    }

    enqueue(value, priority){
        const element = new Node(value, priority)
        this.values.push(element)
        
        var childIndex = this.values.length - 1
        var parentIndex = Math.floor((childIndex - 1) / 2)
        var parent = null

        while(parentIndex >= 0){
            parent = this.values[parentIndex]

            if (parent.priority >= element.priority){
                this.values[childIndex] = parent
                this.values[parentIndex] = element

                childIndex = parentIndex
                parentIndex = Math.floor((childIndex -1) / 2)
            } else {
                return this
            }
                        
        }

    }

    dequeue(){
        if (this.values.length === 0) return undefined
        if (this.values.length === 1) return this.values.pop()
        const min = this.values[0]
        const end = this.values.pop()
        this.values[0] = end
        
        this.sinkDown()

        return min
    }

    sinkDown(){
        let idx = 0
        let length = this.values.length
        const element = this.values[0]
        var leftIdx, rightIdx, leftChild, rigthChild
        let swap

        while (true){
            leftIdx = 2 * idx + 1
            rightIdx = 2 * idx + 2
            swap = null

            if (leftIdx < length){
                leftChild = this.values[leftIdx]
                if (leftChild.priority < element.priority){
                    swap = leftIdx
                }
            }

            if (rightIdx < length){
                rigthChild = this.values[rightIdx]
                if ( 
                        (swap === null && rigthChild.priority < element.priority) || 
                        (swap !== null && rigthChild.priority < leftChild.priority ) 
                   ){
                        swap = rightIdx
                }
            }
            
            if (swap === null) break

            this.values[idx] = this.values[swap]
            this.values[swap] = element
            idx = swap
        }
    }
}

var PQ = new PriorityQueue()
PQ.enqueue(41, 5)
PQ.enqueue(321, 1)
PQ.enqueue(12, 4)
PQ.enqueue(42, 2)
PQ.enqueue(34, 3)
