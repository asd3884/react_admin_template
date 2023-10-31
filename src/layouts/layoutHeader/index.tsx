import { Layout } from "antd";
import { MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons'
import CollapseIcon from '../components/collapseIcon'
import Language from './components/Language'
import FontSize from './components/FontSize'
import ThemeSet from './components/ThemeSet'
import MaxScreen from "./components/MaxScreen";
import './index.scss'

const LayoutHeader=()=>{
const { Header } = Layout;

  return(
   <Header>
      <div className="header_left">
        <CollapseIcon ></CollapseIcon>
      </div>
      <div className="header_right">
         <FontSize></FontSize>
         <Language></Language>
         <ThemeSet></ThemeSet>
         <MaxScreen></MaxScreen>
      </div>
   </Header>
  )
}

export default LayoutHeader