class Node {
    constructor(value) {
        this.value = value
        this.right = null
        this.left = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(value){
        var newNode = new Node(value)
        if (!this.root){
            this.root = newNode
            newNode.index = 0;
            return this
        } 
        
        var current = this.root;
        var currentIndex = 0;

       while (true) {
           if (value == current.value) return undefined
           if (value < current.value) {
                currentIndex  = 2 * currentIndex + 1
               if (current.left === null) {
                   current.left = newNode;
                   newNode.index = currentIndex;
                   return this
               } else {
                   current = current.left
               }
           } else {
                currentIndex = 2 * currentIndex + 2
               if (current.right === null) {
                   current.right = newNode;
                   newNode.index = currentIndex;
                   return this
               } else {
                   current = current.right
               }
           }
       }

    }

    find(value){
        if (!this.root) return null

        var current = this.root

        while (true){
            if (current.value === value){
                return current
            }

            if (current.value < value){
                if (current.right){
                    current = current.right
                } else {
                    return null
                }
            } else {
                if (current.left){
                    current = current.left
                } else {
                    return null
                }

            }
        }

    }

    findAtIndex(index) {
        if (!this.root) return null

        var current = this.root

        while (true){
            if (current.index === index){
                return current
            }

            if (current.index < index){
                if (current.right){
                    current = current.right
                } else {
                    return null
                }
            } else {
                if (current.left){
                    current = current.left
                } else {
                    return null
                }

            }
        }
    }

    contains(value){
        if (!this.root) return false

        var current = this.root
        var found = false

        while (current && !found){
            
            if (current.value > value){
                current = current.left
            } else if (current.value < value){
                current = current.right
            } else {
                found = true
            }
        }

        return found

    }

    bfs(){
        var queue = []
        var values = []
        var current = null

        queue.push(this.root)

        while (queue.length){

            current = queue.shift()

            values.push(current.value)

            if (current.left !== null) {
                queue.push(current.left);
            }
            if (current.right !== null) {
                queue.push(current.right);
            }
        }

        return values

    }

    dfs_preorder(){
        // we visit top nodes starting from left and adding every perent nodes
        // before visiting children

        // great for exporting a tree or saving it somewhere because the order
        // makes it possible to recostruct a tree

        var values = []
        var current = this.root
        
        function traverse(current, values){

            values.push(current.value)

            if (current.left !== null) traverse(current.left, values)
            if (current.right !== null) traverse(current.right, values)

        }

        traverse(current, values)
        return values    
    }


    dfs_postorder(){
        // first we traverse the tree and then we start adding nodes
        // starting from children and going up to parents

        var values = []
        var current = this.root
        
        function traverse(current, values){

            if (current.left !== null) traverse(current.left, values)
            if (current.right !== null) traverse(current.right, values)
            values.push(current.value)

        }

        traverse(current, values)
        return values 

    }

    dfs_inorder(){

     // one branch level after another starting from left bottom

    // great when we need sorted data

        var values = []
        var current = this.root
        
        function traverse(current, values){

            if (current.left !== null) traverse(current.left, values)
            values.push(current.value)
            if (current.right !== null) traverse(current.right, values)

        }

        traverse(current, values)
        return values 

    }

    lowestCommonAncestor(value, anotherValue) {
        const valueNode = this.find(value);
        const anotherValueNode = this.find(anotherValue);

        if (!valueNode || !anotherValueNode) {
            return null;
        }

        const valueIndex = valueNode.index;
        const anotherValueIndex = anotherValueNode.index;

        let valueParentNodeIndexes = this.findNodeParentIndexes(valueIndex);
        let anotherValueParentNodeIndexes = this.findNodeParentIndexes(anotherValueIndex);

        if (valueParentNodeIndexes.length !== anotherValueParentNodeIndexes.length) {
            const minimumTreeLevels = Math.min(valueParentNodeIndexes.length, anotherValueParentNodeIndexes.length);
            valueParentNodeIndexes.length > anotherValueParentNodeIndexes.length
            ? valueParentNodeIndexes.splice(0, valueParentNodeIndexes.length - minimumTreeLevels)
            : anotherValueParentNodeIndexes.splice(0, anotherValueParentNodeIndexes.length - minimumTreeLevels);
        }

        let lowestCommonAncestorIndex = 0;

        for (let parentIndex = 0; parentIndex < valueParentNodeIndexes.length; parentIndex++) {
            if (valueParentNodeIndexes[parentIndex] === anotherValueParentNodeIndexes[parentIndex]) {
                lowestCommonAncestorIndex = valueParentNodeIndexes[parentIndex];
                break;
            }
        }
        
        return this.findAtIndex(lowestCommonAncestorIndex);
    }

    findNodeParentIndexes(nodeIndex) {
        const parentIndexes = [];

        let currentValueIndex = nodeIndex;
        
        while(currentValueIndex > 0) {
            const valueIndexEven = currentValueIndex % 2 === 0 ? true : false;
            const parentIndex = valueIndexEven ? (currentValueIndex - 2) / 2 : (currentValueIndex - 1) / 2;
            parentIndexes.push(parentIndex);
            currentValueIndex = parentIndex;
        }

        return parentIndexes;
    }

}

var tree = new BinarySearchTree()
tree.insert(10)
tree.insert(15)
tree.insert(20)
tree.insert(6)
tree.insert(3)
tree.insert(8)
tree.insert(7)
tree.insert(2)
tree.insert(100)
tree.insert(9);
tree.insert(150);
tree.insert(90)
tree.insert(17)
tree.insert(19)


console.log(tree.lowestCommonAncestor(19, 90));
