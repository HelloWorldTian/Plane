
cc.Class({
    extends: cc.Component,

    properties: {
        isTuring:false,
        TurningTime:5,
        Second:0,
        Power:{
            default:1,
            type:cc.Float
        },
        Shield:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    InitGame()
    {
        this.isTurning=false;
        this.Second=0;
        this.Power=1;
    },
    onCollisionEnter (other, self) {

        switch(other.tag)
        {

            case 1://bullet
                    this.Bullet=other.node.getComponent("bullet");
                    if(this.Bullet.bulletType==0)return;
                    this.Bullet.GameManager.SetGameOver();
                break;
            case 3://吃到星星
                    other.parent=null;
                    other.node.destroy();
                    this.isTurning=true;
                break;
        }       
    },
    GetIsTurning()
    {
        return this.isTurning;
    },
    update (dt) {
        if(!this.isTurning)return;
        this.Second+=dt;
        if(this.Second>this.TurningTime)
        {
            this.Second=0;
            this.isTurning=false;
            this.Power=1;
            cc.log("Turn over");
        }
    },
});
