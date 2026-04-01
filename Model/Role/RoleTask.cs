using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARCHIVE_DASHBOARD.Model.Role
{
    public class GetOperationIdOperationNameRoleTaskIdResponseDto
    {
        public long operation_Id { get; set; }
        public string operation_Name { get; set; }
        public long task_Operation_Id { get; set; }
        public long role_Task_Id { get; set; }
    }

    public class AllDetail
    {
        public long task_Id { get; set; }
        public string task_Operations { get; set; }
        public List<GetOperationIdOperationNameRoleTaskIdResponseDto> getOperationIdOperationNameRoleTaskIdResponseDtos { get; set; }
    }

    public class RoleTask
    {
        public List<AllDetail> allDetails { get; set; }
    }
}



public class RoleTaskSave
{
    public int state { get; set; }
    public long role_Task_Id { get; set; }
    public long role_Id { get; set; }
    public long task_Operation_Id { get; set; }
    public long organisation_Id { get; set; }
    public int order_No { get; set; }
}

public class TaskOperation
{
    public List<RoleTaskSave> RoleTasks { get; set; }
}


