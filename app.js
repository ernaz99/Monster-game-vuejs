
function getRandomValue(min,max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

const app = Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    computed:{
      playerBarStyles(){
          if(this.playerHealth < 0 ){
              return {width: '0%'};
          }
          return {width: this.playerHealth + '%'};
      },
      monsterBarStyles(){
          if(this.monsterHealth < 0 ){
              return {width: '0%'};
          }
          return {width: this.monsterHealth + '%'}
      },
      mayUseSpecialAttack(){
          return this.currentRound % 3 !== 0;
      }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw';
            }else if(value <= 0){
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw';
            }else if(value <= 0){
                this.winner = 'player';
            }
        }
    },
    methods:{
        startGame(){
          this.playerHealth = 100;
          this.monsterHealth = 100;
          this.currentRound = 0;
          this.winner = null;
        },
        playerAttack(){
          const attack = getRandomValue(9,13);
          this.playerHealth -= attack;
          this.addLogMessages('monster','attack', attack);

        },
        monsterAttack(){
            this.currentRound++;
            const attack = getRandomValue(8,15);
            this.monsterHealth -= attack;
            this.addLogMessages('player','attack', attack);
            this.playerAttack();
        },
        specialMonsterAttack(){
            this.currentRound++;
            const attack = getRandomValue(10,25);
            this.monsterHealth -= attack;
            this.addLogMessages('player','attack',attack);
            this.playerAttack();
        },
        healPlayer(){
            const health = getRandomValue(8,20);
            if(this.playerHealth + health > 100){
               this.playerHealth = 100;
            }else {
                this.playerHealth += health;
            }
            this.addLogMessages('player','heal',health);
            this.playerAttack();
        },
        surrender(){
            this.winner = 'monster';
        },
        addLogMessages(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
})


app.mount('#game')

