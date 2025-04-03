import { StayPhotoGallery } from "./StayPhotoGallery"

export function StayPreview({ stay }) {

    //TODO: calculate distance from user location
    //TODO: calculate (or generate) dates
    //TODO: generate rating?
    
    if (!stay) return <div className="stay-preview">Loading...</div>
    return (
        <div className="stay-preview">
            <StayPhotoGallery imgUrls={stay.imgUrls} />
            {/* <div className="gallery">
                <img className="img-container" src={stay.imgUrls[0]} alt="Stay image" />
            </div> */}
            <div className="text-container">
                <div className="bold-text">{stay.loc.city}, {stay.loc.country}</div>
                <div className="normal-text">1,337 kilometers away</div>
                <div className="normal-text">Apr 3 - 8</div>
                <div className="price">₪<span className="bold-text">{stay.price}</span> night</div>
                <div className="rating">
                    <span><img src="src/assets/img/rating-star.svg" /> 4.9</span>
                </div>
            </div>
        </div>
    )
}
