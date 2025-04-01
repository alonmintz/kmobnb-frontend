import { useDispatch, useSelector } from "react-redux";
import { StayFilter } from "../../cmps/stay/StayFilter";
import { StayList } from "../../cmps/stay/StayList";
import { stayActions } from "../../store/actions/stay.actions";
import { useEffect, useRef } from "react";
import { SET_FILTER_BY } from "../../store/reducers/stay.reducer";

export function StayIndex() {
  //todo: apply the IntersectionObserver to load more stays at the end
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const bulkIdx = useSelector(
    (storeState) => storeState.stayModule.currentBulkIdx
  );
  const dispatch = useDispatch();

  const bottomDiv = useRef();

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     const entry = entries[0];
  //     if (entry.isIntersecting) {
  //       loadStays();
  //     }
  //   });

  //   observer.observe(bottomDiv.current);

  //   return () => observer.disconnect();
  // }, []);

  useEffect(() => {
    loadStays(0);
  }, [filterBy]);

  async function loadStays(bulkIdxToSet) {
    try {
      if (bulkIdxToSet) {
        await stayActions.setBulkIndex(bulkIdxToSet);
      } else {
        await stayActions.incrementBulkIndex();
      }
      await stayActions.loadStays(filterBy, bulkIdx);
    } catch (err) {
      //TODO: later change to user msg
      console.log("failed loading stays: ", err);
    }
  }

  function onSetFilterBy(updatedFilterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy: updatedFilterBy });
  }

  return (
    <section className="stay-index">
      <StayFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <StayList stays={stays} />
      <div ref={bottomDiv} className="bottom-div"></div>
    </section>
  );
}
