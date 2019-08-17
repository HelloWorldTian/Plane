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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        speed: 800,
        pool: null
    },

    reuse (pool) {
        this.pool = pool;
    },

    // onCollisionEnter (other, self) {
    //     if(other.tag==2)//敌人
    //       this.pool.put(this.node);
    // },
    
    onBeginContact: function (contact, self, other) {
        if(other.tag==2)//敌人
          this.pool.put(this.node);
        
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //start () {

    update (dt) {
        this.node.y += this.speed * dt;
        if (this.node.y > 800) {
            this.pool.put(this.node);
        }
    },
});
