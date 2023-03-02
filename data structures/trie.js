var TrieNode = /** @class */ (function () {
    function TrieNode() {
        this.children = new Map([]);
    }
    return TrieNode;
}());
var TrieNodeChild = /** @class */ (function () {
    function TrieNodeChild(word, node) {
        this.word = word;
        this.node = node;
    }
    return TrieNodeChild;
}());
var PrefixTrie = /** @class */ (function () {
    function PrefixTrie() {
        this.head = new TrieNode();
        this.head.parent = null;
    }
    PrefixTrie.prototype.insert = function (prefix) {
        if (!prefix.length) {
            return;
        }
        var currentNode = this.head;
        for (var i = 0; i < prefix.length; i++) {
            var prefixElement = prefix[i];
            var nextNode = currentNode.children.get(prefixElement);
            if (!nextNode) {
                nextNode = new TrieNode();
                nextNode.parent = currentNode;
                nextNode.completesWord = false;
                currentNode.children.set(prefixElement, nextNode);
            }
            currentNode = nextNode;
        }
        currentNode.completesWord = true;
        return currentNode;
    };
    PrefixTrie.prototype.search = function (prefix) {
        if (!prefix.length) {
            return [];
        }
        var currentNode = this.head;
        for (var i = 0; i < prefix.length; i++) {
            var prefixElement = prefix[i];
            var nextNode = currentNode.children.get(prefixElement);
            if (!nextNode) {
                return [];
            }
            currentNode = nextNode;
        }
        var wordsWithPrefix = [];
        var queue = [];
        if (currentNode.children.size) {
            var currentLevelChildren = this.traverseChildren(currentNode, prefix);
            queue.push.apply(queue, currentLevelChildren);
        }
        while (queue.length) {
            var triePrefixExtensionNode = queue.pop();
            if (!triePrefixExtensionNode) {
                break;
            }
            var currentWord = triePrefixExtensionNode.word;
            currentNode = triePrefixExtensionNode.node;
            if (currentNode.children.size) {
                if (currentNode.completesWord) {
                    wordsWithPrefix.push(currentWord);
                }
                var currentLevelChildren = this.traverseChildren(currentNode, currentWord);
                queue.push.apply(queue, currentLevelChildren);
            }
            else {
                wordsWithPrefix.push(currentWord);
            }
        }
        return wordsWithPrefix;
    };
    PrefixTrie.prototype.traverseChildren = function (node, currentPrefix) {
        var childrenNodes = [];
        for (var _i = 0, _a = Array.from(node.children.entries()); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            childrenNodes.push(new TrieNodeChild(currentPrefix + key, value));
        }
        return childrenNodes;
    };
    PrefixTrie.prototype.includes = function (prefix) {
        if (!prefix.length) {
            return false;
        }
        var currentNode = this.head;
        for (var i = 0; i < prefix.length; i++) {
            var prefixElement = prefix[i];
            var nextNode = currentNode.children.get(prefixElement);
            if (!nextNode) {
                return false;
            }
            currentNode = nextNode;
        }
        return true;
    };
    PrefixTrie.prototype.findSubstringOf = function (prefix, complete) {
        if (complete === void 0) { complete = true; }
        if (!prefix.length) {
            return '';
        }
        var currentNode = this.head;
        var trieDepth = 0;
        var substring = '';
        for (var i = 0; i < prefix.length; i++) {
            var prefixElement = prefix[i];
            var nextNode = currentNode.children.get(prefixElement);
            if (!nextNode) {
                if (trieDepth > 0 && currentNode.children.size === 0) {
                    return substring;
                }
                else {
                    return complete ? '' : substring;
                }
            }
            currentNode = nextNode;
            trieDepth += 1;
            substring += prefixElement;
        }
        return '';
    };
    return PrefixTrie;
}());
var prefixTrie = new PrefixTrie();
prefixTrie.insert('potato');
prefixTrie.insert('tom');
prefixTrie.insert('tomato');
prefixTrie.insert('tomali');
prefixTrie.insert('tomas');
console.log(prefixTrie.includes('tomato'));
console.log(prefixTrie.includes('to'));
console.log(prefixTrie.findSubstringOf('potatoes'));
console.log(prefixTrie.search('to'));
