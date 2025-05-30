import { useSelector } from "react-redux"
import { StayPhotoGallery } from "./StayPhotoGallery"
import { useState } from "react"
import { LoginSignupModal } from "../../pages/loginSignup/LoginSignupModal"
import { getAverageRating } from "../../services/util.service"

export function StayPreview({ stay }) {

    const currLon = 32.086722
    const currLat = 34.789777

    const [heartClicked, setHeartClicked] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.user)
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)

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

    function onHeartClick() {
        if (!user) {
            setIsLoginModalVisible(true)
            return
        }
        if (heartClicked) {
            setHeartClicked(false)
        } else {
            setHeartClicked(true)
        }
    }

    function onPreviewClick() {
        window.open(`/stay/${stay._id}` + window.location.search)
    }

    if (!stay) return <div className="stay-preview">Loading...</div>
    return (
        <div className="stay-preview">
            {!isLoginModalVisible ? "" : <LoginSignupModal onClose={() => setIsLoginModalVisible(false)} />}
            <StayPhotoGallery imgUrls={stay.imgUrls} onPreviewClick={onPreviewClick} />
            <div className={`heart-button ${heartClicked ? "clicked" : ""}`} onClick={onHeartClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false"><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
            </div>
            <div className="text-container" onClick={onPreviewClick}>
                <div className="bold-text">{stay.loc.city}, {stay.loc.country}</div>
                <div className="normal-text">{calcDistance(currLat, currLon, stay.loc.lat, stay.loc.lan).toLocaleString()} kilometers away</div>
                <div className="normal-text">Apr 3 – 8</div>
                <div className="price">$<span className="bold-text">{stay.price}</span> night</div>
                <div className="rating">
                    <span><img className="star-image" src="src/assets/img/rating-star.svg" /> {getAverageRating(stay.reviews)}</span>
                </div>
            </div>
        </div>
    )
}
