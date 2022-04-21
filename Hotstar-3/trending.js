// https://www.omdbapi.com/?apikey=fd079d9d&s=${}

var id
let b = document.querySelector("#search")
let a = document.querySelector("#list")
async function getData() {
    a.style.display = "block";

    if (b.value.length === 0) {
        a.style.display = "none"
    }

    const url = `https://www.omdbapi.com/?apikey=fd079d9d&s=${b.value}`

    let res = await fetch(url)

        res = await res.json()

    let data = res.Search
    // console.log(data)
    return data
}

function appendData(data) {
    
    let a = document.querySelector("#list")
    a.innerHTML = null;

    // console.log(data)

    data.forEach(function (el) {

        let mainbox = document.createElement("div")
        mainbox.id = "box"
        
        mainbox.addEventListener("click" , function(){
            goto(el)
        })

        let image = document.createElement("img")
        image.src = el.Poster

        let detailsbox = document.createElement("div")
        detailsbox.id="details"
            let year = document.createElement("p")
            year.innerText = el.Year

            let name = document.createElement("p")
            name.innerText = el.Title
            // name.id = "names"
        detailsbox.append(name,year)

        mainbox.append(image,detailsbox)


        a.append(mainbox)
        
    })
}


// b.addEventListener("blur", takeout)
// function takeout() {
//     a.style.display = "none";
//     b.value = null;
// }


async function main(){

    let data=await getData()
    
    if (data === undefined) {
        return false;
    }
    appendData(data)
}

// Debouncing function

function debounce(func,delay){
    if(id){
        clearTimeout(id)
    }
    id = setTimeout(function(){
        func()
    },delay)
}


async function goto(el){
    a.style.display = "none";
    b.value = null;
    
    let movieid = el.imdbID

    const url = `https://www.omdbapi.com/?apikey=fd079d9d&i=${movieid}`

    let res = await fetch(url)

    res = await res.json()
    console.log(res)

    displayappend(res)

}


// https://api.themoviedb.org/3/trending/movie/week?api_key=60d025cf9a3ba5930d281ce992a3dfbe

async function trendingdata(){

    const url1="https://api.themoviedb.org/3/trending/movie/week?api_key=60d025cf9a3ba5930d281ce992a3dfbe"
    let res =await fetch(url1)
    res = await res.json()
    console.log(res.results)
    trendingdataappend(res.results)

}

function trendingdataappend(data){
data.forEach(function(el){
    let box=document.createElement("div")
    box.id="box1"
    let image=document.createElement("img")
    // image.src="https://www.omdbapi.com/src/poster.jpg"
    image.src=el.poster_path
    let detailslist=document.createElement("div")
    detailslist.id="details1"
    let name=document.createElement("p")
    name.innerText=el.original_title
    let date=document.createElement("p")
    date.innerText=el.release_date
    detailslist.append(name,date)
    box.append(image,detailslist)
    document.querySelector("#container1").append(box)
})
}

trendingdata()