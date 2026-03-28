
export const getBoardDto = (ptDesign, board_Supplier_Id, state) => {
    const SaveDesignToBoardDto = new Object()
            SaveDesignToBoardDto.state = state
    const designDetailsDto = new Object()
    const boardDetailDto = new Object()
            designDetailsDto.designCode = ptDesign.designCode
            designDetailsDto.designName = ptDesign.designName
            designDetailsDto.article = ptDesign.article
            designDetailsDto.design = ptDesign.design
            designDetailsDto.folderId = ptDesign.folderId
            designDetailsDto.designId = ptDesign.designId
            designDetailsDto.features = ptDesign.features
            designDetailsDto.created_On = ptDesign.created_On
            designDetailsDto.state = ptDesign.state
            designDetailsDto.price = ptDesign.price
            designDetailsDto.stock = ptDesign.stock
            designDetailsDto.rating = ptDesign.rating
            designDetailsDto.design_Desc = ptDesign.design_Desc
            designDetailsDto.designSize = ptDesign.designSize
            designDetailsDto.products = ptDesign.products
            designDetailsDto.boardName = `tds` //ptDesign.boardName
            designDetailsDto.cartName = ptDesign.cartName
            //designDetailsDto. = ptDesign.designCode
            boardDetailDto.board_Supplier_Id = board_Supplier_Id

            SaveDesignToBoardDto.boardDetailDto = boardDetailDto
            SaveDesignToBoardDto.designDetailsDto = designDetailsDto

            return SaveDesignToBoardDto
}