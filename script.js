let player={
name:'Joueur',
points:0,
actions:0,
rebirths:0,
battlePass:1,
friends:[],
inventory:[]
}

function save(){
localStorage.setItem(
'branletteParty',
JSON.stringify(player)
)
}

function load(){

let data=localStorage.getItem(
'branletteParty'
)

if(data){
player=JSON.parse(data)
}

updateUI()
renderBattlePass()
renderFriends()

}

load()

function openPage(id,el){

// CACHE TOUTES LES PAGES

const pages=document.querySelectorAll('.page')

pages.forEach(page=>{
page.style.display='none'
page.classList.remove('active')
})

// AFFICHE LA PAGE CHOISIE

const selected=document.getElementById(id)

selected.style.display='block'
selected.classList.add('active')

// NAVIGATION ACTIVE

const nav=document.querySelectorAll('.nav-item')

nav.forEach(btn=>{
btn.classList.remove('active')
})

el.classList.add('active')

}

function addAction(){

player.actions++
function rebirthP
