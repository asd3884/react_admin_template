import React from 'react';
import { Outlet } from "react-router-dom";
import { Layout, Space, Card } from 'antd';
import LayoutMenu from './layoutMenu/index';
import LayoutHeader from './layoutHeader';
import { connect } from "react-redux";
import { updateCollapse } from "@/store/modules/global/action";
import './index.scss'

const LayoutIndex =(props: any)=>{
  const { Footer, Sider, Content } = Layout;
  const {isCollapse, updateCollapse}= props
  return (
   <Layout className='layout_container'>
      <Sider trigger={null}  collapsed={isCollapse} width={220}>
        <LayoutMenu></LayoutMenu>
      </Sider>
      <Layout>
        <LayoutHeader></LayoutHeader>
        <Content>
          <Card bordered={false} style={{margin:10 }}>
           <Outlet></Outlet>
          </Card>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);