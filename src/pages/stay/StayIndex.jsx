import { StayFilter } from "../../cmps/stay/StayFilter";
import { StayList } from "../../cmps/stay/StayList";

export function StayIndex() {
  return (
    <section>
      <h1>Home sweet Home</h1>
      <StayFilter />
      <StayList />
    </section>
  );
}
