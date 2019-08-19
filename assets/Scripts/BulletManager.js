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
cc.Class({
    extends: cc.Component,
    properties: {
    
        playerBullet: cc.Prefab,
        enemyBullet: cc.Prefab,
        player: require("Player"),
        bulletClip:cc.AudioClip,
        

    },
    

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        this.pool = new cc.NodePool('bullet');
        for (let i = 0; i < 100; i++) {
            this.pool.put(cc.instantiate(this.playerBullet));
        }
        
    },
    // onLoad () {},

    start () {
        

    },

    InitGame(GameManager){

        this.schedule(this.createManyBullet, 0.1);
        this.GameManager=GameManager;
    },
    createManyBullet () {
        if(this.GameManager.GameOver)return;
        if(!this.GameManager.IsTouching)return;
        let px = this.player.node.x;
        let py = this.player.node.y + 80;
        let offset = 45;
        //cc.log(this.player.GetIsTurning());
        if(this.player.isTurning)
        {
            this.createOneBullet(px, py,BulletType.PlayerBullet);
            this.createOneBullet(px + offset, py,BulletType.PlayerBullet);
            this.createOneBullet(px - offset, py,BulletType.PlayerBullet);
            cc.audioEngine.playEffect(this.bulletClip);
        }else
        {
            this.createOneBullet(px, py,BulletType.PlayerBullet);
            cc.audioEngine.playEffect(this.bulletClip);
        }   
    },

    createOneBullet (x, y,bulletType) {
        let b = this.pool.get(this.pool);
        if(bulletType==BulletType.PlayerBullet)
        {
            if (!b) b = cc.instantiate(this.playerBullet);
        }else
        {
            if (!b) b = cc.instantiate(this.enemyBullet);
        }
        b.parent = this.node;
        b.x = x;
        b.y = y;
        b.getComponent("bullet").InitBullet(bulletType);
    }
    // update (dt) {},
});
