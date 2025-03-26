import { useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"

export function StayFilter() {
    const [searchParams, setSearchParams] = useSearchParams()
    const IMG_URL_FORMAT = "../../src/assets/img/stay/type/"
    const typeList = [
        "OMG!",
        "Beachfront",
        "Amazing Views"
    ]

    useEffect(() => {
        console.log(typeList)
        const typeFromParams = searchParams.get("type")
        console.log("type from params: " + typeFromParams)
        if(typeFromParams !== null && typeFromParams != ""){
            selectType(typeFromParams)
        }
    }, [])

    function onClickType(type) {
        setSearchParams({ type })
        selectType(type)
    }

    function selectType(type){
        console.log("selecting type " + type)
    }

    return (
        <section>
            <h3>StayFilter</h3>
            <ul>
                {
                    typeList.map(type => (
                        <li key={type} onClick={() => onClickType(type)} className="">
                            <img src={`${IMG_URL_FORMAT}${type}.jpg`} alt="" />
                            <span>{type}</span>
                        </li>
                    ))
                }
            </ul>

        </section>
    )
}