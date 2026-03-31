import { ModalFooter, Button } from 'reactstrap'

export const ModalFooterUI = (data) => {
    return (
        <ModalFooter>
            <Button color='primary' onClick={() => data.setis_open(false)}>
                {data.FooterBtnName}
            </Button>
        </ModalFooter>
    )
}

export const ModalFooterUISaveCancel = (data) => {
    const footStyle = "justify-content: center;"
    return (
        <ModalFooter style={{ justifyContent: 'center' }}>

            <Button type="submit" color='primary' >
                {data.FirstBtnName}
            </Button>
            {/* <Button color='danger' onClick={() => data.setis_open(false)}>
        {data.SecondBtnName}
      </Button> */}

        </ModalFooter>
    )
}
