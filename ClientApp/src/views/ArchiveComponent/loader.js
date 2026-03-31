import { Spinner } from 'reactstrap'
import Prism from 'prismjs'


export const loader = () => {
    useEffect(() => {
        Prism.highlightAll()
    }, [])

    return (
        <div className='text-center'>
            <Spinner />
        </div>
        )
    } 