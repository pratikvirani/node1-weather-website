const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pratik Virani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pratik Virani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpmsg: 'how can i help you',
        name: 'Pratik Virani'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        page: 'Page not found!',
        Error: 'Help article not found ',
        name: 'Pratik Virani'
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location}) => {

            if (error) {
               return res.send ({ error })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                
                res.send ({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            } )
            
        })
       
    }
})

app.get('*', (req, res) => {
    res.render('404', {
        page: 'Page not found!',
        name: 'Pratik Virani'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})