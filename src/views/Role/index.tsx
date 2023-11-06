import { useTranslation } from "react-i18next";

const Role= ()=>{
  const { t } = useTranslation();
  return (
    <>
     <h2>{t("role.main")}</h2>
    </>
  )
}

export default Role
