import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const dummyStay = {
  _id: "622f337a75c7d36e498aaaf8",
  name: "Westin Kaanapali KORVN 2BR",
  type: "National parks",
  imgUrls: [
    "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg",
    "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
    "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg",
    "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
    "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg",
  ],
  price: 595,
  summary: `Westin Kaanapali Ocean Resort Villas North timeshare - Pay resort: $14-20/day, stays under 7 night $38/res - Inquire about availability, I review then offer/approve if available :) - READ "The Space" for cleaning/etc AND brief explanation about timeshare reservations - Want guaranteed view for additional cost? Must be weekly rental, other restrictions - Wheelchair accessible / ADA, call resort directly to ensure U receive. If U need ADA U MUST inform us BEFORE booking.`,
  capacity: 8,
  amenities: [
    "TV",
    "Cable TV",
    "Internet",
    "Wifi",
    "Air conditioning",
    "Wheelchair accessible",
    "Pool",
    "Kitchen",
    "Free parking on premises",
    "Doorman",
    "Gym",
    "Elevator",
    "Hot tub",
    "Heating",
    "Family/kid friendly",
    "Suitable for events",
    "Washer",
    "Dryer",
    "Smoke detector",
    "Carbon monoxide detector",
    "First aid kit",
    "Safety card",
    "Fire extinguisher",
    "Essentials",
    "Shampoo",
    "24-hour check-in",
    "Hangers",
    "Hair dryer",
    "Iron",
    "Laptop friendly workspace",
    "Self check-in",
    "Building staff",
    "Private entrance",
    "Room-darkening shades",
    "Hot water",
    "Bed linens",
    "Extra pillows and blankets",
    "Ethernet connection",
    "Luggage dropoff allowed",
    "Long term stays allowed",
    "Ground floor access",
    "Wide hallway clearance",
    "Step-free access",
    "Wide doorway",
    "Flat path to front door",
    "Well-lit path to entrance",
    "Disabled parking spot",
    "Step-free access",
    "Wide doorway",
    "Wide clearance to bed",
    "Step-free access",
    "Wide doorway",
    "Step-free access",
    "Wide entryway",
    "Waterfront",
    "Beachfront",
  ],
  bathrooms: 2,
  bedrooms: 2,
  roomType: "Entire home/apt",
  host: {
    _id: "622f3403e36c59e6164faf93",
    fullname: "Patty And Beckett",
    location: "Eureka, California, United States",
    about: "Adventurous couple loves to travel :)",
    responseTime: "within an hour",
    thumbnailUrl:
      "https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_small",
    pictureUrl:
      "https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_x_medium",
    isSuperhost: true,
    id: "36133410",
  },
  loc: {
    country: "United States",
    countryCode: "US",
    city: "Maui",
    address: "Lahaina, HI, United States",
    lat: -156.6917,
    lan: 20.93792,
  },
  reviews: [
    {
      at: "2016-06-12T04:00:00.000Z",
      by: {
        _id: "622f3407e36c59e6164fc004",
        fullname: "Kiesha",
        imgUrl: "https://robohash.org/10711825?set=set1",
        id: "10711825",
      },
      txt: "I had a great experience working with Patty and Peter...",
      starsRate: 4,
    },
    {
      at: "2016-07-28T04:00:00.000Z",
      by: {
        _id: "622f3403e36c59e6164fb204",
        fullname: "Chris",
        imgUrl: "https://robohash.org/70072865?set=set1",
        id: "70072865",
      },
      txt: "Peter quickly responded to any questions I had before, and during the trip. Will use again, highly recommend.",
      starsRate: 3,
    },
    // ... rest of reviews same as you provided
  ],
  likedByUsers: [],
  occupancy: [
    {
      startDate: "2025-05-18T00:00:00.000Z",
      endDate: "2025-05-20T00:00:00.000Z",
    },
  ],
};

export function StayDetails() {
  useEffect(() => {
    console.log({ dummyStay });
  }, []);
  return (
    <section className="stay-details">
      <section className="title-container">
        <h1>{dummyStay.name}</h1>
        <button className="btn-save" style={{ color: "black" }}>
          {/* this is a temp heart svg */}
          <FontAwesomeIcon icon={faHeart} />
          <span>Save</span>
        </button>
      </section>
    </section>
  );
}
