const express=require("express")
const app=express()
const axios=require("axios")
const cheerio=require("cheerio")
const PORT=8000
const challenges=[]

app.get("/",async(req,res)=>{
res.json({message:"hello welcome to our stream"})
})

app.get("/challenges",async (req,res)=>{
    axios.get("https://www.ghw.mlh.io/challenges")
    .then(response=>{
        const html=response.data
        const $= cheerio.load(html)

        $('a.contains("")'.html).each(function(){
            const title=$(this).text()
            const url=$(this).attr("href")

            challenges.push({
                title,
                url
            })
        })
           
    

        res.json(challenges)
    })
})
app.listen(PORT,()=>{
    console.log(`listening to http://localhost:${PORT}`)
})