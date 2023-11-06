import { useEffect, useCallback, useState } from 'react'
import { reqAllPermisstion } from '@/api/menu'
import { LayoutIndex } from "@/router/constant";

//获取所有菜单
export const useMenus = () => {

  const getMenuList = useCallback(async () => {
    const result = await reqAllPermisstion()
    if (result.code == 200 || result.code == 20000) {
      //将获取到的结果给fn函数处理
      return result.data.children[0].children
    }
    return []
  }, [])

  return { getMenuList }

}

function dataListType(
  path:string,
  meta:{
    title:string
  },
  children?: dataListType[],
): dataListType {
  return {
    path,
    children,
  } as dataListType;
}

//处理菜单数据
export const useMenuFormate=()=>{

  const [menuFormateList, setMenuFormateList]= useState([])
  
  //菜单树处理方法
  const menuTreeFormate = (dataList: dataListType[], newArr:Array<any>=[]) => {
    return new Promise((resolve) => {
      if (!dataList?.children?.length) {
        return newArr.push({
          path: dataList.code,
          meta: {
            title: dataList.name,
          }
        })
      }

      //只有一个子节点
      if (dataList?.children?.length == 1) {
        return newArr.push({
          path: dataList.code,
          meta: {
            title: dataList.name,
          }
        })
      }
      //多个子节点
      if (dataList.children.length > 1) {
        return newArr.push(
          {
            path: dataList.code,
            meta: {
              title: dataList.name,
            },
            children: menuTreeFormate(dataList.children)
          }
        )
      }

      return newArr
      
    })
   }

   const filterMenu = useCallback((data)=>{
    console.log(`------得到的数据源`, data)
     //过滤出前五项，不要太多数据
     const isArr = Array.isArray(data)
     if (isArr) {
       const filterData = data.filter((item, index) => {
         return index < 5
       })

       const list = menuTreeFormate(filterData)
       //递归处理菜单数据
       setMenuFormateList(list)
     }

     return menuFormateList

   })

  return { filterMenu }

}

