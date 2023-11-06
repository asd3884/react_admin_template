## React-Hooks的学习

讲义：https://escook.cn
源码：https://gitee.com/vsdeveloper/react_hooks_code_bilibili


### useState的基本用法

useState能让函数组件拥有自己的状态，因此，它是一个管理状态的hooks API
通过useState 可以实现状态的初始化、读取、更新、基本语法如下：
```
const [状态名，set函数] = useState(初始值)
```
其中，状态名所代表的数据，可以被函数组件使用，如果要修改状态名所代表的数据，需要调用set函数
```
import {useState} from 'react'

export const Count=()=>{

  //定义状态count,初始值为0，如果要修改count值，需要调用setCount(新值)函数
  const [count, setCount]= useState(0)


  return (
    <>
      <h1> 当前的count值为:{count}</h1>
      <button onClick={()=> setCount(count+1)}> 新增+1</button>

    </>
  )


}
```

状态变化时，会触发函数组件的重新执行
在函数组件中使用setState定义状态之后，每当状态发生变化，都会触发函数组件的重新执行

```
import {useState} from 'react'

export const Count=()=>{

  const [count, setCount]= useState(0)

  //每当count值发生变化，都会打印这段话
  console.log(`组件被重新渲染了`)

  const add=()=>{
    setCount(count+1)
  }

  return (
    <>
      <h1> 当前的count值为:{count}</h1>
      <button onClick={add}> 新增+1</button>

    </>
  )


}
```

注意:当函数式组件被重新执行时，不会重复调用useState()给数据赋初始值，而是复用上次的state值


以函数的形式为状态赋初始值
使用useState定义状态时，除了可以直接给定初始值，还可以通过函数返回值的形式，为状态赋初始值

```
import {useState} from 'react'

export const DateCom=()=>{


  const [date, setDate]= useState(()=>{
    const dt =new Date()
    return { 
      year:dt.getFullYear(),
      month:dt.getMonth(),
      day:dt.getDate()
    }
  })


  return (
    <>
      <h1> 今日信息</h1>
      <p>年份：{date.year}</p>
      <p>月份：{date.month}</p>
      <p>日期：{date.day}</p>

    </>
  )


}

```
注意：以函数的形式为状态赋初始值时，只有组件首次被渲染才会执行fn函数，
     当组件被更新时，会以更新前的值作为状态的初始值，赋初始值的函数不会执行



useState是异步变更状态的
调用useState()会返回一个变更状态的函数，这个函数内部是以异步的形式修改状态的，
所以，修改状态后无法立即拿到最新的状态，

```
import {useState} from 'react'

export const Count=()=>{

  const [count, setCount]= useState(0)

  const add=()=>{

    setCount(count+1) //让数值自增+1

    console.log(count) //打印count值，还是初始值0，无法立即拿到最新状态数据
    
    //useState是异步变更状态的
  }

  return (
    <>
      <h1> 当前的count值为:{count}</h1>
      <button onClick={add}> 新增+1</button>

    </>
  )


}
```




```
import {useState} from 'react'

export const Count=()=>{
  const [count, setCount]= useState(0)

  const add=()=>{

    setCount(count+1) //希望count值从0自增到1
    setCount(count+1)//希望count值从1自增到2
  }

  return (
    <>
      <h1> 当前的count值为:{count}</h1>
      <button onClick={add}> 新增+1</button>

    </>
  )


}

```
经过测试发现，上述代码只是让count从0变成了1，最终的count值并不是2
因为：
useState是异步更新状态的值，前后两次调用setCount传递进去的新值都是1 
react内部如果遇到两次相同的状态，则会默认阻止组件再次更新

为了解决上述问题。我们可以使用函数的方式给状态赋新值，当函数执行时才通过函数的形参，拿到当前的状态值，并基于它返回新的状态值


