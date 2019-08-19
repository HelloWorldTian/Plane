// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var EnemyManager=require("BulletManager");
var BulletType=cc.Enum({
    PlayerBullet:0,
    EnemyBullet:1,
});
cc.Class({
    extends: cc.Component,

    properties: {
        
        shootPos:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.BulletManager=cc.find("Canvas/Containers/BulletManager").getComponent("BulletManager");
        cc.log(this.shootPos[0].x+"          :::"+this.shootPos[0].y);
    },

    start () {

        this.schedule(this.creatBullet,0.1);
    },

    creatBullet()
    {
        for(let i=0;i<this.shootPos.length;++i)
        {
            this.BulletManager.createOneBullet(this.node.position.x+this.shootPos[i].x,this.node.position.y-this.shootPos[i].y,BulletType.EnemyBullet);
        }

    },
    update (dt) {

    },
});
