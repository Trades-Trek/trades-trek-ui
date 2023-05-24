import moment from 'moment-timezone';

const NigerianTimeZone=(originTime)=>{
    const inputTz = "Africa/Lagos"
    const time = moment.tz(originTime, inputTz)
   
   return time
    // const formatDate = moment(time).format('h:mm:ss')
    // return formatDate
    
}

export default NigerianTimeZone;