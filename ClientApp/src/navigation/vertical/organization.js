import { Mail, Home, Circle, Feather, Command, User, Users, GitPullRequest, Slack } from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const organizationNavs = [
    {
        id: 'organizationPage',
        title: 'Organization',
        icon: <Slack size={18} />,
        children: [
            {
                id: 'organization',
                title: 'Organization',
                action: 'list',
                resource: 'Organisation',
                icon: <Command size={12} />,
                navLink: `/organization`
            },
            {
                id: 'organizationUser',
                title: 'Organization User',
                icon: <Users size={12} />,
                action: 'list',
                resource: 'OrganisationUser',
                navLink: `/organizationuser`
            },
            {
                id: 'organizationRequests',
                title: 'Organization Requests',
                icon: <GitPullRequest size={12} />,
                action: 'list',
                resource: 'OrganisationRequest',
                navLink: '/organizationRequests'
            }
        ]
    }
]
export default organizationNavs