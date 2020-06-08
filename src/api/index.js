
import axios from 'axios'
import qs from 'qs'
const { API_ROOT } = process.env

export default {
    // 公园介绍
    getAboutCn() {
      return axios.post(API_ROOT + 'read/ours/aboutCn')
    },
    // 人才招聘
    getJobCn() {
        return axios.post(API_ROOT + 'read/ours/jobCn')
    },
    // 招商合作
    getCooperationCn() {
        return axios.post(API_ROOT + 'read/ours/cooperationCn')
    },
    // 友情链接
    getFriendCn() {
        return axios.post(API_ROOT + 'read/ours/friendCn')
    },
    // 联系我们
    getContactCn() {
        return axios.post(API_ROOT + 'read/ours/contactCn')
    },
    queryNews(pgaeNum, selectYear, selectMonth) {
        return axios.post(API_ROOT + 'read/ours/news', qs.stringify({
            pager: pgaeNum,
            selectYear,
            selectMonth
        }))
    },
    getNews(id) {
        return axios.post(API_ROOT + 'read/ours/news/info', qs.stringify({
            newsId: id
        }))
    },
    setHelp(name, form) {
        if (name === 'help') {
            form.helpContent = form.content
        } else if (name === 'advice') {
            form.adviceContent = form.content
        }
        return axios.post(API_ROOT + 'write/service/' + name, qs.stringify(form))
    },
    queryHelp(name, pageNum) {
        return axios.post(API_ROOT + 'write/service/' + name + '/list', qs.stringify({
            pager: pageNum
        }))
    },
    // 交通指南
    getLocationCn() {
        return axios.post(API_ROOT + 'read/service/locationCn')
    },
    getLocationEn() {
        return axios.post(API_ROOT + 'read/service/locationEn')
    },
    // 购票须知
    getTicketCn() {
        return axios.post(API_ROOT + 'read/service/ticketCn')
    },
    getTicketEn() {
        return axios.post(API_ROOT + 'read/service/ticketEn')
    },
    // 入园须知
    getNoticeCn() {
        return axios.post(API_ROOT + 'read/service/noticeCn')
    },
    // 门区分布
    getDoorCn() {
        return axios.post(API_ROOT + 'read/service/doorCn')
    },
    // 停车场
    getParkingCn() {
        return axios.post(API_ROOT + 'read/service/parkingCn')
    },
    // 医务室
    queryInfirmaryCn() {
        return axios.post(API_ROOT + 'read/service/infirmaryCn')
    },
    // 卫生间
    getToiletCn() {
        return axios.post(API_ROOT + 'read/service/tolietCn')
    },
    // 服务电话
    getTelCn() {
        return axios.post(API_ROOT + 'read/service/telCn')
    },
    // 周边服务
    queryPeripheryCn() {
        return axios.post(API_ROOT + 'read/service/peripheryCn')
    },
    // 游客服务中心
    getCentreCn() {
        return axios.post(API_ROOT + 'read/service/centreCn')
    },
    queryActivity(pageNum, activityType) {
        return axios.post(API_ROOT + 'read/activity/news', qs.stringify({
            pager: pageNum,
            activityType
        }))
    },
    getActivity(id) {
        return axios.post(API_ROOT + 'read/activity/news/info', qs.stringify({
            activityId: id
        }))
    },
    queryBookingOther(pageNum) {
        return axios.post(API_ROOT + 'read/booking/others', qs.stringify({
            pager: pageNum
        }))
    },
    queryBookingSite(pageNum) {
        return axios.post(API_ROOT + 'read/booking/sites', qs.stringify({
            pager: pageNum
        }))
    },
    queryFacilitys(pageNum) {
        // facilitys
        return axios.post(API_ROOT + 'read/booking/amusement/facilitys', qs.stringify({
            pager: pageNum
        }))
    },
    queryFacilityPackage(pageNum) {
        return axios.post(API_ROOT + 'read/booking/amusement/facility/packages', qs.stringify({
            pager: pageNum
        }))
    },
    queryBanner(bannerType) {
        return axios.post(API_ROOT + 'read/home/banners', qs.stringify({
            bannerType
        }))
    },
    getRaidersBanner(){
        return axios.post(API_ROOT + 'read/raiders/banner')
    },
    queryHomeList() {
        return axios.post(API_ROOT + 'read/home/list')
    },
    //开放时间
    getOpenTimeCn() {
        return axios.post(API_ROOT + 'read/raiders/timeCn')
    },
    queryRecommend() {
        return axios.post(API_ROOT + 'read/raiders/recommend')
    },
    queryScenic() { //景点分布
        return axios.post(API_ROOT + 'read/raiders/scenic')
    },
    getScenic(id) { //景点分布详情
        return axios.post(API_ROOT + 'read/raiders/scenic/photo', qs.stringify({
            scenicId: id
        }))
    },
    queryTraffic() { //园内交通列表
        return axios.post(API_ROOT + 'read/raiders/traffics')
    },
    getTrafficLocation(id) { //园内交通位置列表
        return axios.post(API_ROOT + 'read/raiders/traffic/location', qs.stringify({
            trafficId: id
        }))
    },
    getTrafficVehicle(id) { //园内交通内容列表
        return axios.post(API_ROOT + 'read/raiders/traffic/vehicle', qs.stringify({
            trafficId: id
        }))
    },
    queryStall() { //摊位分布列表        
        return axios.post(API_ROOT + 'read/raiders/stalls')
    },
    getStall(id) { //摊位分布位置列表
        return axios.post(API_ROOT + 'read/raiders/stall/sell', qs.stringify({
            stallId: id
        }))
    },
    getStallCommodity(id) { //摊位分布位置列表
        return axios.post(API_ROOT + 'read/raiders/stall/commodity', qs.stringify({
            stallId: id
        }))
    },
    queryScenic() { //景点分布查询
        return axios.post(API_ROOT + 'read/raiders/scenic')
    },
    getScenic(id) { //分布查询
        return axios.post(API_ROOT + 'read/raiders/scenic/photo', qs.stringify({
            scenicId: id
        }))
    },
    getThemeProject(id) { //分布查询
        return axios.post(API_ROOT + 'read/theme/activity', qs.stringify({
            activityId: id
        }))
    },
    getWeather() { //天气    
        return axios.post(API_ROOT + 'read/chaoyang/weather')
    },
}