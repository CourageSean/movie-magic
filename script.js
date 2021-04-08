const api_key = "efbbb302664f73b592e1d04eca61e7ec"
const PORT = process.env.Port || 5000
  require("dotenv").config()
const { response } = require("express")
const express = require("express")
const fetch = require("node-fetch")
const genres = require("./data/genre.json")

const app = express()
app.set("view engine","ejs")

app.listen(3001,()=>{
    console.log("listening")
} )

app.use(express.static('public'))
let genreType = ``

let page_id ="2"

const getData = async (genreType,page_id)=>{
const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreType}&api_key=efbbb302664f73b592e1d04eca61e7ec&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page_id}`)

const data = await response.json()

 console.log(data.results[0].genre_ids)
return data
}

const getDetail = async (movie_id)=>{
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=efbbb302664f73b592e1d04eca61e7ec&language=en-US`)
const detailData = await response.json()

return detailData
}

getData("")
.then((data)=>{
  app.get("/",(req,res)=>{
    let page_nr = 12
    res.render("pages/index",{data,page_nr})
    
      })
  

      app.get("/:id",(req,res)=>{
     
          getDetail(req.params.id)
          .then((detailData)=>{
            res.render("pages/movieDetail",{detailData})
            console.log(detailData.genres)
          })
         
      } )

  })


 app.get("/action",(req,res)=>{
  let page_nr = req.params.nr
    getData("28")
    .then((data)=>{
      res.render("pages/index",{data,page_nr})
 
  })

}) 


  app.get("/drama",(req,res)=>{
    let page_nr = req.params.nr
    getData("18")
    .then((data)=>{
      res.render("pages/index",{data,page_nr})
     
        
    }) 
  })


  app.get("/movies/page/:nr",(req,res)=>{
    let page_nr = req.params.nr
    console.log(page_nr)
getData("",page_nr)
.then((data)=>{

  res.render("pages/index",{data,page_nr})
})
  })
