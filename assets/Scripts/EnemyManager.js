

var enemy=require("enemy");
cc.Class({
    extends: cc.Component,

    properties: {    
        enemy: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
         
    },
    InitGame(GameManager){

        this.schedule(this.createOneEnemy, 1);
        this.GameManager=GameManager;
    },
    createOneEnemy() {
       if(this.GameManager.GameOver)return;
       if(!this.GameManager.IsTouching)return;
       let e = cc.instantiate(this.enemy);
       e.getComponent(enemy).SetGameManager(this.GameManager);     
       e.parent = this.node;
       e.x = -300 + 600 * Math.random();
       e.y = 540;
       e.getComponent(enemy).InitSpeed();
    }

    // update (dt) {},
});
