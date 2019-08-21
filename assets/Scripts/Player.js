
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
        Shield:cc.Node,
        explosionPre:cc.Prefab,
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
                    this.boom();
                    this.Bullet.GameManager.SetGameOver();
                break;
            case 2:
                    this.boom();
                break;
            case 3://吃到星星
                    other.parent=null;
                    other.node.destroy();
                    this.isTurning=true;
                break;
        }   
          
    },
    boom()
    {
        let explosionPool=cc.find("Canvas/Containers/ExplosionPool");
        let explosion=cc.instantiate(this.explosionPre);
        explosion.parent=explosionPool;
        explosion.x=this.node.x;
        explosion.y=this.node.y;  
    },
    update (dt) {
        if(!this.isTurning)return;
        this.Second+=dt;
        if(this.Second>this.TurningTime)
        {
            this.Second=0;
            this.isTurning=false;
            this.Power=1;
        }
    },
});
