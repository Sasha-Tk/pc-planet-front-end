import {createContext, useContext, useEffect, useState} from "react";

const LanguageContext = createContext<any>(null);
export const Language = (props: any) => {
    const [language, setLanguage] = useState(localStorage.getItem("language") || 'ua');
    useEffect(() => {
        localStorage.setItem("language", language)
    }, [language]);


    const translate = (key: any) => {
        const translations: any = {
            en: require('../localization/en.json'),
            ua: require('../localization/ua.json')
        };
        return translations[language][key] || key;
    }
    return (
        <LanguageContext.Provider value={{language, setLanguage, translate}}>
            {props.children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    return useContext(LanguageContext);
}

