// ** React Imports
import { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'

import TopBarOrg from './ThreedComponent/TopBarOrg'
import TopBarUser from './ThreedComponent/TopBarUser'
import ImgGrid from './ThreedComponent/ImgGrid'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { error } from 'jquery'
import MultiSelectProduct from './ThreedComponent/MultiselectProduct'
import { string } from 'prop-types'

const ThreeDImages = () => {
  const [ImgViewToggle, setImgViewToggle] = useState(true)
  const [rerender, setrerender] = useState(false)
  const forceRerender = () => setrerender(!rerender)
  const [imgData, setimgData] = useState([])
  const [count, setCount] = useState()
  const [credit, setCredit] = useState()
  const [creditlimit, setcreditlimit] = useState()

  const [saastoken, setsaastoken] = useState(null)
  const [used_credit, setused_credit] = useState(0)
  const [Totalcredit, setTotalCredit] = useState()

  const [select, setSelect] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const orgidref = useRef(null)
  const applicationref = useRef(null)
  const modelsref = useRef(null)
  const productsref = useRef(null)
  const txtsearchref = useRef(null)
  const designameref = useRef(null)
  const pagestartref = useRef(0)
  const pagendref = useRef(25)
  const newselctionref = useRef(0)
  const newcheckedref = useRef()
  const [activeView, setActiveView] = useState('grid')
  const [multiSlectReset, setmultiSlectReset] = useState(false)
  const [tempsearchValue, setTempSearchValue] = useState('')
  const [saasapi, getsaasapi] = useState("")
  let PrOr = [null, null]
  const callme = async () => {
    PrOr[0] = await axios.get(`./ThreeD/GetProductList`)
    PrOr[1] = await axios.get(`./ThreeD/GetOrganisationList`)
  }

  const [PrOrList, setPrOrList] = useState(null)

  const FilterList = (Data) => {
    if (Data === null || Data === undefined || Data instanceof Error || Data === false || Data === "") {
      return []
    }
    const orgnizationlist = Data?.allOrgList.sort(function (a, b) {

      const nameA = a.organization_Name.toLowerCase() // ignore upper and lowercase
      const nameB = b.organization_Name.toLowerCase() // ignore upper and lowercase
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
    return orgnizationlist //getList
  }

  useEffect(async () => {
    const fetchCall = async (saasobj) => {
      try {
        let saasApiUrl = "http://CheckAppSeeting"
        try {
          const res = await axios.get("./Login/Getsaasapi")
          if (res?.data) {
            saasApiUrl = res.data
            localStorage.setItem("saasapi", res.data)
          }
        } catch (err) {
          console.error("Error fetching SaaS API URL:", err)
        }
        getsaasapi(saasApiUrl)
        const getsaastoken = await axios.post(`${saasApiUrl}get-token`, saasobj, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        console.log(getsaastoken.data.api_token)

        if (getsaastoken.data.api_token) {
          setsaastoken(getsaastoken.data.api_token)
          saasobj.api_token = getsaastoken.data.api_token

          const getcredits = await axios.post(`${saasApiUrl}check-subscription`, saasobj, {
            headers: {
              "Content-Type": "application/json"
            }
          })

          if (getcredits.data !== null) {
            setused_credit(getcredits.data.total_model)
            setCredit(getcredits.data.used_model)
          }
        } else {
          setsaastoken(null)
          setused_credit(0)
          setCredit(0)
        }
      } catch (error) {
        console.error("Error in fetchCall:", error)
        setsaastoken(null)
        setused_credit(0)
        setCredit(0)
      }
    }
    if (PrOrList !== null && PrOrList !== undefined) {
      const saasobj = {}
      //login with admin : platformadmin
      if (localStorage?.userData && JSON.parse(localStorage?.userData)?.org_type === 0) {
        const orgid = String(PrOrList.OrgList[0].organisation_id)
        const issaasuser = await axios.get(`./Organization/GetUserType?OrganisationId=${orgid}`)
        if (issaasuser.data !== "0") {
          saasobj.organisation_id = String(PrOrList.OrgList[0].organisation_id)
          saasobj.email = PrOrList.OrgList[0].email
          fetchCall(saasobj)
        }
        //login with supplier admin 
      } else if (localStorage?.userData && JSON.parse(localStorage?.userData)?.org_type === 2 && localStorage?.profile && JSON.parse(localStorage?.profile)?.user_type !== 0) {
        saasobj.organisation_id = String(JSON.parse(localStorage.profile).org_id)
        if (JSON.parse(localStorage.profile).user_type === 1) {
          saasobj.email = JSON.parse(localStorage.profile).org_email
        } else {
          saasobj.email = JSON.parse(localStorage.profile).login_id
        }
        fetchCall(saasobj)
        //login with organisation
      } else if (localStorage?.profile && JSON.parse(localStorage?.profile)?.user_type !== 0) {
        saasobj.organisation_id = String(JSON.parse(localStorage.profile).org_id)
        saasobj.email = JSON.parse(localStorage.profile).org_email
        fetchCall(saasobj)
      }
    }
  }, [PrOrList])

  useEffect(async () => {
    try {
      axios.get(`./ThreeD/GetProductList`).then((productList) => {
        axios.get(`./ThreeD/GetOrganisationList`).then((orgList) => {

          setPrOrList({
            ProductList: JSON.parse(productList.data),
            OrgList: FilterList(orgList.data && JSON.parse(orgList.data))
          })
          setLoading(false)

        })
      }).catch((e) => {
        console.log(e)
      })

    } catch (error) {
      PrOr = [null, null]
    }
  }, [])

  if (isLoading) {
    return <div className="App">
      <div className="text-center">
        <h2 style={{ fontFamily: "Montserrat", color: "black", padding: "15%", textAlign: "center" }}>Please Wait, Loading 3D Images...</h2>
      </div>
    </div>
  }

  return (
    <Fragment>
      <div className='main-design-div'>
        <TopBarOrg txtsearchref={txtsearchref} designameref={designameref} orgidref={orgidref} productsref={productsref}
          modelsref={modelsref} applicationref={applicationref} setSelect={setSelect} PrOrList={PrOrList}
          setimgData={setimgData} ImgViewToggle={ImgViewToggle} setImgViewToggle={setImgViewToggle} imgData={imgData}
          forceRerender={forceRerender} rerender={rerender} count={count} credit={credit} creditlimit={creditlimit}
          pagestartref={pagestartref} pagendref={pagendref} newselctionref={newselctionref} activeView={activeView}
          setActiveView={setActiveView} multiSlectReset={multiSlectReset} setmultiSlectReset={setmultiSlectReset}
          setTempSearchValue={setTempSearchValue} tempsearchValue={tempsearchValue} used_credit={used_credit} saastoken={saastoken}
          setCredit={setCredit} setsaastoken={setsaastoken} setused_credit={setused_credit} setTotalCredit={setTotalCredit}
          Totalcredit={Totalcredit} saasapi={saasapi}
        />

        <ImgGrid txtsearchref={txtsearchref} designameref={designameref} orgidref={orgidref} productsref={productsref}
          modelsref={modelsref} applicationref={applicationref} select={select} PrOrList={PrOrList}
          ImgViewToggle={ImgViewToggle} forceRerender={forceRerender} rerender={rerender} imgData={imgData}
          setimgData={setimgData} setCount={setCount} setCredit={setCredit} setcreditlimit={setcreditlimit}
          credit={credit} creditlimit={creditlimit} pagestartref={pagestartref} pagendref={pagendref} count={count}
          newselctionref={newselctionref} newcheckedref={newcheckedref} activeView={activeView} setActiveView={setActiveView}
          setmultiSlectReset={setmultiSlectReset} setTempSearchValue={setTempSearchValue} tempsearchValue={tempsearchValue}
          saastoken={saastoken} used_credit={used_credit} setused_credit={setused_credit} setTotalCredit={setTotalCredit} Totalcredit={Totalcredit}
        />
      </div>
    </Fragment>
  )
}

export default ThreeDImages
