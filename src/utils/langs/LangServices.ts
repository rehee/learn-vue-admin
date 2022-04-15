import { App } from 'vue';
import { createI18n, I18n } from 'vue-i18n'
// import { Messages, AddLangMessage } from './LangObjConvert'
import { useGlobSetting } from '@/hooks/setting';
// import { global } from '@/langs/lang-pack/global';
// import { getEnv } from '../../../vite.config'
let i18n: I18n<{}, unknown, unknown, true>;
function getLangs(local?: string, fallbackLocal?: string): I18n<{}, unknown, unknown, true> {
    const messageString = useGlobSetting().locals;
    if (!i18n) {
        i18n = createI18n({
            locale: local ?? 'en',
            fallbackLocale: fallbackLocal ?? 'en',
            messages: messageString?JSON.parse(messageString):{},
        });
        // console.log(Messages);
        // console.log(global);
        // AddLangMessage(global);
    }
    return i18n;
}
export function AddLangs(app: App<Element>, local?: string, fallbackLocal?: string) {
    // console.log(getEnv());
    app?.use(getLangs(local, fallbackLocal));

}

export class Langs {
    static t(key: string): string {
        return getLangs().global.t(key);
    }
    static s(lang: string): void {
        getLangs().global.locale = lang;
    }
}

