import {  Card, CardImg, CardBody, CardTitle } from 'reactstrap'
import {  useHistory } from 'react-router-dom'

export const SeasonCard = (data) => {
    const history = useHistory()
    return (
        <div className='child'>
            <Card className="rounded-0" onClick={() => history.push('/SeasonBook')}>
                <a>
                    <CardImg top src={data.banner} alt='Card cap' />
                </a>
                <CardBody className="text-center">
                    <CardTitle tag='h4'>{data.titleName}</CardTitle>
                </CardBody>
            </Card>
        </div>

    )
}