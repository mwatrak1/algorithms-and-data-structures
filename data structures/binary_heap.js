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