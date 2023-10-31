import { Children, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/routers/interface";
import Login from "@/views/Login/index";
import { connect } from "react-redux";
import { LayoutIndex } from "@/router/constant";
import Home from "@/views/Home/index";

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.tsx");

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

//console.log(`------路由`, routerArray)

/**
 * 	
 *[
	{
 * element: <LayoutIndex />,
		meta: {
			title: "常用组件"
		},
		children: [
			{
				path: "/assembly/guide",
				element: lazyLoad(React.lazy(() => import("@/views/assembly/guide/index"))),
				meta: {
					requiresAuth: true,
					title: "引导页",
					key: "guide"
				}
			}
    ]

 * }
  ]
 * 
 */

  //

  const mapTree= org=>{
    const haveChild = Array.isArray(org.children) && org.children.length>0
    return {
      element: org.level==2 ? <LayoutIndex />:<org.code />,
      meta: {
              title: org.name,
            },
      //path: haveChild ? `/${org.code}/index`: undefined,
      children: haveChild ? org.children.map(item => mapTree(item)):[]
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
  //...menuArray,
	{
		path: "*",
		element: <Navigate to="/404" />
	}
];

//使用useRoutes方法传入routesList生成Routes组件，配置路由表
const Router = (props:any) => {
  const {menuList}=props
  const menuArray:RouteObject[] = menuList.map(item=> mapTree(item))
  
  //const newRouter= Object.assign( rootRouter, menuArray) 
  //rootRouter.push(...menuArray)
  const newRouter: RouteObject[] = [...menuArray, ...rootRouter]
  console.log(`----`, newRouter)

	const routes = useRoutes(newRouter);
  
  //Object.assign(routes, menuList) 

	return routes;
};

//export default Router;
const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps)(Router);