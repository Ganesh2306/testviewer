// ** React Imports
import { useContext } from 'react'

// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'

// ** Ability Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Utils
import {
    resolveVerticalNavMenuItemComponent as resolveNavItemComponent,
    canViewMenuGroup,
    canViewMenuItem
} from '@layouts/utils'

const VerticalMenuNavItems = props => {
  // ** Components Object
  const Components = {
    VerticalNavMenuSectionHeader,
    VerticalNavMenuGroup,
    VerticalNavMenuLink
  }
    const ability = useContext(AbilityContext)
    //added by rinku
    const userData = JSON.parse(localStorage.getItem('userData') || '{}')
    const isOrgAdmin = Number(userData?.org_type) === 1
    //added by rinku
     // ** Render Nav Menu Items
    // const RenderNavItems = props.items.map((item, index) => {
    //     const TagName = Components[resolveNavItemComponent(item)]
    //     if (item.children) {
    //         return canViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
    //     }
    //     return canViewMenuItem(item) && <TagName key={item.id || item.header} item={item} {...props} />
    // })
    const RenderNavItems = props.items.map((item, index) => {
  const TagName = Components[resolveNavItemComponent(item)]

  if (item.children) {
    const visibleChildren = item.children.filter(child => {
      if (child.children) return true
      return ability.can(child.action, child.resource)
    })

    const isThreeDGroup = item.children.some(child => ['threed', 'threedOperation', 'threedProduct', 'threed1'].includes(child.resource))

    // if (isThreeDGroup && visibleChildren.length === 1) {  //change by rinku to show 3D menu to org admin even if there is only one child
    if (isThreeDGroup && isOrgAdmin && visibleChildren.length === 1) {
      const onlyChild = visibleChildren[0]
      const collapsedItem = {
        ...onlyChild,
        id: item.id || onlyChild.id,
        title: item.title || onlyChild.title,
        icon: item.icon || onlyChild.icon
      }
      return <VerticalNavMenuLink key={collapsedItem.id} item={collapsedItem} {...props} />
    }

    return canViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
  }

  return canViewMenuItem(item) && <TagName key={item.id || item.header} item={item} {...props} />
})

  return RenderNavItems
}

export default VerticalMenuNavItems
