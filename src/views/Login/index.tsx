import React,{useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import LoginForm from "./LoginForm";
import './login.scss'
;

function Login (){
  return (
   <div className='login_container'>
    <Row>
      <Col span={12} xs={0} sm={4} md={8} lg={12} ></Col>
      <Col span={12} xs={24} sm={20} md={16} lg={12}>
        <LoginForm></LoginForm>
      </Col>
    </Row>
   </div>
  )
}

export default Login