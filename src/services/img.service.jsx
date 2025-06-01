import omgImg from "../assets/img/stay/type/OMG!.jpg";
import beachfrontImg from "../assets/img/stay/type/Beachfront.jpg";
import amazingViewsImg from "../assets/img/stay/type/Amazing views.jpg";
import trendingImg from "../assets/img/stay/type/Trending.jpg";
import designImg from "../assets/img/stay/type/Design.jpg";
import luxeImg from "../assets/img/stay/type/Luxe.jpg";
import countrysideImg from "../assets/img/stay/type/Countryside.jpg";
import topCitiesImg from "../assets/img/stay/type/Top cities.jpg";
import offTheGridImg from "../assets/img/stay/type/Off the grid.jpg";
import historicalHomesImg from "../assets/img/stay/type/Historical homes.jpg";
import desertImg from "../assets/img/stay/type/Desert.jpg";
import cabinsImg from "../assets/img/stay/type/Cabins.jpg";
import surfingImg from "../assets/img/stay/type/Surfing.jpg";
import newImg from "../assets/img/stay/type/New.jpg";
import nationalParksImg from "../assets/img/stay/type/National parks.jpg";
import roomsImg from "../assets/img/stay/type/Rooms.jpg";
import amazingPoolsImg from "../assets/img/stay/type/Amazing pools.jpg";
import campingImg from "../assets/img/stay/type/Camping.jpg";
import topOfTheWorldImg from "../assets/img/stay/type/Top of the world.jpg";
import skiingImg from "../assets/img/stay/type/Skiing.jpg";
import tropicalImg from "../assets/img/stay/type/Tropical.jpg";
import creativeSpacesImg from "../assets/img/stay/type/Creative spaces.jpg";
import castlesImg from "../assets/img/stay/type/Castles.jpg";

import mauiIcon from "../assets/img/city-icons/maui-icon.png";
import montrealIcon from "../assets/img/city-icons/montreal-icon.png";
import portoIcon from "../assets/img/city-icons/porto-icon.png";
import newYorkIcon from "../assets/img/city-icons/new-york-icon.png";
import barcelonaIcon from "../assets/img/city-icons/barcelona-icon.png";
import istanbulIcon from "../assets/img/city-icons/istanbul-icon.png";
import hongKongIcon from "../assets/img/city-icons/hong-kong-icon.png";
import sydneyIcon from "../assets/img/city-icons/sydney-icon.png";
import rioDeJaneiroIcon from "../assets/img/city-icons/rio-de-janeiro-icon.png";

const stayTypeImages = [
  { name: "OMG!", img: omgImg },
  { name: "Beachfront", img: beachfrontImg },
  { name: "Amazing views", img: amazingViewsImg },
  { name: "Trending", img: trendingImg },
  { name: "Design", img: designImg },
  { name: "Luxe", img: luxeImg },
  { name: "Countryside", img: countrysideImg },
  { name: "Top cities", img: topCitiesImg },
  { name: "Off the grid", img: offTheGridImg },
  { name: "Historical homes", img: historicalHomesImg },
  { name: "Desert", img: desertImg },
  { name: "Cabins", img: cabinsImg },
  { name: "Surfing", img: surfingImg },
  { name: "New", img: newImg },
  { name: "National parks", img: nationalParksImg },
  { name: "Rooms", img: roomsImg },
  { name: "Amazing pools", img: amazingPoolsImg },
  { name: "Campers", img: campingImg },
  { name: "Top of the world", img: topOfTheWorldImg },
  { name: "Skiing", img: skiingImg },
  { name: "Tropical", img: tropicalImg },
  { name: "Creative spaces", img: creativeSpacesImg },
  { name: "Castles", img: castlesImg },
];

const cityIconsImages = [
  { name: "Maui", img: mauiIcon },
  { name: "Montreal", img: montrealIcon },
  { name: "Porto", img: portoIcon },
  { name: "New York", img: newYorkIcon },
  { name: "Barcelona", img: barcelonaIcon },
  { name: "Istanbul", img: istanbulIcon },
  { name: "Hong Kong", img: hongKongIcon },
  { name: "Sydney", img: sydneyIcon },
  { name: "Rio De Janeiro", img: rioDeJaneiroIcon },
];

export const imgService = {
  getTypeImage,
  getCityIconImage,
};

function getTypeImage(imgName) {
  const imgObj = stayTypeImages.find((obj) => imgName === obj.name);
  const img = imgObj?.img || null;
  return img;
}

function getCityIconImage(imgName) {
  const imgObj = cityIconsImages.find((obj) => imgName === obj.name);
  const img = imgObj?.img || null;
  return img;
}
