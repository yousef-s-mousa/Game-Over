let loading =document.getElementById("loading")

const categories = ["shooter", "mmorpg", "sailing", "permadeath", "superhero", "pixel"];

categories.forEach(gamecategory => {
    document.querySelector(`#${gamecategory}`).addEventListener('click', function() {
        getGames(gamecategory);
    });
});




async function getGames(category ="mmorpg") {
try{
    
loading.classList.remove("d-none")
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c7670c01f1msh6f748b82316eeddp193ed1jsn1e120f535ec1',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    

const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,options);
const response = await api.json();
  games =response;

 displayGames(games);

 
}
catch(error){

    alert("something went wrong")
    console.log(error)
    
}
finally{
    loading.classList.add("d-none")

}
}
getGames()


function displayGames(show){
let cartona=""
for(let i=0 ; i < games.length ; i++){
    cartona+= `
    <div class="col-md-3 justify-content-center d-flex">
                <div>
                    <div class="card  pt-3 border-black border-1 text-white" role="button" onclick="showDetails(${show[i].id})" style="width: 18rem;">
                         <img src="${show[i].thumbnail}" class="card-img-top px-2" alt="...">
                        <div class="card-body justify-content-center text-center px-0">
                          <div class="d-flex justify-content-between align-items-center p-2">
                            <h5 class="card-title">${show[i].title}</h5>
                            <a href="#" class="btn btn-primary">free</a>
                          </div>  
                          <p class="sdes">${show[i].short_description.split(" ",8).join(" ")}</p>
                        </div>
                        <div class="d-flex justify-content-between cardfooter py-1 px-1 ">
                            <p class="m-0 text-uppercase kind">${show[i].genre}</p>
                            <p class="m-0 text-uppercase platform">${show[i].platform}</p>
                        </div>
                    </div>
                </div>
            </div>`
    
}
document.getElementById("gameview").innerHTML=cartona
}






async function showDetails(id) {
    try {
        loading.classList.remove("d-none")
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'c7670c01f1msh6f748b82316eeddp193ed1jsn1e120f535ec1',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
        const response = await api.json();

         
        document.querySelector('.details').classList.remove('d-none');
        document.querySelector('.hero').classList.add('d-none');
        document.querySelector('.cards').classList.add('d-none');

        document.querySelector('.details img').src= response.thumbnail;
        document.querySelector('#link').href= response.game_url;
        document.querySelector('#gametitle').innerHTML=response.title;
        document.querySelector('#cate').innerHTML=response.genre;
        document.querySelector('#platform').innerHTML=response.platform;
        document.querySelector('#status').innerHTML=response.status;
        document.querySelector('#desc').innerHTML=response.description;
        
    } catch (error) {
        
        alert("Something went wrong");
        console.error(error);
    }
    finally{
        loading.classList.add("d-none")


    }
}

document.querySelector('#btnClose').addEventListener('click',function(){
    exit();

})


function exit(){
    document.querySelector('.details').classList.add("d-none")
    document.querySelector('.hero').classList.remove("d-none")
    document.querySelector('.cards').classList.remove("d-none")
}


