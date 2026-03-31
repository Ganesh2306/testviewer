import { ListGroup, ListGroupItem } from 'reactstrap'
import { YAxis } from 'recharts'

const ListGroupDesign = (props) => {

  return (
    <ListGroup className="spanStyles" style={{borderColor: '#0000', height:'200px', overflowY:"scroll"}}>
      <ListGroupItem>{data}</ListGroupItem>
      <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
      <ListGroupItem>Morbi leo risus</ListGroupItem>
      <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
      <ListGroupItem>Vestibulum at eros</ListGroupItem>
    </ListGroup>
  )
}
export default ListGroupDesign
