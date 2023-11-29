const request = require('request')



const geocode = (address, callback) => {
    const url = 'https://api.geoapify.com/v1/geocode/search?text=' + address + '&apiKey=c6f47b2e4b2d4e13a7593005df685ee2'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('something gone wrong check your internet')
        } else if (body.features.length === 0) {
            callback('Add some right place name')
        } else  {
            callback (undefined, {
                latitude: body.features[0].properties.lat,
                longitude: body.features[0].properties.lon,
                location: body.features[0].properties.formatted
            })

        }
    })
}


module.exports = geocode
