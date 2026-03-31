import Spinner, { SpinnerComponentRef } from '../../@core/components/spinner/Fallback-spinner'

function Circularspin () {
    return (
        <div className="loader-container"> 

        <svg className="spinner" viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strockwidth="5"></circle>
        </svg>
        </div>

    )
}
export default Circularspin

export const N_Loader = (props) => {
    if (props.show) {
        return <Spinner />
    } else {
        return <>{props.children}</>
    }
}

export const R_Loader = ({loaderRef}) => {
    return <SpinnerComponentRef loaderRef={loaderRef} />
}