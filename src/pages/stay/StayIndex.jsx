import { useSelector } from "react-redux";
import { StayList } from "../../cmps/stay/StayList";
import { stayActions } from "../../store/actions/stay.actions";
import { useEffect, useRef, useState } from "react";

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const [bulkIdx, setBulkIndex] = useState(0);

  const bottomDiv = useRef();
  //TODO: determine a min height to the index div so the bottom div won't be triggered on load.
  //TODO: add loading when loading stays (animation or even better: empty preview templates (like in origin))
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
    if (bulkIdx === 0) {
      stayActions.loadStays(filterBy, bulkIdx);
    } else {
      setBulkIndex(0);
    }
  }, [filterBy]);

  useEffect(() => {
    stayActions.loadStays(filterBy, bulkIdx);
  }, [bulkIdx]);

  return (
    <section className="stay-index layout main full">
      <StayList stays={stays} />
      <div ref={bottomDiv} className="bottom-div"></div>
    </section>
  );
}
