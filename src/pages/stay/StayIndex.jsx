import { useSelector } from "react-redux"
import { StayFilter } from "../../cmps/stay/StayFilter"
import { StayList } from "../../cmps/stay/StayList"
import { stayActions } from "../../store/actions/stay.actions"
import { useEffect, useRef } from "react"

export function StayIndex() {
  //todo: apply the IntersectionObserver to load more stays at the end
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
  const bulkIdx = useSelector(
    (storeState) => storeState.stayModule.currentBulkIdx
  )

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
    console.log("bulkIdx", bulkIdx)
  }, [filterBy, bulkIdx])

  async function loadStays(bulkIdxToSet) {
    try {
      if (bulkIdxToSet) {
        await stayActions.setBulkIndex(bulkIdxToSet)
      } else {
        await stayActions.incrementBulkIndex()
      }
      await stayActions.loadStays(filterBy, bulkIdx)
    } catch (err) {
      //TODO: later change to user msg
      console.log("Failed loading stays: ", err)
    }
  }

  async function onLoadMoreStays() {
    try {
      await stayActions.incrementBulkIndex()
    } catch (err) {
      console.log("Failed loading more stays: ", err)
    }
    console.log("bulkIdx", bulkIdx)
  }

  function onSetFilterBy(updatedFilterBy) {
    stayActions.setFilterBy(updatedFilterBy)
  }

  return (
    <section className="stay-index">
      <StayFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <StayList stays={stays} />
      <div ref={bottomDiv} className="bottom-div"></div>
      <button className="load-more" onClick={onLoadMoreStays}>
        Load More
      </button>
    </section>
  )
}
