var FrequencyNode = /** @class */ (function () {
    function FrequencyNode(frequency, character) {
        this.right = null;
        this.left = null;
        this.frequency = frequency;
        this.character = character;
    }
    return FrequencyNode;
}());
var HuffmanTree = /** @class */ (function () {
    function HuffmanTree(text) {
        this.codeToCharacterMap = new Map();
        this.encode(text);
        this.decodedTextBitLength = text.length * 8;
        this.encodedTextBitLength = this.encodedText.length;
    }
    HuffmanTree.prototype.encode = function (text) {
        var characterCount = new Map();
        // count characters
        for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
            var letter = text_1[_i];
            var letterCount = characterCount.get(letter);
            if (!letterCount) {
                characterCount.set(letter, 1);
            }
            else {
                characterCount.set(letter, letterCount + 1);
            }
        }
        var nodeFrequencyQueue = [];
        for (var _a = 0, _b = Array.from(characterCount.entries()); _a < _b.length; _a++) {
            var _c = _b[_a], character = _c[0], characterFrequency = _c[1];
            nodeFrequencyQueue.push(new FrequencyNode(characterFrequency, character));
        }
        // create tree
        nodeFrequencyQueue = nodeFrequencyQueue.sort(function (a, b) { return a.frequency > b.frequency ? -1 : 1; });
        while (nodeFrequencyQueue.length) {
            var smallestFrequencyNode = nodeFrequencyQueue.pop();
            var anotherSmallestFrequencyNode = nodeFrequencyQueue.pop();
            if (smallestFrequencyNode && anotherSmallestFrequencyNode) {
                var joinedFrequencyNode = new FrequencyNode(smallestFrequencyNode.frequency + anotherSmallestFrequencyNode.frequency, null);
                joinedFrequencyNode.right = anotherSmallestFrequencyNode;
                joinedFrequencyNode.left = smallestFrequencyNode;
                nodeFrequencyQueue.push(joinedFrequencyNode);
                nodeFrequencyQueue.sort(function (a, b) { return a.frequency > b.frequency ? -1 : 1; });
            }
            if (smallestFrequencyNode && !anotherSmallestFrequencyNode) {
                this.head = smallestFrequencyNode;
            }
        }
        // create letter to code map
        var codeToCharacterMappingQueue = [['', this.head]];
        var characterToCodeMap = new Map();
        while (codeToCharacterMappingQueue.length) {
            var _d = codeToCharacterMappingQueue.pop(), code = _d[0], frequencyNode = _d[1];
            if (frequencyNode.left) {
                var nodeCode = code + '0';
                codeToCharacterMappingQueue.push([nodeCode, frequencyNode.left]);
                if (frequencyNode.left.character) {
                    this.codeToCharacterMap.set(nodeCode, frequencyNode.left.character);
                    characterToCodeMap.set(frequencyNode.left.character, nodeCode);
                }
            }
            if (frequencyNode.right) {
                var nodeCode = code + '1';
                codeToCharacterMappingQueue.push([nodeCode, frequencyNode.right]);
                if (frequencyNode.right.character) {
                    this.codeToCharacterMap.set(nodeCode, frequencyNode.right.character);
                    characterToCodeMap.set(frequencyNode.right.character, nodeCode);
                }
            }
        }
        // encode the string
        var encodedText = '';
        for (var _e = 0, text_2 = text; _e < text_2.length; _e++) {
            var letter = text_2[_e];
            var currentCodeEncoding = characterToCodeMap.get(letter);
            if (currentCodeEncoding) {
                encodedText += currentCodeEncoding;
            }
        }
        this.encodedText = encodedText;
    };
    HuffmanTree.prototype.decode = function () {
        var currentCode = '';
        var decodedText = '';
        for (var _i = 0, _a = this.encodedText; _i < _a.length; _i++) {
            var letter = _a[_i];
            currentCode += letter;
            var currentCodeDecoded = this.codeToCharacterMap.get(currentCode);
            if (currentCodeDecoded) {
                decodedText += currentCodeDecoded;
                currentCode = '';
            }
        }
        return decodedText;
    };
    HuffmanTree.prototype.compressionEfficiency = function () {
        return Math.floor(((this.decodedTextBitLength - this.encodedTextBitLength) / this.decodedTextBitLength) * 100);
    };
    return HuffmanTree;
}());
var huffmanTree = new HuffmanTree('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
console.log(huffmanTree.decode());
console.log(huffmanTree.compressionEfficiency());
