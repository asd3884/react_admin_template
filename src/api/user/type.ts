//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

interface dataType {
  token: string
}

//登录返回
export interface loginResponseData {
  code: number
  data: dataType
}
//定义登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: string
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}

//定义获取用户信息返回数据类型
export interface userInfoReponseData {
  code: number
  data: user
}
