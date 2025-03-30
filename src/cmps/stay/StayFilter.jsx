import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";

export function StayFilter({ filterBy, onSetFilterBy }) {
  const IMG_URL_FORMAT = "../../src/assets/img/stay/type/";
  const typeList = ["OMG!", "Beachfront", "Amazing Views"]; //  list of stay types

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  //    the following code is for setting the data through a form:
  //   const filterForm = () => {
  //     const [formData, setFormData, handleChange] = useForm({
  //         type: ""
  //     })
  //   }
  //   const handleSubmit = (e) => {
  //     e. preventDefault();
  //     console.log("form submitted: ", formData)
  //   }

  //    setting stay type filter on load only, according to search params
  useEffect(() => {
    console.log(typeList);
    const typeFromParams = searchParams.get("type");
    console.log("type from params: " + typeFromParams);
    if (typeFromParams !== null && typeFromParams != "") {
      selectType(typeFromParams);
    }
  }, []);

  //  TODO: notify parent when filterBy is updated
  useEffectUpdate(() => {
    // onSetFilterBy(filterByToEdit);
  }, [filterByToEdit]);

  function onClickType(type) {
    setSearchParams({ type });
    selectType(type);
  }

  function selectType(type) {
    console.log("selecting type " + type);
    setFilterByToEdit({ type });
  }

  const { type: selectedType } = filterByToEdit //  extracting the currently selected stay type from filterBy
  return (
    <section className="stay-filter">
      <h3>StayFilter</h3>
      {/* this code is the start of a form for setting filterBy */}
      {/* <form onSubmit={handleSubmit}>
        <fieldset id="type_select">
            <input type="radio"></input>
        </fieldset>
      </form> */}
      {/* this code creates a list of simple buttons for each type */}
      <div className="stay-filter-carousel">
        <button className="back" aria-label="Scroll to previous stay types">back</button>
        <ul className="stay-filter-list">
          {typeList.map((type) => (
            <li key={type} onClick={() => onClickType(type)}>
              <button className={type === selectedType ? 'stay-type-button selected' : 'stay-type-button'}>
                <img src={`${IMG_URL_FORMAT}${type}.jpg`} alt="" />
                <span>{type}</span>
              </button>
            </li>
          ))}
        </ul>
        <button className="forward" aria-label="Scroll to next stay types">forward</button>
      </div>
    </section>
  );
}
