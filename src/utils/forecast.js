const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=61681f7030bc562a610066f0680d3b91&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true}, (error, { body }) => {

        if(error) {
            callback('something went wrong', undefined)
        } else if (body.error) {
            callback('The location is not describe', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + ' degrees out. There is a ' + body.current.cloudcover + '% chance of rain.')
            
        }
    })
}

module.exports = forecast