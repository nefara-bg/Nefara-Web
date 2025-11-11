import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "@/translation/en.json"
import bg from "@/translation/bg.json"

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    debug: true,

    resources: {
        en: { translation: en },
        bg: { translation: bg },
    }
})

export default i18n