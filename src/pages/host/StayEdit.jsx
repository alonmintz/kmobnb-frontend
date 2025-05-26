import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { stayService } from "../../services/stay";
import { svgService } from "../../services/svg.service";
import { RoomTypeBracket } from "../../cmps/stay/RoomTypeBracket";
import { DetailsPicker } from "../../cmps/stay/DetailsPicker";
import { TypeCarousel } from "../../cmps/stay/TypeCarousel";
import { Amenity } from "../../cmps/stay/Amenity";
import { Modal } from "../../cmps/general/Modal";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";
import { LocationPicker } from "../../cmps/stay/LocationPicker";

const ROOM_TYPES_NAMES = [
  "Entire home/apartment",
  "Private room",
  "Shared room",
];

const NUMBER_OF_IMAGES = 5;

const MAIN_DISPLAY_AMENITIES_NAMES = [
  "Wifi",
  "Washer",
  "TV",
  "Kitchen",
  "Free parking on premises",
  "Paid street parking off premises",
  "Air conditioning",
  "Dedicated workspace",
];

const AMENITIES_NAMES = [
  "Pool",
  "Beachfront",
  "Gym",
  "King bed",
  "Indoor fireplace",
  "Breakfast",
  "BBQ grill",
  "Smoking allowed",
  "Hangers",
  "City skyline view",
  "Hair dryer",
  "Cleaning products",
  "Shampoo",
  "Conditioner",
  "FA/Palmolive body soap",
  "Body soap",
  "Shower gel",
  "Hot water",
  "Washer",
  "Essentials",
  "Bed linens",
  "Extra pillows and blankets",
  "Room-darkening shades",
  "Iron",
  "Drying rack for clothing",
  "Mosquito net",
  "Clothing storage: wardrobe",
  "HDTV",
  "TV",
  "Books and reading material",
  "Crib",
  "High chair",
  "Air conditioning",
  "Heating",
  "Central heating",
  "Smoke alarm",
  "Fire extinguisher",
  "Wifi",
  "Dedicated workspace",
  "Kitchen",
  "Refrigerator",
  "Microwave",
  "Cooking basics",
  "Dishes and silverware",
  "Private entrance",
  "Backyard",
  "Free parking on premises",
  "Freezer",
  "Dishwasher",
  "Induction stove",
  "Stainless steel oven",
  "Hot water kettle",
  "Coffee maker",
  "Wine glasses",
  "Toaster",
  "Dining table",
  "Coffee",
  "Private patio or balcony",
  "Outdoor furniture",
  "Elevator",
  "Paid street parking off premises",
  "Single level home",
  "Pets allowed",
  "River view",
  "Luggage dropoff allowed",
  "Long term stays allowed",
  "Self check-in",
  "Lockbox",
];

const MAX_NAME_CHARS = 50;

const MAX_SUMMARY_CHARS = 500;

const MIN_PRICE = 10;

