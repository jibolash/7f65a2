import { useCallback, useEffect, useState } from "react";
import "./App.css";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import DAG from "./DAG";
import CustomForm from "./CustomForm";

interface NodePosition {
  x: number;
  y: number;
}

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [dag, setDAG] = useState(null);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => {
        return response.json();
      })
      .then((graph) => {
        const formatNodes = graph.nodes.map(
          (node: {
            data: { name: string };
            id: string;
            position: NodePosition;
          }) => ({
            data: {
              label: node.data.name,
            },
            id: node.id,
            position: node.position,
            formFields: {
              dynamic_checkbox_group: null,
              dynamic_object: null,
              email: "",
            },
          })
        );
        setNodes(formatNodes);
        const formatEdges = graph.edges.map((node, index: number) => ({
          id: index,
          source: node.source,
          target: node.target,
          // type: "step",
        }));
        setEdges(formatEdges);

        const dagObj = new DAG(formatNodes, formatEdges);
        setDAG(dagObj.adjacencyList);
        // dag.printGraph();
      });
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const defaultViewport = { x: -400, y: 0, zoom: 1 };

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          defaultViewport={defaultViewport}
        >
          <Background />
        </ReactFlow>
        {selectedNode && (
          <CustomForm
            selectedNode={selectedNode}
            dag={dag}
            nodes={nodes}
            setSelectedNode={setSelectedNode}
            setNodes={setNodes}
          />
        )}
      </div>
    </>
  );
}

export default App;
