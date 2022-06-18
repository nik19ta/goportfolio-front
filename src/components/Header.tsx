import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "../styles/Header.module.css"

const Header: FC = () => {

  const {t, i18n} = useTranslation()

  const [theme, set_theme] = useState("light")
  const [lang, set_lang] = useState("EN")

  const chenge_lang = (lang: "en" | "ru") => {
    console.log(lang);
    
    i18n.changeLanguage(lang)
    set_lang(lang)
  }

  return (
    <div className={styles.header} >
      <div className={styles.top_menu} >
        <div className={styles.toggle} >
          <div onClick={() => set_theme("light")} className={`${styles.toggle__item} ${theme === "light" && styles.active}`} >light</div>
          <div onClick={() => set_theme("dark")} className={`${styles.toggle__item} ${theme !== "light" && styles.active}`} >dark</div>
        </div>
        <div className={styles.toggle} >
          <div onClick={() => chenge_lang("ru")} className={`${styles.toggle__item} ${lang === "ru" && styles.active}`} >ru</div>
          <div onClick={() => chenge_lang("en")} className={`${styles.toggle__item} ${lang === "en" && styles.active}`} >en</div>
        </div>
      </div>
      <div className={styles.bottom_menu} >
        <p>{t("portfolio.title")}</p>
      </div>
    </div>
  )
}

export default Header