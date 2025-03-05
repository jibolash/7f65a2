class DAG {
  constructor(nodes, edges) {
    this.adjacencyList = new Map();
    this.buildGraph(nodes, edges);
  }

  buildGraph(nodes, edges) {
    // Initialize adjacency list with empty arrays
    nodes.forEach((node) => {
      this.adjacencyList.set(node.id, []);
    });

    // Add edges
    edges.forEach((edge) => {
      if (
        this.adjacencyList.has(edge.source) &&
        this.adjacencyList.has(edge.target)
      ) {
        this.adjacencyList.get(edge.source).push(edge.target);
      } else {
        console.error(`Invalid edge: ${edge.source} -> ${edge.target}`);
      }
    });
  }

  // Print the graph
  printGraph() {
    for (let [node, neighbors] of this.adjacencyList) {
      console.log(`${node} -> ${neighbors.join(", ")}`);
    }
  }
}

export default DAG;
