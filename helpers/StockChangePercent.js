export const StockChangePercent=(Change,LastRate)=>{
    let temp=(Change*100)/(LastRate-Change)
  
    return temp?.toFixed(2)
}