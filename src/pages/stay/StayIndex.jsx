import { StayFilter } from "../../cmps/stay/StayFilter";
import { StayList } from "../../cmps/stay/StayList";

export function StayIndex() {
  return (
    <section className="stay-index">
      <StayFilter />
      <StayList />
    </section>
  );
}
