import entirePlaceIcon from "../../assets/img/stay/entire-place.svg";
import privateRoomIcon from "../../assets/img/stay/private-room.svg";
import sharedRoomIcon from "../../assets/img/stay/shared-room.svg";

const ROOM_TYPES = [
  {
    roomType: "Entire home/apartment",
    displayTitle: "An entire place",
    displayDesc: "Guests have the whole place to themselves",
    displayIcon: entirePlaceIcon,
  },
  {
    roomType: "Private room",
    displayTitle: "A room",
    displayDesc:
      "Guests have their own room in a home, plus access to shared spaces",
    displayIcon: privateRoomIcon,
  },
  {
    roomType: "Shared room",
    displayTitle: "A shared room in a hostel",
    displayDesc:
      "Guests sleep in a shared room in a professionally managed hostel with staff onsite 24/7",
    displayIcon: sharedRoomIcon,
  },
];

export function RoomTypeBracket({ type, isSelected, onSelect }) {
  const { roomType, displayTitle, displayDesc, displayIcon } = ROOM_TYPES.find(
    (obj) => type === obj.roomType
  );

  return (
    <button
      className={`room-type-bracket ${isSelected && "selected"}`}
      onClick={(ev) => {
        ev.preventDefault();
        onSelect(roomType);
      }}
    >
      <div className="type">
        <h2 className="title">{displayTitle}</h2>
        <span className="desc">{displayDesc}</span>
      </div>
      <div className="icon">
        <img src={displayIcon} alt="room-type-icon" />
      </div>
    </button>
  );
}