export function StayEdit() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalContentType, setModalContentType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (params.listingId) {
      loadStay();
    } else {
      setIsLoading(false);
    }
  }, [params.listingId]);

  useEffectUpdate(() => {
    setIsEditModalOpen(modalContentType ? true : false);
  }, [modalContentType]);

  async function loadStay() {
    setIsLoading(true);
    try {
      const stay = await stayService.getById(params.listingId);
      setStayToEdit(stay);
    } catch (err) {
      alert("Error loading your request");
      //todo: add navigation back to home including the search params
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading || !stayToEdit) return <div className="loader">loading</div>;

  function handleInputChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setStayToEdit((prevStayToEdit) => ({ ...prevStayToEdit, [field]: value }));
  }

  function handleRoomTypeClick(roomType) {
    setStayToEdit((prevStayToEdit) => ({ ...prevStayToEdit, roomType }));
  }

  function handleDetailClick({ actionType, type }) {
    setStayToEdit((prevStayToEdit) => ({
      ...prevStayToEdit,
      [type]:
        actionType === "increase"
          ? prevStayToEdit[type] + 1
          : prevStayToEdit[type] - 1,
    }));
  }

  function handleTypeSelect(type) {
    setStayToEdit((prevStayToEdit) => ({ ...prevStayToEdit, type }));
  }

  function handleAmenityPreviewClick(amenity) {
    if (stayToEdit.amenities.includes(amenity)) {
      setStayToEdit((prevStayToEdit) => ({
        ...prevStayToEdit,
        amenities: stayToEdit.amenities.filter(
          (prevAmenity) => prevAmenity !== amenity
        ),
      }));
    } else {
      setStayToEdit((prevStayToEdit) => ({
        ...prevStayToEdit,
        amenities: [amenity, ...prevStayToEdit.amenities],
      }));
    }
  }

  function handleAmenitiesSaveFromModal(newAmenities) {
    setStayToEdit((prevStayToEdit) => ({
      ...prevStayToEdit,
      amenities: [...newAmenities],
    }));
    setModalContentType("");
  }

  function handleLocationChange(newLocation) {
    setStayToEdit((prevStayToEdit) => ({
      ...prevStayToEdit,
      loc: { ...newLocation },
    }));
  }

  function renderImagesTemplate() {
    if (stayToEdit.imgUrls?.length) {
      return stayToEdit.imgUrls.slice(0, 5).map((url, idx) => (
        <div key={url} className={`img-wrapper img-${idx + 1}`}>
          <img src={url} alt={`stay-img-${idx}`} />
        </div>
      ));
    } else {
      return [...Array(NUMBER_OF_IMAGES)].map((_, idx) => (
        <div key={idx} className={`img-wrapper template img-${idx + 1}`}>
          {svgService.getGenericSvg("Photo", "photo-icon")}
        </div>
      ));
    }
  }

  function renderModalContent() {
    switch (modalContentType) {
      case "errors":
        return <div className="errors-modal modal-content"></div>;

      case "amenities":
        return (
          <div className="amenities-modal modal-content">
            <AmenitiesPicker
              displayAmenities={AMENITIES_NAMES}
              stayAmenities={stayToEdit.amenities}
              onSave={handleAmenitiesSaveFromModal}
            />
          </div>
        );

      default:
        break;
    }
  }

  function AmenitiesPicker({
    displayAmenities,
    isPreview = false,
    stayAmenities = [],
    onSave,
  }) {
    const [amenitiesToEdit, setAmenitiesToEdit] = useState([...stayAmenities]);
    function getSelectedAmenityClass(amenity) {
      return isPreview
        ? stayAmenities.includes(amenity)
          ? "selected"
          : ""
        : amenitiesToEdit.includes(amenity)
        ? "selected"
        : "";
    }

    function handleAmenityModalClick(amenity) {
      if (amenitiesToEdit.includes(amenity)) {
        setAmenitiesToEdit((prevAmenitiesToEdit) =>
          prevAmenitiesToEdit.filter(
            (currentAmenity) => currentAmenity !== amenity
          )
        );
      } else {
        setAmenitiesToEdit((prevStayToEdit) => [amenity, ...prevStayToEdit]);
      }
    }

    return (
      <div className="amenities-picker">
        {displayAmenities.map((amenity) => (
          <button
            type="button"
            key={amenity}
            className={`amenity-btn ${getSelectedAmenityClass(amenity)}`}
            onClick={(ev) => {
              ev.preventDefault();
              if (isPreview) {
                handleAmenityPreviewClick(amenity);
              } else {
                handleAmenityModalClick(amenity);
              }
            }}
          >
            <Amenity amenityName={amenity} displayType="edit-page" />
          </button>
        ))}

        {isPreview ? (
          <button
            className="show-more-btn"
            onClick={() => {
              setModalContentType("amenities");
            }}
          >
            Show all amenities
          </button>
        ) : (
          <button
            className="save-btn"
            onClick={() => {
              onSave(amenitiesToEdit);
            }}
          >
            Save changes
          </button>
        )}
      </div>
    );
  }

  function DynamicEditsModal({ children }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
      const el = modalRef.current;
      if (!el) return;

      const handleScroll = () => {
        setIsScrolled(el.scrollTop > 0);
      };

      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <Modal
        lockScroll
        isBackdrop
        onClose={() => {
          setIsEditModalOpen(false);
          setModalContentType("");
        }}
      >
        <section className="stay-edit-modal" ref={modalRef}>
          <div
            className={`scroll-shadow ${isScrolled ? "scrolled" : ""}`}
          ></div>
          {children}
        </section>
      </Modal>
    );
  }

  async function onSubmit() {
    try {
      const savedStay = await stayService.save(stayToEdit);
      if (savedStay._id) {
        console.log("Successfully saved listing");
      }
    } catch (err) {
      console.log("Error saving listing");
    } finally {
      navigate("/host/listings");
    }
  }

  return (
    <section className="stay-edit layout secondary full">
      <section className="name-section">
        <label className="name-label" htmlFor="name">
          <input
            type="text"
            id="name"
            className="name"
            name="name"
            placeholder="Let's give your place a title"
            maxLength={MAX_NAME_CHARS}
            value={stayToEdit.name}
            disabled={isLoading}
            onChange={handleInputChange}
            required
          />
          <div className="char-counter">
            <span>{`${stayToEdit.name.length}/${MAX_NAME_CHARS}`}</span>
          </div>
        </label>
        <button className="save-all-btn" onClick={onSubmit}>
          Save changes
        </button>
      </section>
      <section className="img-section">{renderImagesTemplate()}</section>
      <section className="type-details-section">
        <h2 className="title">What type of place will guests have?</h2>
        <section className="type-details-container">
          <div className="room-type-picker">
            {ROOM_TYPES_NAMES.map((type) => (
              <RoomTypeBracket
                key={type}
                type={type}
                isSelected={type === stayToEdit.roomType}
                onSelect={handleRoomTypeClick}
              />
            ))}
          </div>
          <div className="details-price-container">
            <DetailsPicker
              details={[
                { type: "capacity", count: stayToEdit.capacity },
                { type: "bedrooms", count: stayToEdit.bedrooms },
                { type: "bathrooms", count: stayToEdit.bathrooms },
              ]}
              onSelect={handleDetailClick}
            />
            <div className="price-picker-wrapper">
              <div className="price-picker">
                <span className="price-title">
                  Price <span className="night">/night</span>
                </span>

                <label className="price-input-label">
                  <span>$</span>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="price"
                    min={MIN_PRICE}
                    value={stayToEdit.price}
                    disabled={isLoading}
                    onChange={handleInputChange}
                    required
                  />
                  {/* <span>/night</span> */}
                </label>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="location-section">
        <LocationPicker
          location={stayToEdit.loc}
          onChange={handleLocationChange}
        />
      </section>
      <section className="type-filter-section">
        <h2 className="title">Which of these best describes your place?</h2>
        <TypeCarousel
          onSelect={handleTypeSelect}
          selectedType={stayToEdit.type}
        />
      </section>
      <section className="amenities-section">
        <h2 className="title">Tell guests what your place has to offer</h2>
        <AmenitiesPicker
          displayAmenities={MAIN_DISPLAY_AMENITIES_NAMES}
          isPreview
          stayAmenities={stayToEdit.amenities}
        />
      </section>
      <section className="summary-section">
        <h2 className="title">Create your description</h2>
        <div className="summary-container">
          <textarea
            className="summary"
            name="summary"
            placeholder="For example: Take a break and unwind at this peaceful oasis..."
            maxLength={MAX_SUMMARY_CHARS}
            value={stayToEdit.summary}
            onChange={handleInputChange}
          />
          <div className="char-counter">
            <span>{`${stayToEdit.summary.length}/${MAX_SUMMARY_CHARS}`}</span>
          </div>
        </div>
      </section>
      <button className="save-all-bottom-btn" onClick={onSubmit}>
        Save changes
      </button>

      {isEditModalOpen && (
        <DynamicEditsModal>{renderModalContent()}</DynamicEditsModal>
      )}
    </section>
  );
}