解决方案：状态更新不同步
```
import {useState} from 'react'

export const Count=()=>{
  const [count, setCount]= useState(0)

  const add=()=>{

    setCount((count)=> count+1) //传递了更新状态的函数
    setCount((count)=> count+1)
  }

  return (
    <>
      <h1> 当前的count值为:{count}</h1>
      <button onClick={add}> 新增+1</button>

    </>
  )


}
```






为了能够监听到状态的变化，react 提供了useEffect函数，它能够监听依赖项状态的变化，并执行对应的回调函数

```
 useEffect(()=>{
  /*
   依赖变化时，要触发的回调函数
  */
 },[依赖项])
```



```
import {useState, useEffect} from 'react'

export const Count=()=>{

  const [count, setCount]= useState(0)

  const add=()=>{

    setCount(count+1) //让数值自增+1
    console.log(count) //打印count值，还是初始值0，无法立即拿到最新状态数据
    
    //useState是异步变更状态的
  }


 //当count变化后，会触发useEffect指定的回调函数
  useEffect(()=>{
    console.log(count)
  },[count])

  return (
    <>
      <h1> 当前的count值为:{count}</h1>
      <button onClick={add}> 新增+1</button>

    </>
  )


}
```


更新对象类型的值
如果要更新对象类型的值，并触发组件的重新渲染，则必须使用展开运算符或Object.assign()
生成一个新对象，用新对象覆盖旧对象，才能正常触发组件的重新渲染

```
import {useState, useEffect} from 'react'

export const UserCom=()=>{

  const [user, setUser]= useState({
    name:'张三',
    age:23,
    gender:'男'

  })



 const updateUserInfo=()=>{

   user.name='李四'

   /*
   **下面的写法是错误的，因为set函数内部，会对更新前后的值进行对比；
   **由于更新前后的user,原值的引用和新值的引用相同
   **所以，react会认为值没有发生变化，不会触发组件的重新渲染
   ** setUser(user)
   */


   //解决方案：用新对象的引用替换旧对象的引用，即可正常触发组件的重新渲染
   setUser({...user})

   setUser(Object.assign({}, user)) //或者这样
   
 }




  return (
    <>
      <h1> 用户信息：</h1>
      <p>性名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <p>性别：{user.gender}</p>

      <button onClick={updateUserInfo}>更新用户信息</button>

    </>
  )


}
```

### 使用setState模拟组件的强制刷新
在函数组件中，我们可以通过useState来模拟forceUpdate的强制刷新操作
因为，只有useState的状态发生了改变，就会触发函数组件的重新渲染，从而达到强制刷新的目的

```
import {useState} from 'react'

export const Count=()=>{
  const [, forceUpdate]= useState({})

  //每次调用onRefresh函数，都会给onRefresh传递一个新对象
  //从而触发组件的重新渲染
  const onRefresh=()=>{
    forceUpdate({})
  }

  return (
    <>
      <button onClick={onRefresh}> 点击强制刷新----{Date.now()}</button>

    </>
  )


}
```

### useRef的使用
useRef函数返回一个可变的ref对象，该对象只有一个current属性，可以在调用useRef函数时为其指定初始值，并且这个返回的ref对象在组件的整个生命周期内保持不变
useRef用来解决以下两个问题：
1.获取DOM元素或子组件的实例对象
2.存储渲染周期之间共享的数据


获取DOM元素的实例

```
import React,{useRef} from 'react'

export const InputFocus=()=>{

  //1.创建ref引用
 const iptRef=useRef<HTMLInputElement>(null)

   const getFocus=()=>{
      
      //3.调用focus API,让文本框获取焦点
      iptRef.current?.focus()
   }

  return (
    <>
      {/* 2.绑定ref引用*/}
      <input type="text" ref={iptRef}>
      <button onClick={getFocus}>点击获取焦点</button>
    </>
  )
}
```

存储渲染周期之间的共享数据

