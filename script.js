let player={
})

document.getElementById(id)
.classList.add('active')

let nav=document.querySelectorAll('.nav-item')

nav.forEach(btn=>{
btn.classList.remove('active')
})

el.classList.add('active')

}

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

function rebirthPlayer(){

if(player.actions<50){
showNotif('50 branlettes requises')
return
}

player.rebirths++
player.actions=0
player.points+=250

updateUI()

showNotif('🔄 RE
