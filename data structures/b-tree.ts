class BtreeNode<T> {

  keys: T[] = [];
  subtrees: BtreeNode<T>[] = [];

  constructor(keys? : T[], subtrees?: BtreeNode<T>[]) {
    if (keys) {
      this.keys = keys;
    }

    if (subtrees) {
      this.subtrees = subtrees;
    }
  }

  addIndexEntry(key: T): number {
    let insertIndex = 0;
    let currentIndexesLength = this.keys.length;

    if (currentIndexesLength === 0) {
      this.subtrees.push(new BtreeNode<T>());
    }

    for (let i = 0; i < currentIndexesLength; i++) {
      const currentKey = this.keys[i];

      if (currentKey < key) {
        insertIndex++;
        continue;
      } else {
        insertIndex = i;
        break;
      }
    }

    this.keys.splice(insertIndex, 0, key);
    this.subtrees.splice(insertIndex + 1, 0, new BtreeNode<T>());

    return insertIndex;
  }

  setSubtree(index: number, subTree: BtreeNode<T>) {
    this.subtrees[index] = subTree;
  }
}

interface SplitOverflownNode<T> {
  middleKeyIndex: number;
  smallerKeysNode: BtreeNode<T>;
  biggerKeysNode: BtreeNode<T>;
}

class BTree<T> {

  private root: BtreeNode<T> = new BtreeNode<T>();

  private readonly order: number;

  private readonly minIndexEntries: number;
  private readonly maxIndexEntries: number;

  private height: number = 0;

  constructor(order: number) {
    if (order <= 2) {
      throw new Error('Order of b-tree must be greater than 2 for it to be efficient')
    }
    this.order = order;
    this.maxIndexEntries = order - 1;
    this.minIndexEntries = Math.ceil(order / 2) - 1;
  }

  search(key: T): BtreeNode<T> | null {
    let currentNode = this.root;
    let currentHeight = 0;

    while (currentHeight !== this.height) {
      let currentNodeKeysLength = currentNode.keys.length;

      if (currentNodeKeysLength === 0) {
        return null;
      }
      
      currentNode = this.traverse(currentNode, key);
      currentHeight++;
    }

    return currentNode;
  }

  insert(key: T) {
    let currentNode = this.root;
    let currentHeight = 0;

    const searchPathNodesVisited: BtreeNode<T>[] = [];

    while(currentHeight !== this.height) {
      let nextNode = this.traverse(currentNode, key);
      searchPathNodesVisited.push(currentNode);
      currentNode = nextNode;
      currentHeight++;
    }
    searchPathNodesVisited.push(currentNode);

    const currentNodeKeysLength = currentNode.keys.length;

    if (currentNodeKeysLength < this.maxIndexEntries) {
      currentNode.addIndexEntry(key);
      return key;
    } else {
      currentNode.addIndexEntry(key);

      let searchPathNodeVisited = searchPathNodesVisited.pop()!;

      while (searchPathNodeVisited && searchPathNodeVisited.keys.length > this.maxIndexEntries) {
        if (searchPathNodesVisited.length) {
          this.handleOverflow(searchPathNodeVisited, searchPathNodesVisited[searchPathNodesVisited.length - 1]);
        } else {
          this.root = new BtreeNode();
          this.handleOverflow(searchPathNodeVisited, this.root);
          this.height++;
          break;
        }
        searchPathNodeVisited = searchPathNodesVisited.pop()!;
      }

    }

    return key;
  }

  private traverse(node: BtreeNode<T>, key: T): BtreeNode<T> {

    let currentNode = node;
    const currentNodeKeysSize = currentNode.keys.length;

    for (var i = 0; i < currentNodeKeysSize; i++) {
      const currentKey = currentNode.keys[i];

      if (currentKey === key) {
        return currentNode;
      }

      if (this.isKeyGreater(currentKey, key)) {
        currentNode = currentNode.subtrees[i];
        return currentNode;
      }
      
    }

    currentNode = currentNode.subtrees[currentNodeKeysSize];

    return currentNode;    
  }

  private isKeyGreater(key: T, anotherKey: T): boolean {
    if (typeof key === 'number' && typeof anotherKey === 'number') {
      return key > anotherKey;
    }

    if (typeof key === 'string' && typeof anotherKey === 'string') {
      return this.isStringGreater(key, anotherKey);
    }

    throw new Error('Invalid type for comparison!');
  }

  // TODO: think of lower/upper case priority
  private isStringGreater(text: string, anotherText: string): boolean {
    const textLength = text.length;
    const anotherTextLength = anotherText.length;

    for (let letterIndex = 0; letterIndex < Math.min(textLength, anotherTextLength); letterIndex++) {
      const textLetterValue = text[letterIndex].charCodeAt(0);
      const anotherTextLetterValue = anotherText[letterIndex].charCodeAt(0);

      if (textLetterValue === anotherTextLetterValue) {
        continue;
      }

      if (textLetterValue > anotherTextLetterValue) {
        return true;
      } else {
        return false;
      }
      
    }

    return textLength < anotherTextLength;
  }

  private handleOverflow(overflownNode: BtreeNode<T>, parentNode: BtreeNode<T>) {
    const splitNode = this.splitNode(overflownNode);

    const parentNodeInsertedIndex = parentNode.addIndexEntry(overflownNode.keys[splitNode.middleKeyIndex]);
    parentNode.setSubtree(parentNodeInsertedIndex, splitNode.smallerKeysNode);
    parentNode.setSubtree(parentNodeInsertedIndex + 1, splitNode.biggerKeysNode);

  }

  private splitNode(overflownNode: BtreeNode<T>): SplitOverflownNode<T> {
    const middleKeyIndex = Math.ceil((overflownNode.keys.length / 2) - 1);

    const smallerNodeKeys = overflownNode.keys.slice(0, middleKeyIndex);
    const smallerNodeSubtrees = overflownNode.subtrees.slice(0, middleKeyIndex + 1);

    const biggerNodeKeys = overflownNode.keys.slice(middleKeyIndex + 1);
    const biggerNodeSubtrees = overflownNode.subtrees.slice(middleKeyIndex + 1);

    return {
      middleKeyIndex,
      smallerKeysNode: new BtreeNode<T>(smallerNodeKeys, smallerNodeSubtrees),
      biggerKeysNode: new BtreeNode<T>(biggerNodeKeys, biggerNodeSubtrees),
    };
  }
}

const numberBtree = new BTree<number>(5);
numberBtree.insert(5);
numberBtree.insert(8);
numberBtree.insert(1);
numberBtree.insert(3);
numberBtree.insert(7);
numberBtree.insert(6);
numberBtree.insert(4);
numberBtree.insert(2);
numberBtree.insert(15);
numberBtree.insert(21);
numberBtree.insert(17);
numberBtree.insert(36);
numberBtree.insert(48);
numberBtree.insert(9);
numberBtree.insert(41);
numberBtree.insert(16);
numberBtree.insert(18);
numberBtree.insert(92);
numberBtree.insert(87);
numberBtree.insert(74);

const letterTree = new BTree<string>(5);
letterTree.insert('A');
letterTree.insert('B');
letterTree.insert('C');
letterTree.insert('D');
letterTree.insert('E');
letterTree.insert('F');
letterTree.insert('G');
letterTree.insert('H');
letterTree.insert('I');
letterTree.insert('J');
letterTree.insert('K');
letterTree.insert('L');
letterTree.insert('M');
letterTree.insert('N');
letterTree.insert('O');
letterTree.insert('P');
letterTree.insert('Q');
letterTree.insert('R');