```
import {useState, useRef} from 'react'

export const Count=()=>{

  const [count, setCount]= useState(0)
  //默认值为undefined
  const prevCountRef= useRef<number>()


  const add=()=>{

    setCount((c) => c+1) //让数值自增+1

    prevCountRef.current=count
    
  }




  return (
    <>
      <h1> 新值是：{count}， 旧值为:{prevCountRef.current}</h1>
      <button onClick={add}> 新增+1</button>

    </>
  )


}
```


#### useRef使用的注意事项

1. useRef()只在组件首次渲染的时候被创建，如果组件是更新状态（rerender）,不会重新创建ref对象
组件在重新渲染（rerender）时useRef不会被重复初始化

```
export const RefTimer=()=>{
    const [count, setCount]=useState(0)
    const timer=useRef(Date.now())

    console.log('组件被渲染了')

      return(
        <>
        <h3>count的值是：{count}， 时间戳是：{timer.current}</h3>
        <button onClick={()=> setCount((c)=> c+1)}> +1 </button>
        </>
      )
}
```

点击+1按钮，会让count值自增，从而触发RefTimer组件的rerender,但是
RefTimer组件内的时间戳保持不变，说明组件每次渲染，不会重复调用useRef函数进行初始化



2. ref.current 变化时不会造成组件的重新渲染
```
export const RefTimer=()=>{
    const [count, setCount]=useState(0)
    const timer=useRef(Date.now())


    const updateTime=()=>{
      timer.current=Date.now()
    }

    console.log('组件渲染了')

      return(
        <>
        <h3>count的值是：{count}， 时间戳是：{timer.current}</h3>

        <button onClick={()=> setCount((c)=> c+1)}> +1 </button>
        <button onClick={updateTime}>给Ref赋新值</button>
        </>
      )
}
```


点击给ref 赋新值的按钮时，为time.current赋新值:
1.输出了最新的timer.current的值
2.没有触发RefTimer组件的重新渲染




3. 不能把ref.current作为其他hooks的依赖项，
因为，ref的变化不会导致组件的重新渲染
```
export const RefTimer=()=>{
    const [count, setCount]=useState(0)
    const timer=useRef(Date.now())


    const updateTime=()=>{
      timer.current=Date.now()
    }

    console.log('组件渲染了')


    useEffect(()=>{
      console.log('触发了useEffect回调的执行：',timer.current)

    },[timer.current])

      return(
        <>
        <h3>count的值是：{count}， 时间戳是：{timer.current}</h3>

        <button onClick={()=> setCount((c)=> c+1)}> +1 </button>
        <button onClick={updateTime}>给Ref赋新值</button>
        </>
      )
}

```

### forwardRef的使用
ref的作用是获取实例，但由于函数组件不存在实例，因此无法通过ref获取函数组件的实例引用。
而react.forwardRef就是用来解决这个问题的
react.forwardRef会创建一个react组件，这个组件能够将其接收到的ref属性转发到自己的组件树


无法直接使用ref引用函数式组件

```
export const Father = () => {
 const childRef=useRef()

  return (
    <>
      <h1>father组件</h1>
      <hr/>

      /*
      **下面这行代码中的ref使用不正确，因为Child组件是函数式组件，无法被直接引用
      */
      <Child ref={childRef} />
    </>
  )
}
```

```
const Child = () => {

  const [count, setCount]= useState(0)

  const add =(step: number)=>{
    setCount((c)=>(c += step))
  }

  return(
    <>
      <h3> Child子组件</h3>
      count的值：{count}
      <button onClick={()=>add(-1)}> -1 </button>
      <button onClick={()=>add(+1)}> +1 </button>
    </>
  )
}
```
以上代码无法正常运行，控制台会警告

解决方案：使用react.forwardRef()把需要被引用的函数式组件包裹起来
如上面的例子：

子组件
```
//被包裹的函数式组件，第一个参数是props,第二个参数是转发过来的ref
const Child = React.forwardRef((props, ref) => {
 ...
})
```


