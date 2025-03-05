export function findAncestors(graph, target) {
  const reverseGraph = {};

  for (const node in graph) {
    for (const neighbor of graph[node]) {
      if (!reverseGraph[neighbor]) reverseGraph[neighbor] = [];
      reverseGraph[neighbor].push(node);
    }
  }

  const ancestors = new Set();

  function dfs(node) {
    for (const parent of reverseGraph[node] || []) {
      if (!ancestors.has(parent)) {
        ancestors.add(parent);
        dfs(parent);
      }
    }
  }

  dfs(target);
  return Array.from(ancestors);
}
