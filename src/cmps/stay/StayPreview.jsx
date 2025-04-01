export function StayPreview({ stay }) {

    if (!stay) return <div className="stay-preview">Loading...</div>
    //TODO: calculate distance from user location
    //TODO: calculate (or generate) dates
    //TODO: generate rating?
    
    return (
        <div className="stay-preview">
            <div className="gallery">
                <img className="img-container" src={stay.imgUrls[0]} alt="Stay image" />
            </div>
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