父组件
```
export const Father = () => {
 const childRef=useRef()

//点击按钮，打印ref的值
 const onShowRef=()=>{
  console.log(childRef.current)
 }

  return (
    <>
      <h1>father组件</h1>

      <button onClick={onShowRef}>show Ref</button>
      <hr/>

      <Child ref={childRef} />
    </>
  )
}
```

此时，控制台不报警告，点击show Ref按钮，控制台打印的是undefined
原因，React.forwardRef()函数需要和useImperativeHandle(ref, ()=>{})一起使用，
将需要引用的子组件暴露出去

修改为如下：
```
import {useImperativeHandle} from 'react'
const Child = React.forwardRef((props, ref) => {
 ...

 /*
 ** useImperativeHandle(参数1， 参数2)
 **  useImperativeHandle()有两个参数：
 **  参数1：ref是暴露出去的ref
 **  参数2：回调函数，也就是父组件中通过useRef获取到的内容
 **  例如：()=>({}) 父组件中的childRef.current就是一个{}对象
 */
 useImperativeHandle(ref, ()=>({}))
})
```



#### 基于useImperativeHandle按需向外暴露成员

案例：父组件中添加一个重置按钮，点击重置按钮能够获取子组件中的引用，将子组件中的count值重置

//父组件
```
export const Father = () => {

  //定义ref并指明类型
 const childRef=useRef<{ count:number; setCount:(val:numble)=> void }>(null)

//点击按钮，打印ref的值
 const onShowRef=()=>{
  console.log(childRef.current)
 }

 //父组件能够拿到子组件的引用，同时将引用中的count数据重置
 const onReset =()=>{
   childRef.current.setCount(0) //
 }

  return (
    <>
      <h1>father组件</h1>

      <button onClick={onShowRef}>show Ref</button>
      <button onClick={onReset}>重置</button>
      <hr/>

      <Child ref={childRef} />
    </>
  )
}
```

//子组件中
```
import {useImperativeHandle} from 'react'

//使用forwardRef包裹对外被引用的子组件
const Child = React.forwardRef((props, ref) => {
 const [count, setCount]= useState(0)

/*使用useImperativeHandle函数，并指明被引用的的组件暴露的ref类型
** 从而父组件获取到的该子组件的引用是一个包含count, setCount()的对象
*/
 useImperativeHandle(ref, ()=>({
   count,
   setCount
 }))

 return(
  <>
     <h3> Child子组件: count的值：{count}</h3>
      
  </>
 )
})
```


#### useRef在子组件中控制成员暴露的粒度
在Child子组件中，我们希望对外暴露一个重置count为0的函数，而不希望直接把setCount暴露出去
因为父组件调用setCount()时，可以传任何数值，
因此，我们可以基于useImperativeHandle向外提供一个reset()函数

```
import {useImperativeHandle} from 'react'

//使用forwardRef包裹对外被引用的子组件
const Child = React.forwardRef((props, ref) => {
 const [count, setCount]= useState(0)


 useImperativeHandle(ref, ()=>({
   count,
   reset:()=>setCount(0) //向外提供的reset()
 }))

 return(
  <>
     <h3> Child子组件: count的值：{count}</h3>
      
  </>
 )
})
```

在父组件中，调用ref.current.reset()就可以把数据重置为0

#### useImperativeHandle第三个参数的三种写法

useImperativeHandle(ref, createHandle, [deps])
参数1:父组件传递的ref
参数2:是一个函数，返回的对象会自动绑定到ref上，即：子组件可以将自己内部的方法或者值通过
      useImperativeHandle添加到父组件中useRef定义的对象中
参数3:函数依赖的值(可选)，若createHandle函数中使用到了子组件内部定义的变量，则还需要将该变量作为依赖变量成为useImperativeHandle的第三个参数

