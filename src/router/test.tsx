import { Children, useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/routers/interface";
import Login from "@/views/Login/index";
import { connect } from "react-redux";
import { LayoutIndex } from "@/router/constant";
import Home from "@/views/Home/index";
import User from "@/views/User/index"
import { setMenuList } from "../store/modules/global/action";
import { store } from '@/store'

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.tsx");

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

  const mapTree= org=>{
    const haveChild = Array.isArray(org.children) && org.children.length>0
    return { 
      //element: org.level==2 ? <LayoutIndex />:<org.code />,
      element: <LayoutIndex />,
      //path: haveChild && org.level!=2 ? `/${org.code.toLowerCase()}/index`: org.code,
      path: `${org.code.toLowerCase()}`,
      meta: {
              title: org.name,
            },
      children: haveChild && org.level==2 ? org.children.map(item => mapTree(item)):null
    }
  }

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
			title: "首页"
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
	//...routerArray,

	{
		path: "*",
		element: <Navigate to="/404" />
	}
];

export let menuRouter: RouteObject[]=[]

//使用useRoutes方法传入routesList生成Routes组件，配置路由表
const Router = (props:any) => {
  const {menuList, setMenuList}=props

  console.log(`======从store中拿到的数据`, menuList)
  const menuArray:RouteObject[] = menuList.map(item=> mapTree(item))

  const newRouter: RouteObject[] = [...menuArray, ...rootRouter]

  console.log(`----生成的最新的路由表`, newRouter)
	const routes = useRoutes(newRouter);
  menuRouter = [...menuArray, ...rootRouter]
  
	return routes;
};

//export default Router;
const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setMenuList };
export default connect(mapStateToProps, mapDispatchToProps)(Router);