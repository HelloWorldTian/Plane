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
       Score:cc.Label,
       SurvivalTime:cc.Label,
       RemarkWord:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    ShowEndUI(score,survivalTime)
    {
        this.node.active=true;
        this.Score.string="最终得分："+score;
        this.SurvivalTime.string="生存时间："+survivalTime;
        if(survivalTime<10)
        {
            this.RemarkWord.string="太菜了，是男人就躲一百秒";
        }else if(survivalTime<30)
        {
            this.RemarkWord.string="到底行不行？";
        }else if(survivalTime<100)
        {
            this.RemarkWord.string="凑合着还行吧";
        }
        else 
        {
            this.RemarkWord.string="100秒真男人！";
        }
    },

    // update (dt) {},
});