其中，第三个参数有三种写法
1. 空数组：只有子组件首次被渲染时，执行useImperativeHandle中的fn回调，从而把return的对象作为父组件接收到的ref
如：
```
import {useImperativeHandle} from 'react'

//使用forwardRef包裹对外被引用的子组件
const Child = React.forwardRef((props, ref) => {
 const [count, setCount]= useState(0)


//向外暴露的count和reset函数
 useImperativeHandle(ref, ()=>{

  /* 这个console只执行1次，哪怕count值更新了，也不会重新执行
  ** 导致的结果是：外界拿到的count值，永远是组件首次渲染的初始值0
  */
   console.log('执行了useImperativeHandle的回调')
   return {
      count,
      reset:()=>setCount(0) //向外提供的reset()
   }
   
 },[] //第三个参数
 )


 return(
  <>
     <h3> Child子组件: count的值：{count}</h3>
     <button onClick={setCount((c)=> c+1)}> +1 </button>
  </>
 )
})
```


2. 依赖项数组, 依赖项变化才会触发useImperativeHandle回调函数的重新执行
```
import {useImperativeHandle} from 'react'

//使用forwardRef包裹对外被引用的子组件
const Child = React.forwardRef((props, ref) => {
 const [count, setCount]= useState(0)
 const [flg, setFlg]= useState(false)


//向外暴露的count和reset函数
 useImperativeHandle(ref, ()=>{

  /* 每当依赖项count值变化，都会触发这个回调函数重新执行
  ** 因此，父组件能拿到变化后的最新的count值
  */
   console.log('执行了useImperativeHandle的回调')
   return {
      count,
      reset:()=>setCount(0) //向外提供的reset()
   }
   
 },[count] //第三个参数，只有count值变化才会触发回调函数的重新执行
 )


 return(
  <>
     <h3> Child子组件: count的值：{count}</h3>
     <p>flg的值：{string(flg)}</p>
     <button onClick={setCount((c)=> c+1)}> +1 </button>
     <button onClick={()=> setFlg((bool)=>!bool)}> flg取反 </button>
  </>
 )
})
```



3. 省略依赖项数组，此时，组件内任何state的变化都会导致useImperativeHandle中的回调的重新执行

```
import {useImperativeHandle} from 'react'

//使用forwardRef包裹对外被引用的子组件
const Child = React.forwardRef((props, ref) => {
 const [count, setCount]= useState(0)
 const [flg, setFlg]= useState(false)


//向外暴露的count和reset函数
 useImperativeHandle(ref, ()=>{

  /* 第三个参数省略了，此时，只要组件中的任意state状态发生了变化
  **  useImperativeHandle回调都会执行
  */
   console.log('执行了useImperativeHandle的回调')
   return {
      count,
      reset:()=>setCount(0) //向外提供的reset()
   }
   
 } //第三个参数省略了
 )


 return(
  <>
     <h3> Child子组件: count的值：{count}</h3>
     <p>flg的值：{string(flg)}</p>
     <button onClick={setCount((c)=> c+1)}> +1 </button>
     <button onClick={()=> setFlg((bool)=>!bool)}> flg取反 </button>
  </>
 )
})
```


### useEffect的使用
  什么是函数的副作用
  ```
  函数的副作用是函数除了返回值外对外界环境造成的其他影响，即与组件渲染无关的操作
  例如：获取数据，修改全局变量，更新DOM 。。。
  useEffect是react中的hooks API,通过useEffect可以执行一些副作用操作，例如：
   请求数据，事件监听

   语法：
   useEffect(fn, deps?)
   参数1: fn是一个副作用函数，该函数会在每次渲染完成之后被调用
   参数2:可选的依赖项数组，这个数组的每一项内容都会被用来进行渲染前后的对比
      。当依赖项发生变化时，会重新执行fn副作用函数
      。当依赖项没有任何变化时，则不会执行fn副作用函数
  ```

