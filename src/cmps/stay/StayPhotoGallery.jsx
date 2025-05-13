import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export function StayPhotoGallery({ imgUrls, onPreviewClick }) {

    // function onCarouselClick(e) {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     onPreviewClick(e)
    // }

    return (
        <div className="stay-photo-gallery">
            <Carousel
                onClick={() => onPreviewClick()}
                arrows
                containerClass="carousel-list"
                itemClass="carousel-item"
                infinite={false}
                draggable={false}
                showDots={true}
                swipeable
                renderArrowsWhenDisabled={false}
                transitionDuration={200}
                slidesToSlide={1}
                renderButtonGroupOutside={false}
                responsive={{
                    all: {
                        breakpoint: { max: Infinity, min: 0 },
                        items: 1,
                    }
                }}>
                {imgUrls.map((imgUrl) => (
                    <img key={imgUrl} className="stay-photo-gallery-img" src={imgUrl} alt="image" onClick={() => onPreviewClick()} />
                ))
                }
            </Carousel>
        </div>
    )
}