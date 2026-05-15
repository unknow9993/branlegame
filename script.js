let player={
name:"Joueur",
coins:0,
actions:0,
rebirths:0,
battlePass:1,
friends:[],
inventory:[]
}

function save(){
localStorage.setItem(
'neonPlayer',
JSON.stringify(player)
)
}

function load(){

let data=localStorage.getItem('neonPlayer')

if(data){
player=JSON.parse(data)
}

updateUI()
renderBattlePass()
renderFriends()

}

function addAction(){

player.actions++
player.coins+=5

player.battlePass++

if(player.battlePass>100){
player.battlePass=100
}

updateUI()

showNotif('+5 points')

}

function getRank(){

if(player.actions>=100){
return '👑 EL PATRON'
}

if(player.actions>=75){
return '🔥 TIÉ CHEF'
}

if(player.actions>=50){
return '⚡ T’AIMES ÇA'
}

if(player.actions>=25){
return '💀 CONFIRMÉ'
}

if(player.actions>=10){
return '😎 AMATEUR'
}

return '🐣 DÉBUTANT'

}

function rebirthPlayer(){

if(player.actions<50){

showNotif('50 actions requises')
return

}

player.rebirths++
player.actions=0
player.coins+=250

updateUI()

showNotif('🔄 REBIRTH')

}

function updateUI(){

document.getElementById(
'actions'
).innerText=player.actions

document.getElementById(
'coins'
).innerText=player.coins

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
'leaderName'
).innerText=player.name

let percent=(player.actions/100)*100

if(percent>100){
percent=100
}

document.getElementById(
'xpFill'
).style.width=percent+'%'

let size=120+(player.rebirths*40)

document.getElementById(
'evolutionBar'
).style.height=size+'px'

save()

}

function renderBattlePass(){

let grid=document.getElementById(
'battleGrid'
)

grid.innerHTML=''

for(let i=1;i<=100;i++){

let div=document.createElement('div')

div.className='battle-level'

if(i<=player.battlePass){
div.classList.add('active')
}

div.innerText=i

grid.appendChild(div)

}

}

function claimMission(amount){

player.coins+=amount

updateUI()

showNotif('+'+amount+' points')

}

function buyItem(name,price){

if(player.coins<price){

showNotif('Pas assez de points')
return

}

if(player.inventory.includes(name)){

showNotif('Déjà acheté')
return

}

player.coins-=price

player.inventory.push(name)

if(name==='vip'){

document.body.style.boxShadow=
'0 0 120px #ff9d00 inset'

}

if(name==='aura'){

document.body.style.filter=
'saturate(1.5)'

}

updateUI()

showNotif('Achat effectué')

}

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

load()

setInterval(()=>{

player.battlePass=1
renderBattlePass()
updateUI()

},2629800000)
