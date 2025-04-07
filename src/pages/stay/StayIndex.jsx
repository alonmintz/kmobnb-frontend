import { useSelector } from "react-redux"
import { StayFilter } from "../../cmps/stay/StayFilter"
import { StayList } from "../../cmps/stay/StayList"
import { stayActions } from "../../store/actions/stay.actions"
import { useEffect, useRef } from "react"

export function StayIndex() {
  //todo: apply the IntersectionObserver to load more stays at the end
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
  const bulkIdx = useSelector((storeState) => storeState.stayModule.currentBulkIdx)

  const bottomDiv = useRef()

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     const entry = entries[0]
  //     if (entry.isIntersecting) {
  //       loadStays()
  //     }
  //   })

  //   observer.observe(bottomDiv.current)

  //   return () => observer.disconnect()
  // }, [])

  useEffect(() => {
    loadStays(bulkIdx)
    // console.log("inside useEffect. bulkIdx:", bulkIdx)
  }, [filterBy, bulkIdx])

  async function loadStays(bulkIdxToSet) {
    try {
      // if (bulkIdxToSet) {
      //   await stayActions.setBulkIndex(bulkIdxToSet)
      // } else {
      //   await stayActions.incrementBulkIndex()
      // }
      await stayActions.loadStays(filterBy, bulkIdxToSet)
    } catch (err) {
      //TODO: later change to user msg
      console.log("Failed loading stays: ", err)
    }
  }

  async function onLoadMoreStays() {
    try {
      await stayActions.incrementBulkIndex()
      // console.log("button clicked, incrementing bulkIdx to:", bulkIdx)
    } catch (err) {
      console.log("Failed loading more stays: ", err)
    }
  }

  function onSetFilterBy(updatedFilterBy) {
    stayActions.setFilterBy(updatedFilterBy)
  }

  return (
    <section className="stay-index">
      <StayFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <button className="load-more" onClick={onLoadMoreStays}>TESTING BUTTON: Load More</button>
      <StayList stays={stays} />
      <div ref={bottomDiv} className="bottom-div"></div>
    </section>
  )
}
