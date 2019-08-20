
var Star=require("Star");
var Player=require("Player");
var Bullet=require("bullet");
cc.Class({
    extends: cc.Component,

    properties: {

       
        explosionPre:cc.Prefab,
        star:cc.Prefab,
        initHp:cc.Float,
        canSpwnStar:false,
        hasSpawn:false,
        Speed:{
            default:cc.v2(0,0),
            visible:false
        },
        DestroyScore:5,
        hasInitSpeed:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.dir = Math.random() > 0.5 ? 1 : -1;
        // this.speed_x = 50 + Math.floor(120 * Math.random());
        // this.speed_y = 80 + Math.floor(80 * Math.random());
        this.hp = 10 + Math.floor(10 * Math.random());
        this.initHp=this.hp;
        var temp= Math.floor(10 * Math.random());
        if(temp>7)
        {
            this.canSpwnStar=true;
        }else
        {
            this.canSpwnStar=false;
        }
        this.Player=cc.find("Canvas/player").getComponent(Player);
    },

    start () {
        this.hpLab = this.node.getComponentInChildren(cc.Label);
        this.hpLab.string = this.hp + '';
    },

    InitSpeed()
    {       
        var speedX=Math.random()*500+150;
        var speedY=-Math.random()*700-70;
        var temp=Math.random();
        if(temp>0.5)
        {
            this.Speed=cc.v2(speedX,speedY);
        }else
        {
            this.Speed=cc.v2(-speedX,speedY);
        }
        this.getComponent(cc.RigidBody).linearVelocity=this.Speed;
        this.hasInitSpeed=true;
    },
    SetGameManager(GameManager)
    {
        this.GameManager=GameManager;
    },   
    onCollisionEnter (other, self) {

        switch(other.tag)
        {

            case 0://player
                    this.GameManager.SetGameOver();
                break;
            case 1://bullet
                    this.Bullet=other.node.getComponent("bullet");
                    if(this.Bullet.bulletType==1)return;
                    this.hp -= this.Player.getComponent("Player").Power;
                    this.GameManager.AddScore(this.Player.getComponent("Player").Power);
                    this.hpLab.string = this.hp + '';
                    if (this.hp <= 0) 
                    { 
                        let explosionPool=cc.find("Canvas/Containers/ExplosionPool");
                        let explosion=cc.instantiate(this.explosionPre);
                        explosion.parent=explosionPool;
                        explosion.x=this.node.x;
                        explosion.y=this.node.y;
                        this.GameManager.AddScore(this.DestroyScore);
                        this.node.destroy();        
                    }
                    if(this.hp<=this.initHp/2&&this.canSpwnStar)
                    {
                        if(this.hasSpawn)return;
                        this.hasSpawn=true;
                        let starPool=cc.find("Canvas/Containers/StarPool");
                        let star=cc.instantiate(this.star);
                        star.getComponent(Star).SetGameManager(this.GameManager);
                        star.parent=starPool;
                        star.x=this.node.x;
                        star.y=this.node.y;
                    }
                break;               
        }           
    },

   update (dt) {
       if(!this.hasInitSpeed)return;
       if(this.GameManager.GameOver)return;
       if(!this.GameManager.IsTouching)return;
    //    this.node.x += this.speed_x * dt * this.dir;
    //    if (this.node.x < -cc.winSize.width/2 + this.node.width/2) this.dir = 1;
    //    if (this.node.x > cc.winSize.width/2 - this.node.width/2) this.dir = -1;
    //    this.node.y -= this.speed_y * dt;
    //    if (this.node.y < -800) this.node.y = 800;
   },
});
