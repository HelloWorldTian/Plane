// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

             
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dir = Math.random() > 0.5 ? 1 : -1;
        this.speed_x = 50 + Math.floor(120 * Math.random());
        this.speed_y = 80 + Math.floor(80 * Math.random());
    },

    start () {

    },

    SetGameManager(GameManager)
    {
        this.GameManager=GameManager;
    },

   update (dt) {
       if(this.GameManager.GameOver)return;
       if(!this.GameManager.IsTouching)return;
       this.node.x += this.speed_x * dt * this.dir;
       if (this.node.x < -cc.winSize.width/2 + this.node.width/2) this.dir = 1;
       if (this.node.x > cc.winSize.width/2 - this.node.width/2) this.dir = -1;
       this.node.y -= this.speed_y * dt;
       if (this.node.y < -800) this.node.y = 800;
   },
});
