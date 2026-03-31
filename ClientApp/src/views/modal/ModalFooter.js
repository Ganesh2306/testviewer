import { ModalFooter, Button } from 'reactstrap'
const ModalFooterUI = (data) => {
    const IsCustUser = (data.IsCustUser === 'true')

    return (
        <ModalFooter style={IsCustUser ? { justifyContent: 'center' } : { justifyContent: 'center' }}  >
            {/*<Button innerRef={saveBtnRef} type='submit' color='primary' >*/}
            <Button innerRef={data.saveBtnRef} type='submit' color='primary' 
            //onClick={() => data.setis_open(false)}
            onClick={() => {
                if (data.setClickState) {
                    data.setClickState(data.mystate)
                    //data.setis_open(false)
                } 
            }} 
             >
                {data.FooterBtnName}
            </Button>
        </ModalFooter>
    )
}
export default ModalFooterUI