class MaxBinaryHeap {
    constructor(){
        this.values = []
    }

    insert(element){

        this.values.push(element)
        
        var childIndex = this.values.length - 1
        var parentIndex = Math.floor((childIndex - 1) / 2)
        var parent = null

        while(parentIndex >= 0){
            console.log(parentIndex)
            parent = this.values[parentIndex]

            if (parent < element){
                this.values[childIndex] = parent
                this.values[parentIndex] = element 

                childIndex = parentIndex
                parentIndex = Math.floor((childIndex -1) / 2)
            } else {
                console.log(this.values)
                return this
            }
                        
        }
        console.log(this.values)

    }


    extractMax(){
        if (this.values.length === 0) return undefined
        if (this.values.length === 1) return this.values.pop()
        const max = this.values[0]
        const end = this.values.pop()
        this.values[0] = end
        
        this.sinkDown()

        return max
    }

    sinkDown(){
        let idx = 0
        let length = this.values.length
        const element = this.values[0]
        var leftIdx, rightIdx, leftValue, rightValue
        let swap

        while (true){
            leftIdx = 2 * idx + 1
            rightIdx = 2 * idx + 2
            swap = null

            if (leftIdx < length){
                leftValue = this.values[leftIdx]
                if (leftValue > element){
                    swap = leftIdx
                }
            }

            if (rightIdx < length){
                rightValue = this.values[rightIdx]
                if ( (swap === null && rightValue > element) || (swap !== null && rightValue > leftValue ) ){
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


var mbh = new MaxBinaryHeap()
mbh.insert(100)
mbh.insert(20)
mbh.insert(40)
mbh.insert(200)
mbh.insert(300)
mbh.insert(5)
mbh.insert(45)
mbh.insert(250)