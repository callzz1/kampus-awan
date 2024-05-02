import { useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../App";

function Ball() {
    const { cursor }    = useContext(GlobalContext);
    const ballRef       = useRef(null); 

    useEffect(() => {
        const ballSize = {
            width:  ballRef.current.offsetWidth,
            height: ballRef.current.offsetHeight
        }

        ballRef.current.style.transform = `translate(
          ${ cursor.x - ( ballSize.width / 2 ) }px,
          ${ cursor.y - ( ballSize.height / 2 ) }px
        )`
      }, [ cursor ]);

    return (
        <div ref={ ballRef } className="aspect-auto h-[75vh] w-1/3 rounded-full bg-gradient-to-br from-indigo-300 to-blue-500 fixed z-[-1] transition-all ease-linear"></div>
    )
}

export default Ball;