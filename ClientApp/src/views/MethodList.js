const serviceUrl = 'http://172.16.1.83/CA_NEW/WebApi_Archive'

const login = `${serviceUrl}/admin/LoginQ3dUsers`

const getOrganizationUsers = `${serviceUrl}/admin/GetQ3dUsers?key=2098678112&role=organisation`

export  { login, getOrganizationUsers }