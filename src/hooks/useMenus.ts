import { useEffect, useCallback, useState } from 'react'
import { reqAllPermisstion } from '@/api/menu'

//获取所有菜单
export const useMenus = () => {
  const [menuLists, setMenuLists] = useState([])

  const menuList = useCallback(async () => {
    console.log(`=======进入到hooks,获取所有菜单`)
    const result = await reqAllPermisstion()
    console.log(`-----:`, result.data.children[0].children)
    if (result.code == 200 || result.code == 20000) {
      return result.data.children[0].children
    }
    return []
  }, [])

  return { menuList }
}
