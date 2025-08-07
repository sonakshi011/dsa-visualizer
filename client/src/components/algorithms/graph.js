export class Graph {
  constructor() {
    this.adjList = {};
  }

  addVertex(vertex) {
    if (!this.adjList[vertex]) this.adjList[vertex] = [];
  }

  addEdge(v1, v2) {
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjList[v1].push(v2);
    this.adjList[v2].push(v1);
  }

  getGraph() {
    return this.adjList;
  }
}
