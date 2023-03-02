class TrieNode {
  children: Map<string, TrieNode> = new Map<string, TrieNode>([]);
  parent: TrieNode | null;
  // signifies if given node completes one of the inserted words
  completesWord: boolean;

  constructor(parent: TrieNode | null = null, completesWord: boolean = false) {
    this.parent = parent;
    this.completesWord = completesWord;
  }
}

class TrieNodeChild {
  // currently formed word
  word: string;
  node: TrieNode;

  constructor(word: string, node: TrieNode) {
    this.word = word;
    this.node = node;
  }
}

class PrefixTrie {
  private head: TrieNode;

  constructor() {
    this.head = new TrieNode()
    this.head.parent = null;
  }

  insert(prefix: string) {
    if (!prefix.length) {
      return;
    }

    let currentNode: TrieNode = this.head;

    for (let i = 0; i < prefix.length; i++) {
      const prefixElement = prefix[i];

      let nextNode = currentNode.children.get(prefixElement);
      if (!nextNode) {
        nextNode = new TrieNode(currentNode);
        currentNode.children.set(prefixElement, nextNode);
      }

      currentNode = nextNode;

    }

    currentNode.completesWord = true;

    return currentNode;
  }

  search(prefix: string): string[] {
    if (!prefix.length) {
      return [];
    }

    let currentNode: TrieNode = this.head;

    for (let i = 0; i < prefix.length; i++) {
      const prefixElement = prefix[i];

      let nextNode = currentNode.children.get(prefixElement);
      if (!nextNode) {
        return [];
      }

      currentNode = nextNode;

    }

    const wordsWithPrefix: string[] = [];

    const queue: TrieNodeChild[] = [];
    if (currentNode.children.size) {
      const currentLevelChildren = this.traverseChildren(currentNode, prefix);
      queue.push(...currentLevelChildren);
    }
    

    while(queue.length) {
      const triePrefixExtensionNode = queue.pop();
      if (!triePrefixExtensionNode) {
        break;
      }

      let currentWord = triePrefixExtensionNode.word;
      currentNode = triePrefixExtensionNode.node;

      if (currentNode.children.size) {
        if (currentNode.completesWord) {
          wordsWithPrefix.push(currentWord);
        }

        const currentLevelChildren = this.traverseChildren(currentNode, currentWord);
        queue.push(...currentLevelChildren);
      } else {
        wordsWithPrefix.push(currentWord);
      }

    }


    return wordsWithPrefix;
  }

  private traverseChildren(node: TrieNode, currentPrefix: string): TrieNodeChild[] {
    const childrenNodes: TrieNodeChild[] = [];

    for (let [key, value] of Array.from(node.children.entries())) {
      childrenNodes.push(new TrieNodeChild(currentPrefix + key, value));
    }

    return childrenNodes;
  }

  includes(prefix: string): boolean {
    if (!prefix.length) {
      return false;
    }

    let currentNode: TrieNode = this.head;

    for (let i = 0; i < prefix.length; i++) {
      const prefixElement = prefix[i];

      let nextNode = currentNode.children.get(prefixElement);
      if (!nextNode) {
        return false;
      }

      currentNode = nextNode;

    }

    return true;
  }

  // searches for the longest substring of a prefix that by default also is a complete word
  findSubstringOf(prefix: string, complete: boolean = true): string {
    if (!prefix.length) {
        return '';
    }

    let currentNode: TrieNode = this.head;
    let trieDepth: number = 0;
    let substring: string = ''

    for (let i = 0; i < prefix.length; i++) {
        const prefixElement = prefix[i];

        let nextNode = currentNode.children.get(prefixElement);
        if (!nextNode) {
            if (trieDepth > 0 && currentNode.children.size === 0) {
                return substring;
            } else {
                return complete ? '' : substring;
            }
        }

        currentNode = nextNode;
        trieDepth += 1;
        substring += prefixElement;
    }
    
    return '';
  }
}

const prefixTrie = new PrefixTrie();
prefixTrie.insert('potato')
prefixTrie.insert('tom');
prefixTrie.insert('tomato');
prefixTrie.insert('tomali');
prefixTrie.insert('tomas');
console.log(prefixTrie.includes('tomato'));
console.log(prefixTrie.includes('to'));
console.log(prefixTrie.findSubstringOf('tomatoes'))
console.log(prefixTrie.search('to'));
