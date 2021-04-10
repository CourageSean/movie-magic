
const PORT = process.env.Port || 5000
  require("dotenv").config()
const { response } = require("express")
const express = require("express")
const fetch = require("node-fetch")
const genres = require("./data/genre.json")

const app = express()
app.set("view engine","ejs")

app.listen(process.env.Port || 5000,()=>{
    console.log("listening")
} )

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
let genreType = ``

let page_id ="2"

const getData = async (genreType,page_id)=>{
const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreType}&api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page_id}year=1`)

const data = await response.json()

 console.log(data.results[0].genre_ids)
return data
}

const getDetail = async (movie_id)=>{
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.API_KEY}&language=en-US`)
const detailData = await response.json()

return detailData
}

const getSearch = async (search)=>{

const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
const data = await response.json()
return data
}

getData("")
.then((data)=>{
  app.get("/",(req,res)=>{
    let page_nr = 1
    res.render("pages/index",{data,page_nr})
    console.log(data.results)
    
      })
  

      app.get("/:id",(req,res)=>{
     
          getDetail(req.params.id)
          .then((detailData)=>{
            res.render("pages/movieDetail",{detailData})
            
          })
         
      } )

  })


 app.get("/movies/:action/:nr",(req,res)=>{
  let page_nr = req.params.nr
  let page_genre = req.params.action
  console.log(page_genre)
    getData("28",page_nr)
    .then((data)=>{
      res.render("pages/index",{data,page_nr,page_genre})
 
  })

}) 






  app.get("/movies/drama/:nr",(req,res)=>{
    let page_nr = req.params.nr
    getData("18",page_nr)
    .then((data)=>{
      res.render("pages/index",{data,page_nr})
     
        
    }) 
  })

  app.get("/movies/horror/:nr",(req,res)=>{
    let page_nr = req.params.nr
    getData("27",page_nr)
    .then((data)=>{
      res.render("pages/index",{data,page_nr})
          
    }) 
  })


  app.get("/movies/page/:nr",(req,res)=>{
    let page_nr = req.params.nr
   
getData("",page_nr)
.then((data)=>{
  console.log(typeof page_nr)

  res.render("pages/index",{data,page_nr})
})
  })

  app.get("/movies/search/:word",(req,res)=>{
    getSearch(req.params.word)
    .then((data)=>{
      console.log("here-2")
      let page_nr =1
      
      res.render("pages/index",{data,page_nr})
      
    } )
    
  })
  app.post("/search",(req,res)=>{
    // console.log(req.body.search)
    console.log("just here")
  res.redirect(`movies/search/${req.body.search}`)
  
  })