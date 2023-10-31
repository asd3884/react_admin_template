import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ConfigProvider } from "antd";
import { connect } from "react-redux";
import { HashRouter } from "react-router-dom";
import { setLanguage } from "@/store/modules/global/action";
import Router from "@/router/index";
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import i18n from "i18next";
import "moment/dist/locale/zh-cn";

import {RemoveIcon, LoveIcon } from '@/components/IconImage'

/**
 * 
 * react-router-dom V6中启用全局路由模式
 * 全局路由有常用两种路由模式可选：HashRouter 和 BrowserRouter 
 * 当前我们采用HashRouter
 */

function App(props: any) {
  const [i18nLocale, setI18nLocale] = useState(zhCN);
  const {language, setLanguage}=props

  useEffect(() => {
		// 全局使用国际化
		i18n.changeLanguage(language);
		setLanguage(language);
    console.log("语言切换", language)
	}, [language]);

  return (
    <HashRouter>
      <ConfigProvider locale={i18nLocale}>
      <Router></Router>
      </ConfigProvider>
    </HashRouter>
  )
}

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps,mapDispatchToProps)(App);
