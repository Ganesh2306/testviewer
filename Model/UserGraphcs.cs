namespace Asp.netCoreReactDemo.Model
{
    public class UserGraph
    {


        // [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public long SystemUserId { get; set; }
        public string UserName { get; set; }
        public string Forename { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Fax { get; set; }
        public string Irn { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsAdministrator { get; set; }
        public string PasswordHash { get; set; }
        public byte[] UserImage { get; set; }
        public bool HasAcceptedTerms { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsBlocked { get; set; }
        public string Department { get; set; }
        public long OrganisationId { get; set; }
        public long CustomerId { get; set; }
        public long CheckSum { get; set; }

    }
}
