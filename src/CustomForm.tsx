import React, { useEffect } from "react";
import { findAncestors } from "./utils";
import AvailableDataModal from "./AvailableDataModal";

export default function CustomForm({
  selectedNode,
  dag,
  nodes,
  setSelectedNode,
  setNodes,
}) {
  const [showAvailableData, setShowAvailableData] = React.useState(false);
  const [ancestors, setAncestors] = React.useState(null);

  function showOptions(node) {
    setShowAvailableData(true);
    const ancestorsData = findAncestors(Object.fromEntries(dag), node.id);
    setAncestors(ancestorsData);
  }

  function onClickAvailableDataField(node, fieldName) {
    const nodeCopy = selectedNode;
    nodeCopy.formFields[fieldName] = `${node.data.label}.${fieldName}`;
    setSelectedNode(nodeCopy);
  }

  function clearField(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fieldName
  ) {
    e.stopPropagation();
    console.log("nodes", nodes);
    const filteredNodes = nodes.filter((node) => node.id !== selectedNode.id);
    const nodeCopy = selectedNode;
    nodeCopy.formFields[fieldName] = "";
    setNodes([...filteredNodes, nodeCopy]);
    setSelectedNode(nodeCopy);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>Form Name: {selectedNode.data.label}</div>
      {Object.entries(selectedNode.formFields).map((item) => {
        const name = item[0];
        const val = item[1];
        return (
          <div
            className={val ? "item" : "emptyItem"}
            onClick={(e) => showOptions(selectedNode)}
            key={name}
          >
            <>
              {name} : {val}
            </>
            {!!val && (
              <button
                className="closeButton"
                onClick={(e) => clearField(e, name)}
              >
                X
              </button>
            )}
          </div>
        );
      })}
      {showAvailableData && (
        <div>
          <div>
            <AvailableDataModal
              allNodes={nodes}
              ancestors={ancestors}
              onClickAvailableDataField={onClickAvailableDataField}
              setShowAvailableData={setShowAvailableData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
