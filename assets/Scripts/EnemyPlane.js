// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var EnemyManager=require("EnemyManager");
cc.Class({
    extends: cc.Component,

    properties: {
        
        shootPos1:cc.Node,
        shootPos2:cc.Node
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.EnemyManager=cc.find("Canvas/Containers/EnemyManager").getComponent("EnemyManager");
    },

    start () {

    },

    update (dt) {

    },
});
