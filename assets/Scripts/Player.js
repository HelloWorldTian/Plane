
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
    onBeginContact(contact,self,other)
    {

        if(other.tag==3)//star
        {
            other.parent=null;
            other.node.destroy();
            this.isTurning=true;
        }
    },
    // onCollisionEnter (other, self) {

    //     if(other.tag==3)//吃到星星
    //     {
    //         other.parent=null;
    //         other.node.destroy();
    //         this.isTurning=true;
    //         //this.Power+=1;
    //     }
        
    // },
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
