namespace ARCHIVE_VIEWER.Models.AccessRoleTask
{
     public class GetOperationResponseDtos
    {
        public long Operation_Id { get; set; }
        public string Operation_Name { get; set; }        
        public long Task_Operation_Id { get; set; }
        public long Role_Task_Id { get; set; }

    }

    public class AccessRoletask
    {
         public long Task_Id { get; set; }

        public string Task_Operations { get; set; }

        //public List<GetOperationResponseDtos> getOperationIdOperationNameRoleTaskIdResponseDtos { get; set; }
    }
}