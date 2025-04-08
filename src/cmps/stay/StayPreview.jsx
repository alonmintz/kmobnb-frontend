import { StayPhotoGallery } from "./StayPhotoGallery"

export function StayPreview({ stay }) {

    // TODO: handle missing data better
    if (stay.imgUrls.length === 0) {
        stay.imgUrls = ["http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg"]
    }
    if (!stay.loc.city) {
        stay.loc.city = "City"
    }
    if (!stay.loc.country) {
        stay.loc.country = "Country"
    }

    if (!stay) return <div className="stay-preview">Loading...</div>
    return (
        <div className="stay-preview">
            <StayPhotoGallery imgUrls={stay.imgUrls} />
            <div className="text-container">
                <div className="bold-text">{stay.loc.city}, {stay.loc.country}</div>
                <div className="normal-text">1,337 kilometers away</div>
                <div className="normal-text">Apr 3 – 8</div>
                <div className="price">₪<span className="bold-text">{stay.price}</span> night</div>
                <div className="rating">
                    <span><img src="src/assets/img/rating-star.svg" /> 4.9</span>
                </div>
            </div>
        </div>
    )
}
