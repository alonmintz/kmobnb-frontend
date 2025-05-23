import { useSelector } from "react-redux";
import { stayActions } from "../../store/actions/stay.actions";

export function Listings() {
  const user = useSelector(storeState => storeState.userModule.user)

  const listings = stayActions.loadStays({ hostId: user._id })

  return (
    <section className="listings">
      <div className="title-section">
        <h1>Hello, host {user.fullname}!</h1>
      </div>

    </section>
  );
}
