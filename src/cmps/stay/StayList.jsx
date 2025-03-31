import { StayPreview } from "./StayPreview"

export function StayList({ stays }) {

    if (!stays || !stays.length) return <div className="stay-list">No stays to show</div>
    return (
        <div className="stay-list">
            {stays.map((stay) => (
                <StayPreview key={stay._id} stay={stay} />
            ))}
        </div>
    )
}