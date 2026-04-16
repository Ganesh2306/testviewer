import axios from "axios"

export const getDataForFav = (data) => {
    //board.allFavoriteList[len - 2].board_Name
    //Added By Vijay Pansande, Added On : 29-12-2022, Purpose : Switch user
    const boad = data.allFavoriteList
    const coll = data.collections
    //let res = []
    //if (boad === undefined && coll === undefined) {
    //    return []
    //} else {
    //    return boad ? boad.reverse() : coll.reverse()
    //}
    if (!boad && !coll) {
        return []
    } else {
        if (boad) {
            if (localStorage.who === 'Customer Admin') {
                return boad
            } else if (localStorage.who === 'Supplier Admin') {
                return boad
            } else {
                return boad.reverse()
            }
           // return localStorage.who === 'Customer Admin' ? boad : boad.reverse()
            // return boad.reverse()
        } else if (coll) {
            return coll.reverse()
        } else {
            return []
        }
    }

}

//Added By Vijay Pansande, Added On : 30-12-2022, Purpose : Switch user (get board after create or delete board)
export const getBoard = async (selectedUserID, cb, dependency) => {
    let log_supplier_id, log_supplier_creBoaredID, log_supplier_custId
    if (localStorage.who === "Customer Admin" || localStorage.who === "Customer User") {
      log_supplier_id = JSON.parse(localStorage.selecteduser).value
      log_supplier_creBoaredID = JSON.parse(localStorage.selecteduser).user_id
      log_supplier_custId = JSON.parse(localStorage.selecteduser).cus_orgtypeId
    } else { 
      log_supplier_id = JSON.parse(localStorage.userData).org_type_id
      log_supplier_creBoaredID = JSON.parse(localStorage.selecteduser).user_id
      log_supplier_custId = JSON.parse(localStorage.selecteduser).value
    }
    axios.get(`/DesignSearch/GetBoardList?id=${log_supplier_id}&custBoardId=${log_supplier_creBoaredID}&suppcustid=${log_supplier_custId}`).then((e) => {
        const data = getDataForFav(JSON.parse(e.data))
        localStorage.setItem('selectUserBoard', e.data)
        localStorage.setItem("localUrl", JSON.parse(e.data).localUrl)
        cb(data)
        if (typeof dependency === 'function') {
            dependency(false)
        }
        //Added By Vijay Pansande, Added On : 27-12-2022, Purpose : Switch user 
    })
}


export const sendrq = async(cb, issupSelectCust) => {
    let log_supplier_id, log_supplier_creBoaredID, log_supplier_custId
    if (issupSelectCust) {
        if (issupSelectCust.supplier.totalRecords >= 1) {
            log_supplier_id = issupSelectCust.supplier.supplierListDto[0].supplier_id
            log_supplier_creBoaredID = issupSelectCust.userid
            log_supplier_custId = issupSelectCust.org_type_id
            //issupSelectCust.org_type_id
        } else {
            return
        }
    } else {
            if (localStorage.who === "Customer Admin" || localStorage.who === "Customer User") {
                log_supplier_id = JSON.parse(localStorage.selecteduser).value
                log_supplier_creBoaredID = JSON.parse(localStorage.userData).userid
                log_supplier_custId = JSON.parse(localStorage.userData).org_type_id
                //log_supplier_creBoaredID = JSON.parse(localStorage.selecteduser).user_id
                //log_supplier_custId = JSON.parse(localStorage.selecteduser).cus_orgtypeId ? JSON.parse(localStorage.selecteduser).cus_orgtypeId : JSON.parse(localStorage.selecteduser).org_type_id
            } else {
                log_supplier_id = JSON.parse(localStorage.userData).org_type_id
                log_supplier_creBoaredID = JSON.parse(localStorage.selecteduser).user_id
                log_supplier_custId = JSON.parse(localStorage.selecteduser).value
            }
        }
    const res = await (await axios.get(`/DesignSearch/GetBoardList?id=${log_supplier_id}&custBoardId=${log_supplier_creBoaredID}&suppcustid=${log_supplier_custId}`)).data
    const data = getDataForFav(await JSON.parse(res))
     //Added By : Vijay Pansande, added On : 04-12-2022, Purpose : Show newly added board 1st
    localStorage.setItem("board", JSON.stringify(data)) //data.collections ? JSON.stringify(data.collections) : JSON.stringify(data.board))
    localStorage.setItem("localUrl", JSON.parse(res).localUrl)
    if (typeof cb === 'function') {
        cb(data)
    }
    return data
    
        // const res = await (await axios.get("/DesignSearch/GetBoardList")).data
        // const data = getDataForFav(await JSON.parse(res))
        //  //Added By : Vijay Pansande, added On : 04-12-2022, Purpose : Show newly added board 1st
        // localStorage.setItem("board", JSON.stringify(data)) //data.collections ? JSON.stringify(data.collections) : JSON.stringify(data.board))
        // if (typeof cb === 'function') {
        //  cb(data)
        // }
        // return data //await JSON.parse(res)
 }

export const getCollectionList = async(cb) => {
  
    const res = await (await axios.post("/DesignSearch/GetCollectionList")).data
    //BoardData.data = res
    const data = getDataForFav(await JSON.parse(res))
         //Added By : Vijay Pansande, added On : 04-12-2022, Purpose : Show newly added collection 1st
    localStorage.setItem("board", JSON.stringify(data))//data.collections ? JSON.stringify(data.collections) : JSON.stringify(data.board))
    localStorage.setItem("localUrl", JSON.parse(res).localUrl)
    if (typeof cb === 'function') {
     cb(data)
    }
    return data //await JSON.parse(res)
}

export const BC_Menu = {
    value: false
} 

window.BC = BC_Menu
