import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export function DetailsPicker({ details, onSelect }) {
  return (
    <div className="details-picker">
      {details.map((detail) => (
        <DetailSelectionBracket
          key={detail.type}
          detail={detail}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function DetailSelectionBracket({ detail, onSelect }) {
  const { type, count } = detail;

  return (
    <section className="detail-selection-bracket">
      <span className="detail-type">{type}</span>
      <div className="detail-count-container">
        <button
          className="action-btn decrease-btn"
          onClick={(event) => {
            event.preventDefault();
            onSelect({ actionType: "decrease", type });
          }}
          disabled={count <= 1}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span className="detail-count">{count || 0}</span>
        <button
          className="action-btn increase-btn"
          onClick={(event) => {
            event.preventDefault();
            onSelect({ actionType: "increase", type });
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </section>
  );
}
