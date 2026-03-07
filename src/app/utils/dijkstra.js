// Simple Dijkstra's algorithm implementation for a graph represented as { nodes: {id: {x, y}}, edges: {id: [{to, weight}] } }
export function findShortestPath(graph, startId, endId) {
    const distances = {};
    const previous = {};
    const visited = new Set();
    const queue = new Set(Object.keys(graph.nodes));

    // Initialize distances
    for (const node of queue) {
        distances[node] = node === startId ? 0 : Infinity;
        previous[node] = null;
    }

    while (queue.size > 0) {
        // Get node with smallest distance
        let current = null;
        let minDist = Infinity;
        for (const node of queue) {
            if (distances[node] < minDist) {
                minDist = distances[node];
                current = node;
            }
        }
        if (current === null) break;
        if (current === endId) break;
        queue.delete(current);
        visited.add(current);
        const neighbors = graph.edges[current] || [];
        for (const { to, weight } of neighbors) {
            if (visited.has(to)) continue;
            const alt = distances[current] + weight;
            if (alt < distances[to]) {
                distances[to] = alt;
                previous[to] = current;
            }
        }
    }

    // Reconstruct path
    const path = [];
    let u = endId;
    if (previous[u] !== null || u === startId) {
        while (u) {
            const node = graph.nodes[u];
            if (node) path.unshift([node.x, node.y]);
            u = previous[u];
        }
    }
    return { distance: distances[endId], path };
}
