import { useTranslation } from "react-i18next";
import React from 'react'

const Home= ()=>{
  const { t } = useTranslation();

  return (
    <>
     <h2>{t("home.main")}</h2>
    </>
  )
}

export default Home
