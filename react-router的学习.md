


## 路由的使用
### 路由的第一种方式-路由基本配置


1.在src下创建 router/index.tsx 作为路由配置
2.在入口文件main.tsx中将<APP>组件替换为 创建的路由配置文件
如： import Router from './router'
    <React.StrictMode>
      //<App/> 
      <Router/>
    <React.StrictMode>
3.添加一个路由占位符<Outlet>，相当于vue中的<route-view>
如：import {Outlet} from 'react-router-dom'
  <Outlet/>

老的项目这样
```


//router/index.tsx:组件形式的写法

import App from "../App"
import Home from "../views/Home"
import About from "../views/About"
import {BrowserRouter,Routes,Route} from "react-router-dom"
// 两种路由模式的组件： BrowserRouter ( History模式 ) ， HashRouter( Hash模式 )


const baseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)
export default baseRouter


```

#### 组件形式实现路由跳转：
```
import {Outlet, Link} from 'react-router-dom'

<Link to="/home">Home</Link> 
<Link to="/about">About</Link>

<Outlet></Outlet>
```

#### 组件形式实现路由重定向

使用Navigate重定向
```
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"

const baseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
              {/* 配置 用户访问/ 的时候，重定向到/home路径 */}
                <Route path="/" element={<Navigate to="/home" />}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)

```

### 路由的第二种方式-对象形式的路由表

1.编写对象形式的路由表：router/index.tsx
2.入口文件中main.ts：
import App from './App'
import { BrowserRouter } from "react-router-dom"
  
  <BrowserRouter>
      <App />
  </BrowserRouter>

3.在根组件App中：
//使用hook的方式设置路由配置
import { useRoutes, useLocation,useNavigate } from "react-router-dom"
//引入编写的路由表
import router from "./router"

function App() { 
const routes = useRoutes(router);

return(
  <div className="App">
    <Link to="/home">Home</Link> 
    <Link to="/about">About</Link>

    {routes} 
  </div>
)
  

}


//编写对象形式的路由表：router/index.tsx
```
import Home from  "../views/Home"
import About from  "../views/About"
// Navigate重定向组件
import {Navigate} from "react-router-dom"


const routes = [
  {
    path:"/",
    element:<Navigate to="/home"/>
  },
   {
     path:"/home",
     element: <Home />
   },
   {
     path:"/about",
     element: <About />
   
   },
 
]

export default routes
```

### 路由的懒加载
```
import React,{ lazy } from "react"
// Navigate重定向组件
import {Navigate} from "react-router-dom"

import Home from  "../views/Home"
const About = lazy(()=>import("../views/About"))
const User = lazy(()=>import("../views/User"))

// 懒加载的模式的组件的写法，外面需要套一层 Loading 的提示加载组件

const routes = [
  {
    path:"/",
    element:<Navigate to="/home"/>
  },
  {
    path:"/",
    element: <Home />,
    children:[
      {
        path:"/home",
        element: 
          <React.Suspense fallback={<div>Loading...</div>}>
            <Home />
          </React.Suspense>
      },
      {
        path:"/about",
        element: 
          <React.Suspense fallback={<div>Loading...</div>}>
            <About />
          </React.Suspense>
      },
      {
        path:"/user",
        element: 
          <React.Suspense fallback={<div>Loading...</div>}>
            <User />
          </React.Suspense>
      }
    ]
  }
]
```



可以把<React.Suspense>懒加载封装一下
```
import React,{ lazy } from "react"
// Navigate重定向组件
import {Navigate} from "react-router-dom"

import Home from  "../views/Home"
const About = lazy(()=>import("../views/About"))
const User = lazy(()=>import("../views/User"))

//封装
const withLoadingComponent = (comp:JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    {comp}
  </React.Suspense>
)

const routes = [

  {
    path:"/",
    element:<Navigate to="/home"/>
  },
  {
    path:"/",
    element: <Home />,
    children:[
      {
        path:"/home",
        element: withLoadingComponent(<Home />)
      },
      {
        path:"/about",
        element: withLoadingComponent(<About />)
      },
      {
        path:"/user",
        element: withLoadingComponent(<User />)
      }
    ]
  }
]
```

