import React, { useState } from "react"

import { Link } from "react-router-dom";
import { RegistrationBody } from "../../interfaces/auth";
import { useAppDispatch } from "../../app/hooks";
import { registrationUser } from "../../features/auth/authSlice";
import { useTranslation } from 'react-i18next';

import styles from "../../styles/auth/Auth.module.css"

const Registration: React.FC = () => {
    const dispatch = useAppDispatch()

    const {t, i18n} = useTranslation()

    const [mail, setmail] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const onFinish = (values: RegistrationBody) => {
        dispatch(registrationUser(values))
    };
    
    return (
        <div className={styles.container} >
          <p className={styles.title} > {t("auth.reg_title")} </p>

          <div className={styles.login_form} >
            <div className={styles.form__item} >
              <p>{t("auth.form.email")}</p>
              <input onChange={(e) => setmail(e.target.value) } type="text" placeholder={t("auth.form.email_placeholder")} />
            </div>
            
            <div className={styles.form__item} >
              <p>{t("auth.form.username")}</p>
              <input onChange={(e) => setusername(e.target.value) } type="text" placeholder={t("auth.form.username_placeholder")} />
            </div>

            <div className={styles.form__item} >
              <p>{t("auth.form.password")}</p>
              <input onChange={(e) => setpassword(e.target.value) } type="password" placeholder={t("auth.form.password_placeholder")} />
            </div>

            <button onClick={() => onFinish({
              shortname: username,
              mail: mail,
              password: password,
              fullname: "",
            })} className={styles.submit_btn} type="submit" >{t("auth.form.reg_submit_btn")}</button>
          </div>

          <div className={styles.login_to_another_form} >
            <p>{t("auth.form.already_have_an_account")}</p>
            <Link to="/auth/login" >{t("auth.form.sign_in")}</Link>
          </div>
        </div>
    )
}

export default Registration