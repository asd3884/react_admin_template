import { Children, useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/routers/interface";
import Login from "@/views/Login/index";
import { connect } from "react-redux";
import { LayoutIndex } from "@/router/constant";
import Home from "@/views/Home/index";
import User from "@/views/User/index"
import Role from "@/views/Role/index"
import { setMenuList } from "../store/modules/global/action";
import { store } from '@/store'
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.tsx");

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
  {
    element: <LayoutIndex />,
    meta: {
			title: "首页",
      icon:<LaptopOutlined/>
		},
		children: [
			{
				path: "/home/index",
				// element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				element: <Home />,
				meta: {
					requiresAuth: true,
					title: "首页",
					key: "home"
				}
			}
		]
  },

  {
    element: <LayoutIndex />,
    meta: {
			title: "用户管理",
      icon:<UserOutlined/>
		},
		children: [
			{
				path: "/user/index",
				// element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				element: <User />,
				meta: {
					requiresAuth: true,
					title: "用户管理",
					key: "user",

				}
			},
      {
				path: "/role/index",
				// element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				element: <Role />,
				meta: {
					requiresAuth: true,
					title: "角色管理",
					key: "role"
				}
			}
		]
  },
	//...routerArray,

	{
		path: "*",
		element: <Navigate to="/404" />
	}
];

//使用useRoutes方法传入routesList生成Routes组件，配置路由表
const Router = (props:any) => {
  const {menuList, setMenuList}=props
 
	const routes = useRoutes(rootRouter);
  
	return routes;
};

//export default Router;
const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setMenuList };
export default connect(mapStateToProps, mapDispatchToProps)(Router);