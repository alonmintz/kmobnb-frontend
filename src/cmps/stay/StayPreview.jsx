

export function StayPreview() {
    return (
        <div className="stay-preview">
            <div className="stay-preview-gallery">image</div>
            <div>
                <div className="stay-preview bold-text">City, Country</div>
                <div className="stay-preview normal-text">Some fact (Distance or &quot;built in&quot;)</div>
                <div className="stay-preview normal-text">Apr 3-8</div>
                <div className="stay-preview price">₪9,823 night</div>
                <div className="stay-preview rating">
                    <span><img src="src/assets/img/rating-star.svg" /> 4.9</span>
                </div>
            </div>
        </div>
    )
}