#### useEffect的执行时机
一般来说，useEffect会在每次函数组件渲染完成后执行
```
  useEffect(fn, deps?)
  1.如果省略了依赖项的数组
  如：useEffect(fn)
    useEffect中的副作用函数，会在每次组件更新渲染完毕之后才执行

  2.指定了依赖项数组
  如：useEffect(fn, [dep])
    useEffect中的副作用函数，会在每次组件更新渲染完毕之后,判断依赖项是否有变化，再决定是否执行
  
  3.指定了空的依赖项数组
  如：useEffect(fn,[])
  useEffect中的副作用函数仅在组件首次渲染完毕之后执行唯一的一次
```

#### useEffect的使用注意事项
1.不要在useEffect中改变依赖项的值，会造成死循环
2.多个不同功能的副作用尽量分开声明，不要写到一个useEffect中

#### 如何清理副作用
useEffect可以返回一个函数，用于清除副作用的回调

```
useEffect(()=>{
  //1.执行副作用操作
 //2.返回一个清理副作用的函数

 return ()=>{ /*在这里执行清理操作*/ }
},[依赖项])
```

实际应用场景：如果当组件中使用了定时器或绑定了事件监听程序
 可以在返回的函数中清理定时器或解绑监听程序


 ### useLayoutEffect
 useLayoutEffect与useEffect的对比
 1. 用法相似
  1）useLayoutEffect接收一个函数和一个依赖项数组作为参数
  2）只有在数组中的依赖项发生改变时才会再次执行副作用操作
  3）useLayoutEffect也可以返回一个清理函数

 2. 区别
 1）执行时机：
  useEffect: 在浏览器重新绘制屏幕之后触发
  useLayoutEffect: 在浏览器重新绘制屏幕之前触发

 2）执行过程
 useEffect: 异步执行，不阻塞浏览器绘制
 useLayoutEffect: 同步执行，阻塞浏览器重新绘制

 useLayoutEffect中的代码以及其中任何计划的状态更新都会在浏览器重新绘制屏幕之前得到处理

 示例：点击按钮，把num设置为0，当页面更新完成后，判断num是否等于0
      如果等于0，则在useEffect中把num赋值为随机数

```
import { useTranslation } from "react-i18next";
import React,{useState, useEffect, useLayoutEffect} from "react";

const Com= ()=>{
  const { t } = useTranslation();
  const [num, setNum]=useState(Math.random()*5)
  const [type, setType]=useState(0)

  useLayoutEffect(()=>{
   if(num==0){
    setNum(Math.random()*5)
   }
  })

  return (
    <>
     <h2>Com组件</h2>
     <p>num的值：{num}</p>
     <br/>
     <button onClick={()=> setNum(0)}>按钮</button>
    </>
  )
}

export default Com
 

```

### useReducer
当状态更新逻辑较复杂时可以考虑使用useReducer,useReducer可以同时更新多个状态
而且能把对状态的修改从组件中独立出来
相比于useState,useReducer可以更好的描述"如何更新状态"
例如：组件负责发出行为，useReducer负责更新状态

#### useReducer的语法格式
const [state, dispatch]=useReducer(reducer,initState,initAction)

其中：1.reducer是一个函数，类似于(prevState,action) => newState
     形参prevState表示旧状态， action表示本次的行为，返回newState表示处理完毕的新状态
     2.initState表示初始状态，也就是默认值
     3.initAction是进行状态初始化时的处理函数，它是可选的，如果提供了initAction函数
     则会把initState传递给initAction函数进行处理，initAction的返回值会被当做初始状态
     4.返回值state是状态值，dispatch是更新state的方法，让它接收action作为参数
      useReducer只需要调用dispatch(action)方法传入的action即可更新state

1. 定义组件的基础结构
一个父组件Father,其中包括两个子组件Son1、Son2

```
//父组件Father
import React from 'react'
import { Son1} from './Son1'
import { Son2 } from './Son2'
import './father.scss'

 const Father: React.FC = () => {

  return (
    <div>
      <button>修改用户名</button>
      <div className="father">
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}

export default Father

//子组件Son1
import React from 'react'

export const Son1: React.FC = () => {

  return (
    <div className="son1">
    </div>
  )
}


//子组件Son2
import React from 'react'

export const Son2: React.FC = () => {

  return (
    <div className="son2">
    </div>
  )
}
```

