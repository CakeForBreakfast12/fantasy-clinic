import moment from 'moment';

// Get visible expenses

export default (schedule, day) => {

    //Filters the arrey of appointments to only those thate are on the selected day
    schedule = schedule.filter((booking) => {
        const isBookingOnTheSameDay = moment(booking).isSame(day, 'day')
        
        return isBookingOnTheSameDay
    })


    //first creates the slots array to a default value, then checks to see if any of those slots are reserved by each appointment in the array. 
    //If appointment exists at that time of day, the slot is set to false
    const slots = [true, true, true, true, true, true, true, true, true, true, true, true,]
    schedule.map((booking) => {
        const startOfSelectedDay = moment(day).startOf('day').valueOf()
        const difference = moment(booking).diff(startOfSelectedDay, 'minutes')
        const calculateSlot = ((difference - 480) / 30)
        slots[calculateSlot] = false

    })

    //second we set those slots that are after the time of viewing to false to not render any slots that are in the past
    if(moment().isSame(day,'day'))     
    slots.map((slot,index)=>{
        const momentOfSlot=moment(day).startOf('day').add(480+30*index,'minutes').valueOf()
        slots[index]= moment().isBefore(momentOfSlot)
    }

        
    )



    //translates slots array to usable dailyCalendar array of objects
    const newDailyCalendar = []
    const slotTexts = ["08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00", "13:00 - 13:30", "13:30 - 14:00"]

    slots.map((slot, index) => {
        if (slot == true) newDailyCalendar[index] = { available: true, hours: slotTexts[index] }
        else newDailyCalendar[index] = { available: false, hours: slotTexts[index] }
    })
    

    return newDailyCalendar;



};