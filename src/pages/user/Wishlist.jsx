const demoWishlist = [
  {
    stayId: "622f337a75c7d36e498aab0e",
    name: "Artsy 4BR in Plateau by Sonder",
    imgUrl:
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436509/rii32aibnhkoeejsohie.jpg",
    loc: {
      country: "Canada",
      countryCode: "CA",
      city: "Montreal",
      address: "Montreal, QC, Canada",
      lat: 45.508888,
      lng: -73.561668,
    },
    type: "Beachfront",
    roomType: "Entire home/apartment",
  },
  {
    stayId: "622f337a75c7d36e498aaaf8",
    name: "Westin Kaanapali KORVN 2BR",
    imgUrl:
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg",
    loc: {
      country: "United States",
      countryCode: "US",
      city: "Maui",
      address: "Lahaina, HI, United States",
      lat: -156.6917,
      lng: 20.93792,
    },
    type: "National parks",
    roomType: "Entire home/apartment",
  },
  {
    stayId: "622f337a75c7d36e498aab09",
    name: "Spacious, Sunny Room in Park Slope",
    imgUrl:
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436380/ez5caladc00mgsssl6ws.jpg",
    loc: {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address: "Brooklyn, NY, United States",
      lng: -73.92922,
      lat: 40.68683,
    },
    type: "Amazing pools",
    roomType: "Private room",
  },
  {
    stayId: "622f337a75c7d36e498aab0f",
    name: "2 bedroom Upper east side",
    imgUrl:
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436525/wdod0zfzsipkigajueda.jpg",
    loc: {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address: "New York, NY, United States",
      lng: -73.92922,
      lat: 40.68683,
    },
    type: "Beach",
    roomType: "Entire home/apartment",
  },
  {
    stayId: "622f337a75c7d36e498aaaf9",
    name: "Belle chambre à côté Metro Papineau",
    imgUrl:
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg",
    loc: {
      country: "Canada",
      countryCode: "CA",
      city: "Montreal",
      address: "Montréal, QC, Canada",
      lat: 45.508888,
      lng: -73.561668,
    },
    type: "Campers",
    roomType: "Private room",
  },
  {
    stayId: "622f337a75c7d36e498aab0b",
    name: "Elegant Flat in the Center",
    imgUrl:
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg",
    loc: {
      country: "Turkey",
      countryCode: "TR",
      city: "Istanbul",
      address: "Istanbul, Istanbul, Turkey",
      lng: 28.98648,
      lat: 41.03376,
    },
    type: "Islands",
    roomType: "Entire home/apartment",
  },
  {
    stayId: "622f337a75c7d36e498aab0a",
    name: "Apartamento en casco antiguo",
    imgUrl:
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436509/rii32aibnhkoeejsohie.jpg",
    loc: {
      country: "Spain",
      countryCode: "ES",
      city: "Barcelona",
      address: "Barcelona, Catalunya, Spain",
      lng: 2.16685,
      lat: 41.38371,
    },
    type: "Islands",
    roomType: "Entire home/apartment",
  },
];
import { useState } from "react";
import { useSelector } from "react-redux";
import { StayList } from "../../cmps/stay/StayList";
import { StayMultiLocationMap } from "../../cmps/stay/StayMultiLocationMap";

export function Wishlist() {
  //when backecd is working:
  // const userWishlist = useSelector(
  //   (storeState) => storeState.userModule.user.wishlist
  // );
  //for front dev:
  const userWishlist = [...demoWishlist];
  const [wishlistToUpdate, setWishlistToUpdate] = useState(
    structuredClone(userWishlist)
  );

  const displayWishlistStays = [...structuredClone(userWishlist)];
  const [hoveredStayId, setHoveredStayId] = useState("");

  function onMapPinClick(stayId) {
    console.log({ stayId });
  }

  return (
    <section className="wishlist">
      <section className="list-container">
        <StayList
          stays={displayWishlistStays}
          isWishlist
          onHoverStay={setHoveredStayId}
        />
      </section>
      <section className="map-container">
        <StayMultiLocationMap
          stays={displayWishlistStays}
          hoveredStayId={hoveredStayId}
          onPinClick={onMapPinClick}
        />
      </section>
    </section>
  );
}
