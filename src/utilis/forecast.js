const request=require('request')

const forecast=(x ,y ,callback)=>{
    const url='http://api.weatherstack.com/forecast?access_key=ee72e90a433d16f1817ada3c318b9194&query=http://api.weatherstack.com/forecast?access_key=ee72e90a433d16f1817ada3c318b9194&query=' +x+ ',' +y+ ''
    request({url,json:true},(error, {body})=>{
        if(error){
          callback('Unable to connect the forecast services',undefined)
        }
       else if(body.error){
           callback('Unable to find the location',undefined)
       }
       else{
           callback(undefined,'It is currently ' +body.current.temperature+ ' degrees out .There is a '+body.current.precip+'% chance of rain')
       }
    })
}

module.exports=forecast