# redux学习笔记

## redux的核心：

### 第一步:将Store里面的状态传递到View中，

    将Store里面的状态传递到View中，具体我们是通过React的Redux绑定库react-redux中的connect实现的

redux的学习
https://juejin.cn/post/6844904021187117069

1.安装react、react-redux 2.入口文件中：
import { Provider } from "react-redux";
import { store } from "@/redux";
<Provider store={store}>
<App />
</Provider>

```
Provider 是 react-redux 提供的 API，是 Redux 在 React 使用的绑定库，它搭建起 Redux 和 React 交流的桥梁。
```

现在我们已经创建了 Store，并使用了 React 与 Redux 的绑定库 react-redux 提供的 Provider 组件将 Store 与 React 组件组合在了一起。

3.接下来继续整合 Store 与 React
connect 函数接收 mapStateProps 函数，获取 mapStateProps 返回的最终组合后的状态，然后将其注入到 App 组件中，返回一个新的组件，然后交给 export default 导出。

//App根组件中：
import { connect } from "react-redux";

。。。
const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(App);

```
React Redux 提供一个 connect 函数使你可以读取 Redux store（并且当 store 更新时会再次去读取值）的值。
connect 函数接收两个参数，都是可选的：

1.mapStateToProps：在每一次 store state 改变时被调用。它接收整个 store state，并返回该组件需要的数据对象。
  mapStateToProps(state, [props])
  参数：
  state:  Store 里面保存的 JavaScript 对象状态树(创建 Store 的初始状态数据)
  props:  可选参数, React 组件的 props



2.mapDispatchToProps: 此参数可以是一个 function，或者一个 object。
```

### 第二步：通过 “发起更新动作” 来修改 Store 中保存的状态

更新 Store 的状态有且仅有一种方式：那就是调用 dispatch 函数，传递一个 action 给这个函数 。

## redux-persist

### redux-persist的介绍

```
在React项目中，我们会使用redux 来进行状态管理。redux和其它状态管理技术一样，刷新页面后，数据就会恢复成初始状态。

如何让数据实现持久化呢？大家应该都可想到了结合本地存储（localStorage 或 sessionStorage）

但每次的状态修改，都要去更改本地存储的数据工作量巨大，还容易出错。今天给大家推荐redux的一个插件redux-persist。redux-persist会将redux的store中的数据自动缓存到浏览器的 localStorage 中，不再需要单独去存储了。
```

### redux-persist的使用

1、引入 persistStore, persistReducer
2、执行persistReducer方法与persistStore方法，并将persistStore方法的返回值导出
3、在入口文件中，将PersistGate标签嵌套在redux内层4.最后，在浏览器中查看localStorage的值
你将发现数据已经存储到了localStorage中，刷新网页，redux中的数据也不会丢失
以上，就完成了使用redux-persist实现React持久化本地

```
import { persistStore, persistReducer } from "redux-persist";

// redux 持久化配置
const persistConfig = {
	key: "redux-state",
	storage: storage
};
const persistReducerConfig = persistReducer(persistConfig, reducer);


// 创建 store
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleWares));

// 创建的store持久化
const persistor = persistStore(store);

export { store, persistor };
```

在main.jsx中：
将PersistGate标签嵌套在redux内层
<Provider store={store}>是 redux的store

```
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";


	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>

```

### redux-persist的理解

redux-persist作用是将store中的数据缓存到浏览器中，减少数据请求，每当白名单中的数据发生变化，才会进行一次更新缓存的操作，并且这个数据缓存是存在localStorage中的，不是会话级别的缓存。

实现方式主要是依靠两个方法：persistStore和persistReducer，使用persistReducer时需要指定persistConfig，这一项就是你需要缓存的数据处理项，它有着黑白名单的处理方式，还需要一个storage的协助：

然后在处理reducer时用到persistReducer，一种是直接使用，另一种你可能会使用到combineReducers，接下来就是创建store了，可能会用到中间件，不过此时不要理睬中间件创建store的过程，期间和你之前的创建方式一样，在store创建好的外边，加一句话，然后export里包含persistor就好：

### redux-persist的API

1.persistReducer(config, reducer)

```
参数：
config：
所需配置： key, storage（storage默认为localStorage）
值得注意的其他配置： whitelist, blacklist, version, stateReconciler, debug
reducer:
任何reducer都可以使用，通常是返回顶级的reducer--combineReducers

返回值：
一个经过处理的reducer
```

2.persistStore(store, [config, callback])

```
参数：
store:redux store,将做持久化存储
config: 如果要避免在调用后立即开始持久化persistStore，请设置选项 manualPersist。示例：{ manualPersist: true }然后可以在任何时候使用persistor.persist(). 如果在进行persistStore呼叫时您的存储尚未准备好，您通常希望这样做。

callback:回调函数

返回值：
返回持久化store对象
```

## Redux中间件-redux-thunk、redux-promise

Redux的核心概念其实很简单：将需要修改的state都存入到store里，发起一个action用来描述发生了什么，用reducers描述action如何改变state tree 。创建store的时候需要传入reducer，真正能改变store中数据的是store.dispatch API。

redux中有一个API:applyMiddleware

#### redux中间件的概念

dispatch一个action之后，到达reducer之前，进行一些额外的操作，就需要用到middleware。你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。
换言之，中间件都是对store.dispatch()的增强

### redux-thunk的用法

```
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
 const store = createStore(
  reducers,
  applyMiddleware(thunk)
);


```

直接将thunk中间件引入，放在applyMiddleware方法之中，传入createStore方法，就完成了store.dispatch()的功能增强。即可以在reducer中进行一些异步的操作。
3.applyMiddleware()
其实applyMiddleware就是Redux的一个原生方法，将所有中间件组成一个数组，依次执行。
中间件多了可以当做参数依次传进去

https://juejin.cn/post/6844903722233888782
