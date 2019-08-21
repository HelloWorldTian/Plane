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
var GameManager=require("GameManager");
var Star=require("Star");
var Player=require("Player");
var Bullet=require("bullet");
var BulletType=cc.Enum({
    PlayerBullet:0,
    EnemyBullet:1,
});
cc.Class({
    extends: cc.Component,

    properties: {
        
        shootPos:[cc.Node],
        DestroyScore:10,
        explosionPre:cc.Prefab,
        progress:cc.ProgressBar,
        star:cc.Prefab,
        initHp:cc.Float,
        canSpwnStar:false,
        hasSpawn:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.BulletManager=cc.find("Canvas/Containers/BulletManager").getComponent("BulletManager");
        this.GameManager=cc.find("Canvas/GameManager").getComponent("GameManager");
        this.dir = Math.random() > 0.5 ? 1 : -1;
        this.speed_x = 50 + Math.floor(120 * Math.random());
        this.speed_y = 80 + Math.floor(80 * Math.random());

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

        this.schedule(this.creatBullet,0.5);
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
                    this.progress.progress = this.hp/this.initHp;
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
    creatBullet()
    {
        for(let i=0;i<this.shootPos.length;++i)
        {
            let posX=this.node.position.x+this.shootPos[i].x;
            let posY=this.node.position.y-this.shootPos[i].y;
            this.BulletManager.createOneBullet(posX,posY,BulletType.EnemyBullet);
        }

    },
    update (dt) {
       this.node.x += this.speed_x * dt * this.dir;
       if (this.node.x < -cc.winSize.width/2 + this.node.width/2) this.dir = 1;
       if (this.node.x > cc.winSize.width/2 - this.node.width/2) this.dir = -1;
       this.node.y -= this.speed_y * dt;
       if (this.node.y < -800) this.node.y = 800;
    },
});
