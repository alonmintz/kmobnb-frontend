const dataModel = {
  at: "2016-06-12T04:00:00.000Z",
  stayId: "123456789",
  by: {
    _id: "622f3407e36c59e6164fc004",
    fullname: "Kiesha",
    imgUrl: "https://robohash.org/10711825?set=set1",
    id: "10711825",
  },
  txt: "I had a great experience working with Patty and Peter.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a 2 bedroom unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Peter.",
  starsRate: 4,
};

export function ReviewDisplay({ review, isPreview = false, onShowMore }) {
  return (
    <section className="review-display">
      <div className="review-by">
        <div className="user"></div>
        <div className="rate-date"></div>
      </div>
      <p className="review-txt"></p>
    </section>
  );
}
