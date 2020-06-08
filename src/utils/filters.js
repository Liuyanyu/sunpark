const prefixUrl = (url) => {
    return /http/.test(url) ? url : 'http://weixin.sun-park.com/app/icons' + url
}

const formatText = (text) => {
    return text ? text.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;') : ''
}

const formatContent = (text) => {
    return text
}

const todu = (n) => n < 10 ? '0' + n : n

const getScrollTop = () => document.body.scrollTop || document.documentElement.scrollTop

const openLink = (link) => {
    if(link){
        window.open(link)
    }
}

export {
    formatText,
    prefixUrl,
    todu,
    getScrollTop,
    openLink
}