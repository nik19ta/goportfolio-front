import React, { useState } from "react"

import { Link } from "react-router-dom";
import { LoginBody } from "../../interfaces/auth";
import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../features/auth/authSlice";
import { useTranslation } from 'react-i18next';

import styles from "../../styles/auth/Auth.module.css"

const Login: React.FC = () => {
    const dispatch = useAppDispatch()

    const {t, i18n} = useTranslation()

    const [mail, setmail] = useState("")
    const [password, setpassword] = useState("")

    const onFinish = (values: LoginBody) => {
        dispatch(loginUser(values))
    };
    
    return (
        <div className={styles.container} >
          <p className={styles.title} > {t("auth.login_title")} </p>

          <div className={styles.login_form} >
            <div className={styles.form__item} >
              <p>{t("auth.form.email")}</p>
              <input onChange={(e) => setmail(e.target.value)} type="text" placeholder={t("auth.form.email_placeholder")} />
            </div>
            <div className={styles.form__item} >
              <p>{t("auth.form.password")}</p>
              <input onChange={(e) => setpassword(e.target.value)} type="password" placeholder={t("auth.form.password_placeholder")} />
            </div>

            <button onClick={() => onFinish({
              mail: mail,
              password: password,
            })} className={styles.submit_btn} type="submit" >{t("auth.form.login_submit_btn")}</button>
          </div>

          <div className={styles.login_to_another_form} >
            <p>{t("auth.form.no_account")}</p>
            <Link to="/auth/registration" >{t("auth.form.create_account")}</Link>
          </div>
        </div>
    )
}

export default Login