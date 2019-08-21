// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var BulletType=cc.Enum({
    PlayerBullet:0,
    EnemyBullet:1,
});
var enemy=require("enemy");
cc.Class({
    extends: cc.Component,

    properties: {
        speedNow:800,
        initSpeed:800,
        destroyHeight:800,
        pool: null,
        hasInit:false,
        bulletType:{
            default:BulletType.PlayerBullet,
            type:cc.Enum(BulletType)
        }
    },

    reuse (pool) {
        this.pool = pool;
    },

    onCollisionEnter(other,self)
    {
        switch(other.tag)
        {
            case 0://player
                if(this.bulletType==0)return;
                break;
            case 2://enemy
                if(this.bulletType==1 )return;
                break;
        }
        this.hasInit=false;
        this.pool.put(this.node);       
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //start () {
    InitBullet(_bulletType,pool,GameManager)
    {
        this.reuse(pool);
        this.bulletType=_bulletType;
        this.GameManager=GameManager;
        if(this.bulletType==BulletType.PlayerBullet)
        {
            this.speedNow=this.initSpeed;
            this.destroyHeight=800;
            this.node.angle=0;
        }else if(this.bulletType==BulletType.EnemyBullet)
        {
            this.speedNow=this.initSpeed*(-1);
            this.destroyHeight=-790;
            this.node.angle=-180;
        }
        this.hasInit=true;
    },

    update (dt) {
        if(!this.hasInit)return;
       
        this.node.y += this.speedNow * dt;
        if(this.bulletType==BulletType.PlayerBullet)
        {
            if (this.node.y > this.destroyHeight) {
                this.hasInit=false;
                this.pool.put(this.node);
            }
        }else if(this.bulletType==BulletType.EnemyBullet)
        {
            if (this.node.y <this.destroyHeight) {
                this.hasInit=false;
                this.pool.put(this.node);
            }
        }
    },
});
