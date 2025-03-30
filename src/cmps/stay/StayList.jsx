import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadStays } from "../../store/actions/stay.actions"
import { StayPreview } from "./StayPreview"

export function StayList() {
    //TODO: logic to pull and render multiple StayPreviews
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    // const dispatch = useDispatch()

    useEffect(() => {
        loadStays(filterBy)
            .then(() => {
                console.log('Stays loaded successfully')
            })
            .catch((err) => {
                console.error('Error loading stays:', err)
            })
    },[filterBy])

    return (
        <div className="stay-list">
            <StayPreview />
            <StayPreview />
            <StayPreview />
            <StayPreview />
        </div>
    )
}