2. 定义reducer的基础结构
```
import React from 'react'

//定义state类型
type UserType= typeof defaultState

// 初始状态
const defaultState = { name: '张三', age: 0 }

// 在 reducer 函数的形参中：
// 第一个参数，永远都是上一次的旧状态
const reducer = (prevState: UserType) => {
    
    console.log('触发了reducer的执行')
    //在reducer函数中，必须向外返回一个处理好的新状态
      return prevState
  
}

```

在Father组件中使用useRedux
```
import {reducer, defaultState} from '../Redux'

 const [ state ]= useReducer(reducer, defaultState)

 console.log(state)
```

这样在father组件中能拿到初始化的state的状态值，但是不会触发reducer()函数的执行


#### useReducer的第三个参数 initAction

使用 initAction 处理初始数据
定义名为 initAction 的处理函数，如果初始数据中的 age 为小数、负数、或 0 时，对 age 进行非法值的处理：

```

type UserType= typeof defaultState
// 初始状态
export const defaultState = { name: '张三', age: -5 }

//初始化action
export const initAction=(initState: UserType)=>{
  // 把 return 的对象，作为 useReducer 的初始值
  return { ...initState, age: Math.round(Math.abs(initState.age)) || 18 }
}



```
在组件中使用：在定义 defaultState 时，age=-5 提供非法值，可以看到非法值在 initAction 中被处理掉了。
```
 const [ state ]= useReducer(reducer, defaultState, initAction)
   console.log(state) //此时初始化的state为{name:'张三',age:5}

```

#### 在 Father 组件中点击按钮修改 name 的值

修改useReducer中的状态，需要通过dispatch派发action的方式去修改，而不能直接修改state
1. 修改reducer函数，添加一个action参数
```

export const reducer = (prevState: UserType, action) => {

      console.log(`reducer被触发了`)
      switch(action.type){
       
        case 'UPDATE_NAME':
          return { ...prevState, name: action.payload}
        
        // 如果没有匹配到任何操作，则默认返回上一次的旧状态
        default:
          return prevState
      }
  
}
```

2. 在组件中使用dispatch派发action进行修改
```
//useReducer返回的第二个值dispatch可以派发action,修改状态
const [ state, dispatch ]= useReducer(reducer, defaultState, initAction)
   console.log(state)


   const changeName=()=>{
    dispatch({type:'UPDATE_NAME',payload:'李四'})
   }

  return (
    <div>
      <button onClick={changeName}>修改用户名</button>
      <div className="father">
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
```

#### 把用户信息渲染到子组件中
1. 在 Father 父组件中，通过展开运算符把 state 数据对象绑定为 Son1 和 Son2 的 props 属性：

```
 return (
    <div>
      <button onClick={changeName}>修改用户名</button>
      <div className="father">
        <Son1 {...state}/>  //将state传递给子组件
        <Son2 {...state}/>
      </div>
    </div>
  )
```


2. 在子组件中，指定 props 的类型为 React.FC<UserType>，并使用 props 接收和渲染数据：
```
export const Son1: React.FC<UserType> = (props) => {

  return (
    <div className="son1">
      <p>用户信息</p>
      <p>{JSON.stringify(props)}</p>
    </div>
  )
}
```
修改完成后，点击父组件中的 button 按钮修改用户名，我们发现两个子组件中的数据同步发生了变化

#### 在子组件中实现点击按钮 age 自增操作
1. 扩充 ActionType 的类型
2. 在 reducer 中添加 年龄自增 的 case 匹配

