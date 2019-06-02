
const selVal = document.getElementById('players')
const statsData = document.getElementsByClassName('footer-wrapper')
const badge = document.getElementsByClassName('circle-img')[0]
const h5 = document.createElement('h5');
const h3 = document.createElement('h3');
const playerImage = document.getElementById('player-img')
const playerMapping = {
	'appearances': 'Appearance',
	'goals': 'Goals',
	'goal_assist': 'Assists',
};

document.addEventListener("DOMContentLoaded", () => {
    fetchSelectData()
    setData(selVal)

});

 const fetchData = () => {
 return fetch('../data/player-stats.json').then(res=>res.json()).catch(error => console.error('Error:', error))
}

 const fetchSelectData = () => {
  fetch('../data/player-stats.json').then(res=>res.json()).catch(error => console.error('Error:', error))
 .then(response => setSelect(selVal,response.players ));
}

const setSelect = (sel,res) => {
    let opt = ''
        for (let it in res) {
            const playerData = res[it].player
            opt+=`<option value=${playerData.id}>${playerData.name.first} ${playerData.name.last}  </option>`;
        }
    sel.innerHTML = opt
}

    const setData = (val) => {
         fetchData().then( res => {
             const {players} = res
             const selectedValue = val.value
             const data = players.find(item => item.player.id === Number(selectedValue))
             console.log(data)
             const {player, stats} = data
             const bckPos = badgeImg(player.id)
             console.log(bckPos)
             player.imgSrc = playerImg(player.id)
             badge.style.backgroundPosition = `${bckPos[0]}px ${bckPos[1]}px`
             h3.innerText = `${player.name.first}  ${player.name.last}`
             h5.innerText = `${player.info.positionInfo}`
             playerImage.src = player.imgSrc
             const statsMapped = stats.map(st => {
            
                 return {
                     name:playerMapping[st.name],
                     value:st.value,
                 }
             }).filter(item => item.name !== undefined)

             let str = '<ul class="stats">'
             const newArr = [
                {name:'Goals per match', value: (stats[6].value / stats[0].value).toFixed(2) },
                {name: 'Passes per minute', value: (stats[7].value / (stats[8].value + stats[4].value)).toFixed(2)}
            ]
            const newMerge = [...statsMapped, ...newArr]
             for (let it in newMerge) {
                  str+=`<li><div>${newMerge[it].name}</div><div>${newMerge[it].value}</div></li>`; 
             }
             statsData[0].innerHTML = str;
             statsData[0].before(h3)
             statsData[0].before(h5)
            
        })
    }

    const playerImg = (id) => {
		switch (id) {
			case 4916:
				return './assets/p4916.png';
			case 4148:
				return  './assets/p4148.png';
			case 2064:
				return  './assets/p2064.png';
			case 8983:
				return  './assets/p8983.png';
			case 4246:
				return  './assets/p4246.png';
			default:
				 ''
		}
	};
    const badgeImg = (id) => {
		switch (id) {
			case 4916:
				return [
                    '-500',
                    '100'  
                ]
			case 4148:
                return [
                    '-800',
                    '400'
                ] 
			case 2064:
               return [
                   '-600',
                   '300'
                ] 
            case 4246:
                return [
                    '-100',
                    '1000'
                ] 
			case 8983:
                return [
                    '0',
                    '1100'
                ] 
		
			default:
				 ''
		}
	};



