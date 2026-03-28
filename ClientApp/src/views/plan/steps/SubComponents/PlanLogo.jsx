import { Link } from "react-router-dom"

const PlanLogo = () => {

    return (   
      <div className="col-md-12 px-2 mb-4" style={{paddingLeft: "4px", paddingRight:"4px", clear:"both"}}>
        <div className="text-left float-left">
            <img className="Header-logo-viewer" src="../../design_archive_logo.png" alt="Logo" />
        </div>
        <Link to='/login' >
        <div className="text-right text-white float-right text-right"
        >
            Back to Login
        </div>
        </Link>   
      </div>
    )
}

export default PlanLogo