```
// 扩充 ActionType 的类型
export type ActionType = { type:'UPDATE_NAME', payload:string} |{type:'ADD_AGE', payload:number}

export const reducer = (prevState: UserType, action: ActionType) => {

      console.log(`reducer被触发了`)
      switch(action.type){
       
        case 'UPDATE_NAME':
          return { ...prevState, name: action.payload}
        
        //年龄自增
        case 'ADD_AGE':
          return { ...prevState, age: prevState.age + action.payload}
        
        // 如果没有匹配到任何操作，则默认返回上一次的旧状态
        default:
          return prevState
      }
  
}


```
在子组件中添加年龄自增的方法
```
 const addAge=()=>{
  
  /*
  **现在的问题是：
  **  子组件 Son1 中无法调用到父组件的 dispatch 函数。
  **  为了解决这个问题，我们需要在 Father 父组件中，通过 props 把父组件中的 dispatch 
  **   传递给子组件
  */

  
  }

  return (
    <div className="son1">
      <p>用户信息</p>
      <p>{JSON.stringify(user)}</p>
      <button onClick={addAge}>年龄自增</button>
    </div>
  )

```

从父组件中把dispatch传递给子组件

```
 return (
    <div>
      <button onClick={changeName}>修改用户名</button>
      <div className="father">
        //父组件将dispatch传递给子组件
        <Son1 {...state} dispatch={dispatch}/>
        <Son2 {...state}/>
      </div>
    </div>
  )
```

//子组件中
```

import {UserType, ActionType} from '../Redux'

//子组件为UserType与 dispatch交叉类型
export const Son1: React.FC<UserType & { dispatch: React.Dispatch<ActionType> }> = (props) => {

  //解构出props中的dispatch类型,其余都有user接收
   const { dispatch, ...user }= props
   
  const addAge=()=>{
    //派发年龄自增的action
   dispatch({type:'ADD_AGE', payload:1})
  }

  return (
    <div className="son1">
      <p>用户信息</p>
      <p>{JSON.stringify(user)}</p>
      <button onClick={addAge}>年龄自增</button>
    </div>
  )
}
```


### useContext的使用
在 react 函数式组件中，如果组件的嵌套层级很深，当父组件想把数据共享给最深层的子组件时，传统的办法是使用 props，一层一层把数据向下传递。

使用 props 层层传递数据的维护性太差了，我们可以使用 React.createContext() + useContext() 轻松实现多层组件的数据传递。

#### useContext 的语法格式
主要的使用步骤如下：

1.在全局创建 Context 对象
2.在父组件中使用 Context.Provider 提供数据
3.在子组件中使用 useContext 使用数据

```
import React, { useContext } from 'react'

// 全局
const MyContext = React.createContext(初始数据)

// 父组件
const Father = () => {
  return <MyContext.Provider value={{name: 'escook', age: 22}}>
    <!-- 省略其它代码 -->
  </MyContext.Provider>
}

// 子组件
const Son = () => {
  const myCtx = useContext(MyContext)
  return <div>
    <p>姓名：{myCtx.name}</p>
    <p>年龄：{MyCtx.age}</p>
  </div>
}
```

#### 使用useContext
定义 LevelA，LevelB，LevelC 的组件结构如下：

```
import React, {useState} from 'react'
import LevelB from './LevelB'
import './level.scss'

 const LevelA: React.FC = () => {
  const [count, setCount]= useState(0)

  const addCount=()=>{
    
  }

  return (
    <div className='level'>
      <p>count的值是:{count}</p>
      <button onClick={addCount}> +1 </button>
      <LevelB></LevelB>
    </div>
  )
}

export default LevelA



//===================================

import React from 'react'
import LevelC from './LevelC'

 const LevelB: React.FC = () => {

  const addCount=()=>{
    
  }

  return (
    <div className='level_con1'>
      <LevelC></LevelC>
    </div>
  )
}

export default LevelB


//=================================

import React from 'react'

 const LevelC: React.FC = () => {

  const addCount2=()=>{
    
  }

  const reset=()=>{
    
  }

  return (
    <div className='level_con2'>
      <button onClick={addCount2}> +1 </button>
      <button onClick={reset}> 重置 </button>
    </div>
  )
}

export default LevelC
```

createContext配合useContext使用
```

```
