let players = [
    {id: 1, name: 'player1', skill: 1},
    {id: 2, name: 'player2', skill: 2}, 
    {id: 3, name: 'player3', skill: 3},
    {id: 4, name: 'player4', skill: 4}, 
    {id: 5, name: 'player5', skill: 1}, 
    {id: 6, name: 'player6', skill: 2}, 
    {id: 7, name: 'player7', skill: 3}, 
    {id: 8, name: 'player8', skill: 4}, 
    {id: 9, name: 'player9', skill: 1}, 
    {id: 10, name: 'player10', skill: 2},
    {id: 11, name: 'player7', skill: 3}, 
    {id: 12, name: 'player8', skill: 4}, 
]

let team1 = []
let team2 = []


    const createTeams = (players) => {
        let inSkillOrder = players.sort((a,b) => {
            return a.skill - b.skill;
        })
        let team1 = inSkillOrder.filter((e, index) => {
            return index % 2 === 0
        })
        let team2 = inSkillOrder.filter((e, index) => {
            return index % 2 !== 0
        })
        if (team1.length !== team2.length) {
            team2.push(team1.shift())
        }
        console.log(team1)
        console.log(team2)

        return team1
    }

createTeams(players)