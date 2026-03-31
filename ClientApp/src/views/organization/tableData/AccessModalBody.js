import { Input, Label, Col, ModalBody } from 'reactstrap'
import { useState } from 'react'

// ! PopUpBody  
const AccessModelBody = ({ orgUserData, setRole }) => {
    const [statevalid, setSTATEvalid] = useState(null)
    return (
        <ModalBody>
            <Col className="row form-group">
                <Label className="col-form-label col-sm-5">Organization Name<span style={{ color: 'red' }}>*</span></Label>
                <Input type="text" className="form-control col-sm-7" id="org_Name" defaultValue={orgUserData.organisationname} placeholder="Organization Name" readOnly={true}></Input>
            </Col>
            <Col className="row form-group">
                <Label className="col-form-label col-sm-5">Organization User Name  <span style={{ color: 'red' }}>*</span></Label>
                <input type="text" className="form-control col-sm-7" id="orguserName" isadm={`${orgUserData.is_administrator}`} uid={orgUserData.userId} defaultValue={orgUserData.first_name} placeholder="Organization User Name" maxlength="15" pattern="[A-Za-z]{2,15}" readOnly={true} />  {/* abhishek 02-03 readyonly*/}
            </Col>
            <Col className="row form-group" style={{ display: 'none' }}>
                <Label className="col-form-label col-sm-5">Organization User Code <span style={{ color: 'red' }}>*</span></Label>
                <input type="text" className="form-control col-sm-7" id="orgusercode" placeholder="Organization User Code" autocomplete="off" maxlength="10" />
            </Col>
            <Col className="row form-group">
              <Label className="col-form-Label col-sm-5">Status <span style={{ color: 'red' }}>*</span></Label>
              <Input type="select" name="state" className="states order-alpha form-control state col-sm-7"  id="SAC_status"
                  style={{ borderColor: (statevalid === true) ? '#66DE93' : (statevalid === null) ? '' : '#D83A56' }}
                  onChange={
                      (e) => {
                          setSTATEvalid(validate.validateState(e.target.value))
                      }
                  }
              >
                  <option value="Requested">Requested</option>
                  <option value="Accepted">Accepted</option>
                  {/*<option value="Rejected">Rejected</option>*/}
                  <option value="Blocked">Blocked</option>
                  {/*<option value="Deleted">Deleted</option>*/}
              </Input>
          </Col>
            <Col className="row form-group">
                <label className="col-form-label col-sm-5">Access Role <span style={{ color: 'red' }}>*</span></label>
                <select name="role" className="form-control role col-sm-7" subid="#C_stateId" id="OrgC_accessRole">
                    {
                        setRole()
                    }
                </select>
            </Col>
            <Col className="row form-group" style={{ display: 'none' }}>
                <Label className="col-form-label col-sm-5">Status <span style={{ color: 'red' }}>*</span></Label>
                <select name="state" className=" form-control col-sm-7" id="C_status">
                    <option value="Active">Active</option>
                    <option value="Deactive">Deactive</option>
                </select>
            </Col>
            <Col className="row form-group" style={{ display: 'none' }}>
                <Label for="acc_fromDate" className="col-form-label col-sm-5">From Date <span style={{ color: 'red' }}>*</span></Label>
                {/* <input  placeholder="mm/dd/yyyy" className="form-control col-sm-2" /> */}
                <Input type='date' className="city col-sm-7" id='acc_fromDate' />
            </Col>
            <Col className="row form-group" style={{ display: 'none' }}>
                <Label for="acc_toDate" className="col-form-label col-sm-5">To Date <span style={{ color: 'red' }}>*</span></Label>
                {/* <input  placeholder="mm/dd/yyyy" className="form-control col-sm-2" /> */}
                <Input type='date' className="city col-sm-7" id='acc_toDate' />
            </Col>
        </ModalBody>
    )
}

export default AccessModelBody
