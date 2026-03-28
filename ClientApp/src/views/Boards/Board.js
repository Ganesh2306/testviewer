// ** React Imports
import { Fragment, useState } from 'react'
import './css/boardspage.css'
import BoardCard from '../Boards/BoardComponent/BoardCard'
const Board = (props) => {
  return (
      <Fragment>    
        <div className='board_savelist'>
          <BoardCard></BoardCard>
          </div>    
      </Fragment>
  )
}

export default Board
