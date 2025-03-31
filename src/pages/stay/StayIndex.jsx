import { useSelector } from "react-redux";
import { StayFilter } from "../../cmps/stay/StayFilter";
import { StayList } from "../../cmps/stay/StayList";
import { stayActions } from "../../store/actions/stay.actions";
import { useEffect, useRef } from "react";

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);

  const bottomDiv = useRef();
  const startIdx = useRef(0);

  useEffect(() => {
    loadStays();
  }, [filterBy]);

  async function loadStays() {
    try {
      await stayActions.loadStays(filterBy);
    } catch (err) {
      //TODO: later change to user msg
      console.log("failed loading stays: ", err);
    }
  }

  return (
    <section className="stay-index">
      <StayFilter />
      <StayList />
    </section>
  );
}
