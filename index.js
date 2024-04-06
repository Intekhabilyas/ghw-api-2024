const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const challenges = []

app.get('/', (req, res) => {
    res.json('Welcome to GHW Stream demo')
})

app.get('/challenges', (req, res) => {



    axios.get('https://ghw.mlh.io/challenges')
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                
    
                $('a:contains("")', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
                    challenges.push({
                        title,
                        url
                    })        
                })
                res.json(challenges)
            }).catch(err => console.log(err))
    })
    
    

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))