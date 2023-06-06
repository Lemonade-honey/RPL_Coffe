export function setCookie(cookieName, cookieValue, expiredDay = 30){
    let expired = new Date;
    expired.setTime(expired.getTime() + 1000 * 3600 * 24 * expiredDay) //set selama 1 bulan
    expired.toUTCString();
    let cookie = cookieName + "=" + cookieValue + ";" + "expires=" + expired + ";"

    document.cookie = cookie
}

export function getCookie(cookieName, urutan = 0){
    let match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'))
    if(match){
        let split = match[2].split("=")
        return split[urutan]
    }else{
        return null
    }
}

// export function validateCookieCostumer() {
//     if(getCookie('costumer') == null || getCookie('costumer') == ''){
//         return false
//     }else{
//         return true
//     }
// }