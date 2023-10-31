import { useTranslation } from "react-i18next";
import { Menu, Button } from 'antd';
import { MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons'
import { connect } from "react-redux";
import { updateCollapse } from "@/store/modules/global/action";
import './index.scss'

const LayoutMenu =(props:any)=>{
  const { t } = useTranslation();
  const { SubMenu } = Menu;
  const {isCollapse}= props

  return (
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={isCollapse}
        >
          {/**没有子节点的菜单标签 */}
          <Menu.Item key="1">
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <span>Option 3</span>
          </Menu.Item>
          {/*** 有子节点的菜单标签*/}
          {/** 
          <SubMenu
            key="sub1"
            title={
              <span>
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>*/}
          
        </Menu>
  )

}

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);