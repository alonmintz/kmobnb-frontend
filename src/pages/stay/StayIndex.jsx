import { useSelector } from "react-redux";
import { StayFilter } from "../../cmps/stay/StayFilter";
import { StayList } from "../../cmps/stay/StayList";
import { stayActions } from "../../store/actions/stay.actions";
import { useEffect, useRef, useState } from "react";

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const [bulkIdx, setBulkIndex] = useState(0);

  const bottomDiv = useRef();
  //TODO: add a condition to stop increasing the bulkIdx and rendering more when there is no more stays to show. maybe an indication from the backend?
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setBulkIndex((prevBulkIndex) => prevBulkIndex + 1);
      }
    });

    observer.observe(bottomDiv.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setBulkIndex(0);
  }, [filterBy]);

  useEffect(() => {
    stayActions.loadStays(filterBy, bulkIdx);
  }, [bulkIdx]);

  function onSetFilterBy(updatedFilterBy) {
    stayActions.setFilterBy(updatedFilterBy)
  }

  return (
    <section className="stay-index">
      <StayFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <StayList stays={stays} />
      <div ref={bottomDiv} className="bottom-div"></div>
    </section>
  )
}
