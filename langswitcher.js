/**
 * Created by Alexander Skobeltsyn on 15.01.2016.
 * Light script to switch site to Russian speakers
 *
 * ----------------Usage---------------
 * Include script in top of website
 * First time script autodetect the prefer language based on browser setting
 * If user in Post-Soviet area, then redirect to hostname.com/ru/
 * else in hostname.com/
 *
 * You can easily change it to working with sub domain like: ru.hostname , in bottom of this script
 *
 */
(function () {
    var language, language_needed, lanuage_actual,params;

    var getCookie = function (name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    if (!getCookie('langDetected')) {
        /*functions*/
        var getActualLanguage, setCookie;
        /* Post-Soviet states ISO-codes*/
        var ru_speakers_iso_codes = ['RU', 'UK', 'BE', 'HY', 'AZ', 'ET', 'KA','LV', 'LT', 'TK', 'TG','UZ'];


        setCookie = function(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays.expires*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";domain=."+window.location.host+";path=/;" + expires;
        }


        getActualLanguage = function (lang) {
            if (ru_speakers_iso_codes.indexOf(lang) >= 0) {
                return 'ru';
            }
            return 'en';
        }

        /*
         If user press button to change language, set cookie and don't make auto check
         Then first time detection complete, set cookie and don't checking next time
         */

        language = navigator.language || navigator.browserLanguage;
        language_needed = getActualLanguage(language.toUpperCase());
        params =  window.location.pathname.split('/'); //return first word after host url, e.g.: sitename.com/ru - return ru
        lanuage_actual = params[1];
        if (params.length<=3 && language_needed != lanuage_actual && (lanuage_actual == 'ru' || lanuage_actual==undefined)) {
            if (language_needed == 'en') {
                setCookie('langDetected', 'en', {
                    expires: 100
                });
                window.location = window.location.protocol + '//' + window.location.host;
            } else {
                setCookie('langDetected', 'ru', {
                    expires: 100
                });
                window.location = window.location.protocol + '//' + window.location.host + '/ru';
            }
        } else {
            setCookie('langDetected', language_needed, {
                expires: 100
            });
        }
    }
}());