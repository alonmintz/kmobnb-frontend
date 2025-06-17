import { useSelector } from "react-redux";
import { StayList } from "../../cmps/stay/StayList";
import { stayActions } from "../../store/actions/stay.actions";
import { useEffect, useRef, useState } from "react";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";
import { StayListSkeleton } from "../../cmps/skeleton/StayListSkeleton";

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const [bulkIdx, setBulkIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const bottomDiv = useRef();

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
  const filterToSet = { ...filterBy, status: "active" };

  useEffect(() => {
    setIsLoading(true);
    if (bulkIdx === 0) {
      stayActions
        .loadStays(filterToSet, bulkIdx)
        .finally(() => setIsLoading(false));
    } else {
      setBulkIndex(0);
      setIsLoading(false);
    }
  }, [filterBy]);

  useEffectUpdate(() => {
    if (bulkIdx === 0) setIsLoading(true);
    stayActions.loadStays(filterBy, bulkIdx).finally(() => setIsLoading(false));
  }, [bulkIdx]);

  return (
    <section className="stay-index layout main full">
      {isLoading ? <StayListSkeleton /> : <StayList stays={stays} />}
      <div ref={bottomDiv} className="bottom-div"></div>
    </section>
  );
}
