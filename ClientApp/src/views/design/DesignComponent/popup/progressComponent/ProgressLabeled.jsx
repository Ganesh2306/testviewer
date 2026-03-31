import { Progress } from 'reactstrap'

const ProgressLabeled = (props) => {
  return (
    <div className='demo-vertical-spacing mb-2'>
      <Progress className="rounded-0" animated striped value={props.value}>{Math.ceil(props.value) >= 100 ? 100 : Math.ceil(props.value)}%</Progress>
    </div>
  )
}
//className='progress-bar-success'
export default ProgressLabeled
