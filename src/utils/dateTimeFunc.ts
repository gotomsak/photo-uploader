import * as store from '../store'

export function nowTimeUpdate(){
    let now: Date = new Date()
    store.nowTime.year = now.getFullYear()
    store.nowTime.month = now.getMonth() + 1
    store.nowTime.date = now.getDate()
    store.nowTime.hour = now.getHours()
    store.nowTime.minute = now.getMinutes()
    store.nowTime.second = now.getSeconds()
}
