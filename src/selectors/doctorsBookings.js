import moment from 'moment';

// Get visible expenses

export default (schedule, day) => {
    schedule = schedule.filter((booking) => {
        const isBookingOnTheSameDay = moment(booking).isSame(day, 'day')
        //console.log(isBookingOnTheSameDay)
        return isBookingOnTheSameDay
    })
    const slots = [true, true, true, true, true, true, true, true, true, true, true, true,]
    schedule.map((booking) => {
        const startOfSelectedDay = moment(day).startOf('day').valueOf()
        const difference = moment(booking).diff(startOfSelectedDay, 'minutes')
        const calculateSlot = ((difference - 480) / 30)
        slots[calculateSlot] = false
    })
    //translates slots array to usable dailyCalendar array
    const newDailyCalendar = []
    const slotTexts = ["08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00", "13:00 - 13:30", "13:30 - 14:00"]

    slots.map((slot, index) => {
        if (slot == true) newDailyCalendar[index] = { available: true, hours: slotTexts[index] }
        else newDailyCalendar[index] = { available: false, hours: slotTexts[index] }
    })
    

    return newDailyCalendar;



};