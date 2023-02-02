class Graph {
  // directed, weighted, acyclic graph
  constructor(){
      this.vertexPathsMap = {}
  }

  addVertex(name){
      if (!this.vertexPathsMap[name]){
          this.vertexPathsMap[name] = {}
      }
  }

  addEdge(startingVertex, endingVertex, weight){
      if (this.vertexPathsMap[startingVertex] && this.vertexPathsMap[endingVertex]){
        if (this.vertexPathsMap[endingVertex][startingVertex] !== undefined) {
          // Cycle cannot be created
          return
        }
        this.vertexPathsMap[startingVertex][endingVertex] = weight
      }
  }

  findShortestPath(startingVertex, endingVertex) {
    if (!this.vertexPathsMap[startingVertex] || !this.vertexPathsMap[endingVertex]) {
      throw new Error('Invalid vertex provided');
    }

    let currentVertex = startingVertex;
    let currentVertexCost = 0;

    const queue = [currentVertex];
    let path = [];
    const routeCost = {};
    const routeParent = {};

    routeCost[startingVertex] = currentVertexCost;

    while (queue.length) {
      currentVertex = queue.shift();
      currentVertexCost = routeCost[currentVertex];

      for (const [possibleRoute, possibleRouteCost] of Object.entries(this.vertexPathsMap[currentVertex])) {
        if (!routeCost[possibleRoute] || (routeCost[possibleRoute] > (possibleRouteCost + currentVertexCost))) {
          routeCost[possibleRoute] = possibleRouteCost + currentVertexCost;
          routeParent[possibleRoute] = currentVertex;
          // check if needed when only updating cost with lower value
          queue.push(possibleRoute);
        } 
        
      }
    }
    
    while (currentVertex !== startingVertex) {
      path.push(routeParent[currentVertex])
      currentVertex = routeParent[currentVertex]
    }

    path = path.reverse()
    path.push(endingVertex)

    return path
  }
  
}

var graph = new Graph()

graph.addVertex('Book')
graph.addVertex('Poster')
graph.addVertex('CD')
graph.addVertex('Drums')
graph.addVertex('Gitar')
graph.addVertex('Piano')

graph.addEdge('Book', 'CD', 5)
graph.addEdge('Book', 'Poster', 0)
graph.addEdge('Poster', 'Book', 0)
graph.addEdge('CD', 'Drums', 20)
graph.addEdge('CD', 'Gitar', 15)
graph.addEdge('Poster', 'Gitar', 30)
graph.addEdge('Poster', 'Drums', 35)
graph.addEdge('Gitar', 'Piano', 20)
graph.addEdge('Drums', 'Piano', 10)

console.log(graph.findShortestPath('Book', 'Piano'))
