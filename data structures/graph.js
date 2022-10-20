class Graph {
    // undirected graph stored as an adjacency list

    constructor(){
        this.adjacencyList = {}
    }

    addVertex(name){
        if (!this.adjacencyList[name]){
            this.adjacencyList[name] = []
        }
    }

    addEdge(firstVertex, secondVertex){
        if (this.adjacencyList[firstVertex] && this.adjacencyList[secondVertex]){
            this.adjacencyList[firstVertex].push(secondVertex)
            this.adjacencyList[secondVertex].push(firstVertex)
        }
    }

    removeEdge(firstVertex, secondVertex){
        if (this.adjacencyList[firstVertex] && this.adjacencyList[secondVertex]){
            var firstIndex, secondIndex

            firstIndex = this.adjacencyList[firstVertex].indexOf(secondVertex)
            secondIndex = this.adjacencyList[secondVertex].indexOf(firstVertex)

            if (firstIndex > -1 && secondIndex > -1){
                this.adjacencyList[firstVertex].splice(firstIndex, 1)
                this.adjacencyList[secondVertex].splice(secondIndex, 1)    
            }
            
        }
    }

    removeVertex(vertex){
        if (!this.adjacencyList[vertex]) return undefined

        while(this.adjacencyList[vertex].length){
            let adjacentVertex = this.adjacencyList[vertex][0]
            this.removeEdge(vertex, adjacentVertex)
        }

        delete this.adjacencyList[vertex]
    }

    dfs_recursive(startVertex){
        const traverseList = []
        const visited = {}
        const adjacencyList = this.adjacencyList
        
        function dfs(vertex){
            if (!vertex) return null
            traverseList.push(vertex)
            visited[vertex] = true

            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]){
                    return dfs(neighbor)
                }
            })
        }

        dfs(startVertex)

        return traverseList                           
    }

    dfs_iterative(startVertex){
        var traverseList = []
        var visited = {}
        var results = []
        var currentVertex

        visited[startVertex] = true
        traverseList.push(startVertex)

        while (traverseList.length != 0){
            var currentVertex = traverseList.pop()
            results.push(currentVertex)
 
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]){
                    visited[neighbor] = true
                    traverseList.push(neighbor)
                }
            })
            
        }
        return results
    }

    bfs(startVertex){
        var results = []
        var queue = []
        var visited = {}
        var currentVertex

        queue.push(startVertex)
        visited[startVertex] = true

        while(queue.length){
            currentVertex = queue.shift()
            results.push(currentVertex)

            this.adjacencyList[currentVertex].forEach(neighbour => {
                if (!visited[neighbour]){
                    visited[neighbour] = true
                    queue.push(neighbour)
                }
            })

        }

        return results

    }

    
    
}

var graph = new Graph()

graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')
graph.addVertex('F')

graph.addEdge("A", "B")
graph.addEdge("A", "C")
graph.addEdge("B", "D")
graph.addEdge("C", "E")
graph.addEdge("D", "E")
graph.addEdge("D", "F")
graph.addEdge("E", "F")
console.log(graph)
console.log(graph.dfs_recursive("A"))
console.log(graph.dfs_iterative("A"))
console.log(graph.bfs("A"))