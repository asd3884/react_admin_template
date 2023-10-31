import { useTranslation } from "react-i18next";

const Home= ()=>{
  const { t } = useTranslation();
  return (
    <>
     <h2>{t("home.main")}</h2>
    </>
  )
}

export default Home
