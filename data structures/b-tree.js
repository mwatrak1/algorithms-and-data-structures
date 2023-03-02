var BtreeNode = /** @class */ (function () {
    function BtreeNode(keys, subtrees) {
        this.keys = [];
        this.subtrees = [];
        if (keys) {
            this.keys = keys;
        }
        if (subtrees) {
            this.subtrees = subtrees;
        }
    }
    BtreeNode.prototype.addIndexEntry = function (key) {
        var insertIndex = 0;
        var currentIndexesLength = this.keys.length;
        if (currentIndexesLength === 0) {
            this.subtrees.push(new BtreeNode());
        }
        for (var i = 0; i < currentIndexesLength; i++) {
            var currentKey = this.keys[i];
            if (currentKey < key) {
                insertIndex++;
                continue;
            }
            else {
                insertIndex = i;
                break;
            }
        }
        this.keys.splice(insertIndex, 0, key);
        this.subtrees.splice(insertIndex + 1, 0, new BtreeNode());
        return insertIndex;
    };
    BtreeNode.prototype.setSubtree = function (index, subTree) {
        this.subtrees[index] = subTree;
    };
    return BtreeNode;
}());
var SplitOverflownNode = /** @class */ (function () {
    function SplitOverflownNode() {
    }
    return SplitOverflownNode;
}());
var BTree = /** @class */ (function () {
    function BTree(order) {
        this.root = new BtreeNode();
        this.height = 0;
        if (order <= 2) {
            // order of b-tree must be greater than 2 for it to be efficient
            order = 3;
        }
        this.order = order;
        this.maxIndexEntries = order - 1;
        this.minIndexEntries = Math.ceil(order / 2) - 1;
    }
    BTree.prototype.search = function (key) {
        var currentNode = this.root;
        while (currentNode) {
            var currentNodeKeysLength = currentNode.keys.length;
            if (currentNodeKeysLength === 0) {
                return null;
            }
            currentNode = this.traverse(currentNode, key);
        }
        return null;
    };
    BTree.prototype.insert = function (key) {
        var currentNode = this.root;
        var currentHeight = 0;
        var searchPathNodesVisited = [];
        while (currentHeight !== this.height) {
            var nextNode = this.traverse(currentNode, key);
            searchPathNodesVisited.push(currentNode);
            if (key === 17) {
                console.log(currentNode, nextNode); // fsjafsmifsim
            }
            currentNode = nextNode;
            currentHeight++;
        }
        searchPathNodesVisited.push(currentNode);
        var currentNodeKeysLength = currentNode.keys.length;
        if (currentNodeKeysLength < this.maxIndexEntries) {
            currentNode.addIndexEntry(key);
            return key;
        }
        else {
            currentNode.addIndexEntry(key);
            var searchPathNodeVisited = searchPathNodesVisited.pop();
            while (searchPathNodeVisited && searchPathNodeVisited.keys.length > this.maxIndexEntries) {
                if (searchPathNodesVisited.length) {
                    this.handleOverflow(currentNode, searchPathNodesVisited[searchPathNodesVisited.length - 1]);
                }
                else {
                    this.root = new BtreeNode();
                    this.handleOverflow(currentNode, this.root);
                    this.height++;
                    break;
                }
                searchPathNodeVisited = searchPathNodesVisited.pop();
            }
        }
        return key;
    };
    BTree.prototype.traverse = function (node, key) {
        var currentNode = node;
        var currentNodeKeysSize = currentNode.keys.length;
        for (var i = 0; i < currentNodeKeysSize; i++) {
            var currentKey = currentNode.keys[i];
            if (currentKey === key) {
                return currentNode;
            }
            if (currentKey > key) {
                currentNode = currentNode.subtrees[i];
                break;
            }
            else {
                currentNode = currentNode.subtrees[i + 1];
            }
        }
        return currentNode;
    };
    BTree.prototype.handleOverflow = function (overflownNode, parentNode) {
        var splitNode = this.splitNode(overflownNode);
        var parentNodeInsertedIndex = parentNode.addIndexEntry(overflownNode.keys[splitNode.middleKeyIndex]);
        parentNode.setSubtree(parentNodeInsertedIndex, splitNode.smallerKeysNode);
        parentNode.setSubtree(parentNodeInsertedIndex + 1, splitNode.biggerKeysNode);
    };
    // TODO: move splitting
    BTree.prototype.splitNode = function (overflownNode) {
        var middleKeyIndex = Math.ceil((overflownNode.keys.length / 2) - 1);
        var smallerNodeKeys = overflownNode.keys.slice(0, middleKeyIndex);
        var smallerNodeSubtrees = overflownNode.subtrees.slice(0, middleKeyIndex + 1);
        var biggerNodeKeys = overflownNode.keys.slice(middleKeyIndex + 1);
        var biggerNodeSubtrees = overflownNode.subtrees.slice(middleKeyIndex + 1);
        return {
            middleKeyIndex: middleKeyIndex,
            smallerKeysNode: new BtreeNode(smallerNodeKeys, smallerNodeSubtrees),
            biggerKeysNode: new BtreeNode(biggerNodeKeys, biggerNodeSubtrees)
        };
    };
    return BTree;
}());
var btree = new BTree(5);
btree.insert(5);
btree.insert(8);
btree.insert(1);
btree.insert(3);
btree.insert(7);
btree.insert(6);
btree.insert(4);
btree.insert(2);
btree.insert(15);
btree.insert(21);
btree.insert(17);
btree.insert(36);
console.log(btree['root'], btree['root'].subtrees, btree['height']);
