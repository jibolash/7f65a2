import { createPortal } from "react-dom";

export default function AvailableDataModal({
  allNodes,
  ancestors,
  onClickAvailableDataField,
  setShowAvailableData,
}) {
  let nodesWithData = [];
  for (const node of allNodes) {
    if (ancestors.includes(node.id)) {
      nodesWithData.push(node);
    }
  }

  return createPortal(
    <div className="modalOverlay">
      <div className="modalBody">
        <h3>Available Data</h3>
        {nodesWithData.map((node) => (
          <div key={node.id}>
            {node.data.label}
            <div>
              <select size={Object.entries(node.formFields).length}>
                {Object.entries(node.formFields).map((item) => (
                  <option
                    key={item[0]}
                    onClick={(e) => onClickAvailableDataField(node, item[0])}
                  >
                    &nbsp; {item[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <div className="actions">
          <button onClick={() => setShowAvailableData(false)}>Select</button>
          <button onClick={() => setShowAvailableData(false)}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
