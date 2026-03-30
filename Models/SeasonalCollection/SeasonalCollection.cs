using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_VIEWER.Models.SeasonalCollection
{
    public class SeasonalCollection
    {
    }

    //Added By Vijay Pansande, Added On : 05/11/2022, Purpose : Get Season working
    public class GetClzSeasonMasterListBySupplierIdRequestDto
    {
        public long SupplierId { get; set; }
        public string ConfigConnection { get; set; }
        public long customerId { get; set; }
        public long Organization_Id { get; set; } //added by tanmay Dhamale: Added on 10-01-2024 purpose : customer login working 

    }
    public class GetClzCollectionMasterListBySeasonIdRequestDto
    {
        public long SupplierId { get; set; }
        public long SeasonId { get; set; }
        public long Organization_Id { get; set; }
        public string Driveletter { get; set; }
        public string ConfigConnection { get; set; }
        public long customerId { get; set; } //added by tanmay Dhamale: Added on 10-01-2024 purpose : customer login working
    }

    public class GetClzSeasonMasterListBySupplierIdResponseDto
    {
        public List<SeasonNameIdDto> SeasonNameIdDto { get; set; }
    }

    public class SeasonNameIdDto
    {
        public long SeasonId { get; set; }
        public string SeasonName { get; set; }
    }

    public class GetClzCollectionMasterListBySeasonIdResponseDto
    {
        public List<CollectionNameIdDto> CollectionNameIdDto { get; set; }
    }


    public class CollectionNameIdDto
    {
        public string CollectionName { get; set; }
        public byte[] CollectionImage { get; set; }
        public long SeasonId { get; set; }
        public string SeasonName { get; set; }
    }

    public class GetClzCatalougeNameByCollectionNameRequestDto
    {
        public long SupplierId { get; set; }
        public long SeasonId { get; set; }
        public string CollectionName { get; set; }
        public string ConfigConnection { get; set; }
        public long customerId { get; set; }//added by tanmay Dhamale: Added on 10-01-2024 purpose : customer login working 
        public long boardId { get; set; } //Addded By : Vijay Pansande, Added On 02-03-2023, Purpose : Board working in seasonal
    }
    public class GetClzCatalougeNameByCollectionNameResponseDto
    {
        public List<CollectionNameCatalogueDto> CollectionNameCatalogueDto { get; set; }
    }


    public class CollectionNameCatalogueDto
    {
        public long CollectionId { get; set; }
        public string CollectionName { get; set; }
        public string CollectionType { get; set; }
        public long ProductTypeId { get; set; }
        public long ProductGroupId { get; set; }
        public string CatalogueName { get; set; }
        public long OrganizationId { get; set; }
    }
    public class GetCollectionCardsRequestDto
    {
        public long boardId { get; set; } //Addded By : Vijay Pansande, Added On 02-03-2023, Purpose : Board working in seasonal
        public long CollectionId { get; set; }
        public short CardSequence { get; set; }
        public string CollectionType { get; set; }
        public long ProductTypeId { get; set; }
        public long ProductGroupId { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
        public long UserId { get; set; }
        public string ServerName { get; set; }
        public string DriveLetter { get; set; }
        public long FolderId { get; set; }
        public long OrganizationId { get; set; }
        //public long customerId { get; set; } //added by tanmay Dhamale: Added on 10-01-2024 purpose : customer login working 
    }
    public class GetCollectionCardsResponseDto
    {
        public List<CollectionCardsDto> CollectionCards { get; set; }
        public long count { get; set; }
        public List<CollectionCardImageDto> CollectionCardImageDto { get; set; }
    }

    public class CollectionCardsDto
    {
        public string DesignSize { get; set; }
        public string CR_CardCode { get; set; }
        public double Quantity { get; set; }
        public Dictionary<string, byte[]> Urlpath { get; set; }
        public long CR_CardId { get; set; }
        public bool Exclusive { get; set; }
        public bool Stock { get; set; }
        public bool Bunch { get; set; }
        public long DesignId { get; set; }
        public byte[] imagebyte { get; set; }
        public string URl { get; set; }
        public string PicturePath { get; set; }
        public Card card { get; set; }
        public string DesignAt { get; set; }
        public string DesignCode { get; set; }
        public string Variant { get; set; }
        public string Design { get; set; }
        public string Article { get; set; }
        public string CC_ProductGroup { get; set; }
        public string CC_ProductType { get; set; }
        public short? CC_ShapeSequence { get; set; }
        public short? CC_CardSequence { get; set; }
        public long CL_CardLayoutId { get; set; }
        public string CC_CollectionName { get; set; }
        public long CM_CollectionId { get; set; }
        public long CC_CollectionCardId { get; set; }
        public string TextInfo { get; set; }
        public string DesignUnitLength { get; set; }
        public List<CardLayoutData> CardLayoutDto { get; set; }
    }

    public class Card
    {
        public bool CR_IsBackgroundImage { get; set; }
        public string CR_BackgroundImageUrl { get; set; }
        public short CR_CardType { get; set; }
        public string CR_Name { get; set; }
        public byte[] Card_LayoutData { get; set; }
        public long? CR_CardId { get; set; }
        public byte[] CR_BackgroundImage { get; set; }
        public string CR_Unit { get; set; }
        public string CR_DropShadowDirection { get; set; }
        public string CR_DropShadowSize { get; set; }
        public bool? CR_DropShadow { get; set; }
        public float? CR_FolderEffectSize { get; set; }
        public bool? CR_FolderEffect { get; set; }
        public bool? CR_PinkingShear { get; set; }
        public long? CR_BackgroundColor { get; set; }
        public float? CR_BottomMargin { get; set; }
        public float? CR_RightMargin { get; set; }
        public float? CR_TopMargin { get; set; }
        public float? CR_LeftMargin { get; set; }
        public float? CR_Height { get; set; }
        public float? CR_Width { get; set; }
        public List<CardLayoutData> CardLayoutData { get; set; }
        public string CR_CardCode { get; set; }
    }

    public class CardLayoutData
    {
        public List<Card> card { get; set; }
        public float? CL_shapeHeight { get; set; }
        public string CL_ShapeName { get; set; }
        public float? CL_shapePositionX { get; set; }
        public float? CL_shapePositionY { get; set; }
        public short? CL_shapeSequence { get; set; }
        public float? CL_ShapeWidth { get; set; }
        public string CL_Shape_Type { get; set; }
        public string Design { get; set; }
        public string CL_PrintDesignName { get; set; }
        public string Variant { get; set; }
        public string VariantPosition { get; set; }
        public bool Barcode { get; set; }
        public string BarcodePostion { get; set; }
    }

    public class CollectionCardImageDto
    {
        public string ImagePath { get; set; }
        public int PageNumber { get; set; }
        public bool Isfavourite { get; set; }
    }

    //Added By : Vijay Pansande, Add On : 20-03-2023, Purpose : Get design for thumb controller in seasonal 
    public class CollezioniGetDesignByCollectionIdRequestDto
    {
        public string CollectionName { get; set; }
        public long CollectionId { get; set; }
        public long OrganisationId { get; set; }
        public long BoardId { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
        public bool IsNameWise { get; set; }
        public string DesignName { get; set; }
    }
}
