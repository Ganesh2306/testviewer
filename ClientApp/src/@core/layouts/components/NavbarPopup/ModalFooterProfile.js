import { ModalFooter, Button } from 'reactstrap'

export const ModalFooterProfile = (data) => {
    const footStyle = "justify-content: center;"
    return (
        <ModalFooter style={{ justifyContent: 'center' }}>

            <Button innerRef={data.pbtnRef ? data.pbtnRef : ''}  type="submit" color='primary' >
                {data.FirstBtnName}
            </Button>
            {/* <Button color='danger' onClick={() => data.setis_open(false)}>
        {data.SecondBtnName}
      </Button> */}

        </ModalFooter>
    )
}