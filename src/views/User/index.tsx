import { useTranslation } from "react-i18next";
import React,{useState, useEffect, useLayoutEffect} from "react";
const User= ()=>{
  const { t } = useTranslation();

  return (
    <>
     <h2>{t("user.main")}</h2>
    
    </>
  )
}

export default User
 