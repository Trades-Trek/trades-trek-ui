export const DataConvert=(date,par=0)=>{
    let d=new Date(date)
    d.setDate(d.getDate()+par)
 
    return d.toDateString()
  }
 export const TimeConverter=(time)=>{
    let d=new Date(time)
    return d.toTimeString().slice(0,8);
    
  }