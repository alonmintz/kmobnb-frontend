import { useState } from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css'
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";

export function StayFilter({filterBy, onSetFilterBy}) {
    const IMG_URL_PATH = "../../src/assets/img/stay/type/";
    const typeList = ["OMG!", "Beachfront", "Amazing Views", "Trending", "Design", "Camping", "Luxe", "Countryside", "Top cities", "Off-the-grid", "Historical homes", "Desert", "Cabins", "Surfing", "New", "National parks", "Rooms", "Amazing pools", "Camping", "Top of the world", "Skiing", "Tropical", "Creative spaces", "Castles"]; //  list of stay types

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    useEffectUpdate(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onClickType(type) {
        setFilterByToEdit({type})
    }

    const { type: selectedType } = filterByToEdit //  extracting the currently selected stay type from filterBy
    return (
        <section className="stay-filter">
            <div>
                <Carousel
                arrows
                className="stay-filter-carousel"
                itemClass=""
                containerClass=""
                infinite={false}
                draggable={false}
                swipeable
                slidesToSlide={3}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 15,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 3,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 7,
                        partialVisibilityGutter: 30
                    }
                }}>
                    {typeList.map((type) => (
                        <button
                            key={type}
                            className={`stay-type-button ${type === selectedType ? 'selected' : ''}`}
                            disabled={type === selectedType}
                            onClick={() => onClickType(type)
                            }>
                            <img src={`${IMG_URL_PATH}${type}.jpg`} alt="" />
                            <p>{type}</p>
                        </button>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}
