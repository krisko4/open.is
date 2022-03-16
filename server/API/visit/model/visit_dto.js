const { format, isToday, isYesterday } = require('date-fns')

const visitDto = (visitData) => {
    const total = visitData[0].metadata[0].total
    const visits = visitData[0].data
    const visitsToday = visits.filter(visit => isToday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0)
    const visitsYesterday = visits.filter(visit => isYesterday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0)
    return {
        total: total,
        today: visitsToday,
        yesterday: visitsYesterday,
        visits: visits.map(visit => ({
            ...visit,
            date: format(visit.date, 'yyyy-MM-dd HH:mm:ss')
        }))
    }
}

const allVisitsDto = (visitData) => {
    const total = visitData[0].total[0].total
    const today = visitData[0].today[0].today
    const visitArray = visitData[0].data
    for (const visitObj of visitArray) {
        for (const visit of visitObj.visits) {
            visit.date = format(visit.date, 'yyyy-MM-dd HH:mm:ss')
        }
    }
    return {
        total: total,
        today: today,
        locations: visitArray
    }
}

module.exports = { visitDto, allVisitsDto }