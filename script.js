let player={
name:"Joueur",
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

// PAGES

function openPage(id,el){

let pages=document.querySelectorAll('.page')

pages.forEach(page=>{

page.classList.remove('active')

})

document.getElementById(id)
.classList.add('active')

let nav=document.querySelectorAll('.nav-btn')

nav.forEach(btn=>{

btn.classList.remove('active')

})

el.classList.add('active')

}

// ACTION

function addAction(){

player.actions++
player.points+=5

player.battlePass++

if(player.battlePass>100){

player.battlePass=100

}

updateUI()

showNotif('+5 BranlettePoints')

}

// RANK

function getRank(){

if(player.actions>=100){
return '👑 EL PATRON'
}

if(player.actions>=75){
return '🔥 TIÉ CHEF'
}

if(player.actions>=50){
return '⚡ T’AIMES LA BRANLETTE'
}

if(player.actions>=25){
return '💀 CONFIRMÉ'
}

if(player.actions>=10){
return '😎 AMATEUR'
}

return '🐣 DÉBUTANT'

}

// REBIRTH

function rebirthPlayer(){

if(player.actions<50){

showNotif('50 branlettes requises')
return

}

player.rebirths++

player.actions=0

player.points+=250

updateUI()

showNotif('🔄 REBIRTH')

}

// UPDATE UI

function updateUI(){

document.getElementById(
'actions'
).innerText=player.actions

document.getElementById(
'coins'
).innerText=player.points

document.getElementById(
'rebirths'
).innerText=player.rebirths

document.getElementById(
'battleLevel'
).innerText=player.battlePass

document.getElementById(
'rankName'
).innerText=getRank()

document.getElementById(
'leaderScore'
).innerText=player.actions

document.getElementById(
'leaderTitle'
).innerText=player.name

document.getElementById(
'leaderName'
).innerText=player.name

let percent=(player.actions/100)*100

if(percent>100){
percent=100
}

document.getElementById(
'xpFill'
).style.width=percent+'%'

let size=120+(player.rebirths*45)

document.getElementById(
'evolutionBar'
).style.height=size+'px'

save()

}

// BATTLE PASS

function renderBattlePass(){

let grid=document.getElementById(
'battleGrid'
)

grid.innerHTML=''

for(let i=1;i<=100;i++){

let div=document.createElement('div')

div.className='battle-level'

let reward=''

if(i%10===0){

reward='🔥 +100'

}else if(i%5===0){

reward='🟠 +50'

}else{

reward='⚡ +10'

}

div.innerHTML=`
<div>
<b>${i}</b>
<br>
${reward}
</div>
`

if(i<=player.battlePass){

div.classList.add('active')

}

div.onclick=()=>{

claimBattleReward(i)

}

grid.appendChild(div)

}

}

// CLAIM PASS

function claimBattleReward(level){

if(level>player.battlePass){

showNotif('Niveau verrouillé')
return

}

let reward=10

if(level%10===0){

reward=100

}else if(level%5===0){

reward=50

}

player.points+=reward

updateUI()

showNotif(
'Récompense +'+reward
)

}

// MISSIONS

function claimMission(amount){

player.points+=amount

updateUI()

showNotif(
'Mission terminée +'+amount
)

}

// SHOP

function buyItem(name,price){

if(player.points<price){

showNotif('Pas assez de points')
return

}

if(player.inventory.includes(name)){

showNotif('Déjà acheté')
return

}

player.points-=price

player.inventory.push(name)

if(name==='vip'){

document.body.style.boxShadow=
'0 0 120px orange inset'

}

if(name==='aura'){

document.body.style.filter=
'saturate(1.5)'

}

updateUI()

showNotif('Objet acheté')

}

// FRIENDS

function addFriend(){

let input=document.getElementById(
'friendInput'
)

if(!input.value) return

player.friends.push(input.value)

input.value=''

renderFriends()

save()

showNotif('Ami ajouté')

}

function renderFriends(){

let list=document.getElementById(
'friendList'
)

list.innerHTML=''

player.friends.forEach(friend=>{

let div=document.createElement('div')

div.className='friend-item'

div.innerHTML='👤 '+friend

list.appendChild(div)

})

}

// NOTIF

function showNotif(text){

let notif=document.getElementById(
'notif'
)

notif.innerText=text

notif.classList.add('show')

setTimeout(()=>{

notif.classList.remove('show')

},2500)

}

// RESET PASS MENSUEL

setInterval(()=>{

player.battlePass=1

renderBattlePass()

updateUI()

showNotif(
'🎟️ Nouveau Battle Pass'
)

},2629800000)
