import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { updateCollapse } from "@/store/modules/global/action";
import './index.scss'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'

//import {menuRouter} from '@/router'
import {rootRouter} from '@/router'

//定义类型
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

/*
const items: MenuItem[] = [
  getItem('Navigation One', 'sub1', <UploadOutlined />, [
    getItem('Option 1', '/login'),
    getItem('Option 2', '/home/index'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),

  getItem('Navigation Two', 'sub2', <UserOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  getItem('Navigation Three', 'sub4', <VideoCameraOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];  */

//const items: MenuItem[]=[]

const LayoutMenu =(props:any)=>{
  const { t } = useTranslation();
  const location= useLocation()
  const [menus, setMenus]= useState<MenuItem[]>()
  const [openKeys, setOpenKeys] =useState([])
  const { SubMenu } = Menu;
  const {isCollapse}= props
  const navigateTo = useNavigate()
  
  const  menuClick=(e:{key:string})=>{

  //点击跳转到对应的路由 ，编程式导航跳转，利用到一个hook
    navigateTo(e.key)

 }
  
 //SubMenu 展开/关闭的回调
  const  handleOpenChange=(keys:string[])=>{
    setOpenKeys([keys[keys.length-1]]);
   
  }

    // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
		menuList.forEach((item: Menu.MenuOptions) => {
			// 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
			if (!item?.children?.length) return newArr.push(getItem(item.meta.title, item.path,null ));
      if(item.children.length>1)
			newArr.push(getItem(item.meta.title, item.path, item.meta.icon, deepLoopFloat(item.children)));

      if(item.children.length==1) return newArr.push(getItem(item.meta.title, item.children[0].path,item.meta.icon))
		});
		return newArr;
	};

 /* useEffect(()=>{
    setMenus( ()=>{ return menuRouter.map(item=> mapTree(item))})
  },[])*/

  useEffect(()=>{
    const menuFilter= rootRouter.filter((item)=>{
      return item.children
    })
  
    setMenus(deepLoopFloat(menuFilter));
  },[])

  return (
      <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={location.pathname}
          items={menus}
          onClick={menuClick}
          onOpenChange={handleOpenChange}
          openKeys={openKeys}
        /> 
       /* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`,
            }),
          )}
        />*/  
  )

}

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);