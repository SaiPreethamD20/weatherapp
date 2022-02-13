const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utilis/geocode.js')
const forecast=require('./utilis/forecast')
const exp = require('constants')

const app = express()
//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../weatherinfo')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')
//SetUp handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'DSP'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {  return res.send({
        error:'You must provide valid address'
    })
    }
   geocode(req.query.address,(error , { latitude,longitude,location }={})=>{
        if(error){
               return res.send({
                   error:'Unable to find the location'
               })
        }
        forecast(latitude, longitude, (error,forecastdata)=>{
               if(error){
                      return res.send({
                          error:'Unable to find the location'
                      })
               }
               res.send({
               forecast:forecastdata,
               location,
               address:req.query.address
               })
        })
 }) 
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})