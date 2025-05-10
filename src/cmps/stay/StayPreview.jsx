import { StayPhotoGallery } from "./StayPhotoGallery"

export function StayPreview({ stay }) {

    const currLon = 32.086722
    const currLat = 34.789777

    function calcDistance(lat1, lon1, lat2, lon2) {
        const EARTH_RADIUS_KM = 6371

        function degreesToRadians(degrees) {
            return degrees * (Math.PI / 180)
        }
        
        const deltaLat = degreesToRadians(lat2 - lat1)
        const deltaLon = degreesToRadians(lon2 - lon1)

        const lat1Rad = degreesToRadians(lat1)
        const lat2Rad = degreesToRadians(lat2)

        // Haversine formula
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        // Distance in kilometers
        const distance = Math.round(EARTH_RADIUS_KM * c)
        
        return distance
    }

    if (!stay) return <div className="stay-preview">Loading...</div>
    return (
        <div className="stay-preview">
            <StayPhotoGallery imgUrls={stay.imgUrls} />
            <div className="text-container">
                <div className="bold-text">{stay.loc.city}, {stay.loc.country}</div>
                <div className="normal-text">{calcDistance(currLat, currLon, stay.loc.lat, stay.loc.lan).toLocaleString()} kilometers away</div>
                <div className="normal-text">Apr 3 – 8</div>
                <div className="price">₪<span className="bold-text">{stay.price}</span> night</div>
                <div className="rating">
                    <span><img src="src/assets/img/rating-star.svg" /> 4.9</span>
                </div>
            </div>
        </div>
    )
}
