
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { reqLogin, reqUserInfo } from '@/api/user'
import { loginFormData } from '@/api/type'
import { useRoutes,useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setToken, setMenuList } from "@/store/modules/global/action";
import {useMenus} from '@/hooks/useMenus'

const LoginForm = (props: any) => {
	const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const HOME_URL: string = "/home/index";
  const { setToken, setMenuList }= props
  const  { getMenuList }  = useMenus();

	// 登录
    const onFinish = async (loginForm: loginFormData) => {
    const result= await reqLogin(loginForm)
    if(result.code==200 || result.code==20000){
      message.success("登录成功！")
      try {

        getMenuList().then(res=>{
          setMenuList(res)
        })

      } catch (error) {
        console.log(`----error`,error)
      }
      setToken(result.data.token)
      navigate(HOME_URL)
    }
  };

	const onFinishFailed = () => {

	};

	return (
		<Form
      className="login_form"
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
      <h1>Hello</h1>
      <h2>欢迎来到硅谷甑选</h2>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login_btn">
         {/** 
				<Button
					onClick={() => {
						form.resetFields();
					}}
					icon={<CloseCircleOutlined />}
				>
					{t("login.reset")}
				</Button>
        */}
				<Button type="primary" htmlType="submit" icon={<UserOutlined />}>
					{t("login.confirm")}
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setToken, setMenuList };
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
