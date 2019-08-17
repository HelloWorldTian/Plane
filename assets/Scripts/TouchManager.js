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
        player: cc.Node,
        GameStart:false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    InitGame(GameManager)
    {
        this.GameManager=GameManager;
        this.GameStart=true;
        this.node.on('touchmove', (e)=>{
            if(!this.GameStart)return;
            let delta = e.getDelta();
            this.player.x += delta.x;
            this.player.y += delta.y;
        },this);
    },
     update (dt) {
         if(!this.GameStart)return;
        if(this.GameManager.GameOver)return;
         if (this.player.x <= -cc.winSize.width/2) {
             this.player.x = -cc.winSize.width/2;
         } else if (this.player.x > cc.winSize.width/2) {
              this.player.x = cc.winSize.width/2;
        }
        if (this.player.y <= -cc.winSize.height/2) {
             this.player.y = -cc.winSize.height/2;
         } else if (this.player.y > cc.winSize.height/2) {
             this.player.y = cc.winSize.height/2;
         }
      },
    // update (dt) {},
});
