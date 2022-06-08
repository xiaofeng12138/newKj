export function fromate(time) {
    var date = time.slice(0, 8),
        Time = time.slice(8, time.length);
    var year = date.slice(0, 4),
        mouth = date.slice(4, 6),
        day = date.slice(6, 8),
        hour = Time.slice(0, 2),
        min = Time.slice(2, 4),
        sced = Time.slice(4, 6);
    return `${year}-${mouth}-${day} ${hour}:${min}:${sced}`
}
export function ratio(timeArr, attrName) {
    if (timeArr.length <= 0) {
        return false
    }
    var endTime = new Date(timeArr[timeArr.length - 1][attrName]) // 结束时间
    var startTime = new Date(timeArr[0][attrName]) // 起始时间
    var allTime = endTime - startTime
    timeArr.forEach((item) => {
        var frag = new Date(item[attrName]) - startTime
        item.left = Math.floor(frag * 100000 / allTime) / 1000 + '%'
    });
}
export function getNextTime(time, number) {
    var timeInterval = {
        startDate: '',
        endDate: ''
    }
    if (time && number) {
        var year = time.getFullYear()
        var mouth = time.getMonth() + 1
        var date = time.getDate()
        var startMouth = mouth - number
        var startYear = year

        mouth = mouth < 10 ? '0' + mouth : mouth;


        if (startMouth > 0 && startMouth < 10) {
            startMouth = '0' + startMouth
        } else if (startMouth <= 0) {
            startYear = startYear - Math.ceil(number / 12);
            startMouth = 12 + (mouth - (number % 12));
        }
        var d = new Date(startYear, startMouth, 0);
        var date2 = d.getDate();
        
        date2 = date2 >= date ?  date : date2
        timeInterval.startDate=''+startYear+startMouth+(date2<10?'0'+date2:date2)
        timeInterval.endDate=''+year+mouth+(date<10?'0'+date:+date)
    } 
    return timeInterval
}
