import Calc from './Calc'
import { useState } from 'react'
import Initial from './Initial';

export default function App() {
    const [pageState, setPageState] = useState(false)
    function replace(){
        setPageState(true)
    }
    return (
        <>
            {pageState ? <Calc /> : <Initial replace={replace}/>}
        </>
    )
}

