class FrequencyNode {
  right: FrequencyNode | null;
  left: FrequencyNode | null;
  
  character: string | null;
  frequency: number;

  constructor(frequency: number, character: string | null) {
    this.right = null;
    this.left = null;
    this.frequency = frequency;
    this.character = character;
  }
}

class HuffmanTree {
  private head: FrequencyNode;

  private codeToCharacterMap: Map<string, string> = new Map();
  
  private encodedText: string;

  private encodedTextBitLength: number;
  private decodedTextBitLength: number;

  constructor(text: string) {
    this.encode(text);
    this.decodedTextBitLength = text.length * 8;
    this.encodedTextBitLength = this.encodedText.length;
  }

  private encode(text: string) {
    const characterCount: Map<string, number> = new Map();

    // count characters
    for (let letter of text) {
      const letterCount = characterCount.get(letter);

      if (!letterCount) {
        characterCount.set(letter, 1)
      } else {
        characterCount.set(letter, letterCount + 1);
      }

    }
    let nodeFrequencyQueue: FrequencyNode[] = [];

    for (const [character, characterFrequency] of Array.from(characterCount.entries())) {
      nodeFrequencyQueue.push(new FrequencyNode(characterFrequency, character));
    }

    // create tree
    nodeFrequencyQueue = nodeFrequencyQueue.sort((a, b) => a.frequency > b.frequency ? -1 : 1);

    while(nodeFrequencyQueue.length) {
      const smallestFrequencyNode = nodeFrequencyQueue.pop();
      const anotherSmallestFrequencyNode = nodeFrequencyQueue.pop();

      if (smallestFrequencyNode && anotherSmallestFrequencyNode) {
        const joinedFrequencyNode = new FrequencyNode(smallestFrequencyNode!.frequency + anotherSmallestFrequencyNode!.frequency, null);
        joinedFrequencyNode.right = anotherSmallestFrequencyNode;
        joinedFrequencyNode.left = smallestFrequencyNode;
        nodeFrequencyQueue.push(joinedFrequencyNode);
        nodeFrequencyQueue.sort((a, b) => a.frequency > b.frequency ? -1 : 1);
      }

      if (smallestFrequencyNode && !anotherSmallestFrequencyNode) {
        this.head = smallestFrequencyNode;
      }

    }

    // create letter to code map
    const codeToCharacterMappingQueue: [string, FrequencyNode][] = [['', this.head]];
    const characterToCodeMap: Map<string, string> = new Map();

    while(codeToCharacterMappingQueue.length) {
      const [code, frequencyNode] = codeToCharacterMappingQueue.pop()!;

      if (frequencyNode.left) {
        const nodeCode = code + '0';
        codeToCharacterMappingQueue.push([nodeCode, frequencyNode.left]);
        if (frequencyNode.left.character) {
          this.codeToCharacterMap.set(nodeCode, frequencyNode.left.character);
          characterToCodeMap.set(frequencyNode.left.character, nodeCode);
        }
      }

      if (frequencyNode.right) {
        const nodeCode = code + '1';
        codeToCharacterMappingQueue.push([nodeCode, frequencyNode.right]);
        if (frequencyNode.right.character) {
          this.codeToCharacterMap.set(nodeCode, frequencyNode.right.character);
          characterToCodeMap.set(frequencyNode.right.character, nodeCode);
        }
      }
    }

    // encode the string

    let encodedText: string = '';

    for (const letter of text) {
      const currentCodeEncoding = characterToCodeMap.get(letter);
      if (currentCodeEncoding) {
        encodedText += currentCodeEncoding;
      }
    }

    this.encodedText = encodedText;
  }

  decode() {
    let currentCode: string = '';
    let decodedText: string = '';

    for (const letter of this.encodedText) {
      currentCode += letter;
      const currentCodeDecoded = this.codeToCharacterMap.get(currentCode);

      if (currentCodeDecoded) {
        decodedText += currentCodeDecoded;
        currentCode = '';
      }
    }

    return decodedText;
  }

  compressionEfficiency() {
    return Math.floor(((this.decodedTextBitLength - this.encodedTextBitLength) / this.decodedTextBitLength) * 100);
  }
}

const huffmanTree = new HuffmanTree('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
console.log(huffmanTree.decode());
console.log(huffmanTree.compressionEfficiency())