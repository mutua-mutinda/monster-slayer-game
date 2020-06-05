new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
        
    },

    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;

            
            this.turns.unshift({
                isPlayer:true,
                text: 'Player hits Monster for ' + damage 
            })
            
            this.monsteAttack();

            //for playAttack
            if (this.checkWin()) {
                return;
            }


        },
        specialAttack: function() {
            damage = this.calculateDamage(7, 14);
            this.monsterHealth -= damage

            
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            })

            this.monsteAttack();


             //for playAttack
            if (this.checkWin()) {
                return;
            }


        },
        heal: function() {
           if (this.playerHealth <= 90) {
               this.playerHealth += 10;
           } else {
               this.playerHealth = 100;
           }
           this.turns.unshift({
            isPlayer: true,
            text: 'Player heals for 10' 
        })
       

           this.monsteAttack()
        },
        giveUp: function() {
           if (this.playerHealth > 20) {
            this.gameIsRunning = false;
                if(confirm('you sure, you want to give up')) {
                    this.startGame();
                }
            }
        },

        monsteAttack: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage                
                
            });
            
            this.checkWin(); //for monsteAttack

        },

        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        checkWin: function() {
            if (this.monsterHealth <= 0 ) {
                if(confirm('incredible win! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = true;
                }
                
                this.gameIsRunning = false;;
            } else if (this.playerHealth <= 0) {
                if(confirm('loser! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    },
});