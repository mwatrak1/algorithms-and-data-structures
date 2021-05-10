class HashTable {
    constructor(size=53){
        this.keyMap = new Array(size)
    }

    _hash(key){
        let total = 0
        let PRIME_NUMBER = 31

        for (let i = 0; i < Math.min(key.length, 100); i ++){
            let char = key[i]
            let value = char.charCodeAt(0) - 96
            total = ( total * PRIME_NUMBER + value ) % this.keyMap.length
        }
        return total
    }

    set(key, value){
        let hash = this._hash(key)

        if (this.keyMap[hash] === undefined){
            this.keyMap[hash] = []
        }

        if (this.keyMap[hash].length > 0){
            let foundElem = this.keyMap[hash].find( (el) => { return el[0] === key })
            if (foundElem) foundElem[1] = value
            return value
        }
        
        this.keyMap[hash].push( [ key, value ] )
        
        return value
    }

    get(key){
        let hash = this._hash(key)
        
        if (this.keyMap[hash]){
            for (let i = 0; i < this.keyMap.length; i++){
                if ( this.keyMap[hash][i][0] === key ){
                    return this.keyMap[hash][i][1]
                }
            }
        }

        return undefined
    }

    keys(){
        let keysList = []

        for (let i = 0; i < this.keyMap.length; i++){
            if (this.keyMap[i]){
                for (let element of this.keyMap[i]){
                    keysList.push(element[0])
                }
            }
        }

        return keysList
    }

    values(){
        let valuesList = []

        for (let i = 0; i < this.keyMap.length; i++){
            if (this.keyMap[i]){
                for (let element of this.keyMap[i]){
                    valuesList.push(element[1])
                }
            }
        }

        return valuesList
    }

}