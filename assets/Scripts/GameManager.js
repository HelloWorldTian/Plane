

//Tag:   player:0,   bullet:1,   enemy:2,    star:3   wall:4
cc.Class({
    extends: cc.Component,

    properties: {
      
        EnemyManager:require('EnemyManager'),
        BulletManager:require('BulletManager'),
        TouchManager:require('TouchManager'),

        StartUI:cc.Node,
        EndUI:require('EndUI'),
        IntroduceUI:cc.Node,
        ScoreUI:cc.Node,
        ScoreLabel:cc.Label,

        Player:require("Player"),
        GameOver:{
            default:true,
            visible:false,
        },
        StarPool:cc.Node,
        Canvas:cc.Node,
        IsTouching:false,
        Score:0,
        SurvivalTime:0,
        Second:0,
        SurvivalScore:2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Canvas.on(cc.Node.EventType.TOUCH_START,this.OnTouchStart,this);
        this.Canvas.on(cc.Node.EventType.TOUCH_MOVE,this.OnTouchStart,this);
        this.Canvas.on(cc.Node.EventType.TOUCH_END,this.OnTouchEnd,this);
        this.Canvas.on(cc.Node.EventType.TOUCH_CANCEL,this.OnTouchEnd,this);
        this.physicsManager=cc.director.getPhysicsManager();
        this.collisionManager=cc.director.getCollisionManager();
        this.physicsManager.enabled=true;
        this.collisionManager.enabled=true;
    },

    start () {

        
    },
    OnTouchStart(event)
    {
        if(this.GameOver)return;
        this.IsTouching=true;
        if(this.IntroduceUI.activeInHierarchy)
        {
            this.IntroduceUI.active=false;
        }
        this.physicsManager.enabled=true;
        this.collisionManager.enabled=true;
    },
    OnTouchEnd(event)
    {
        if(this.GameOver)return;
        this.IsTouching=false;
        if(!this.IntroduceUI.activeInHierarchy)
        {
            this.IntroduceUI.active=true;
        }
        this.physicsManager.enabled=false;
        this.collisionManager.enabled=false;
    },

    BtnStartGameClick()
    {
        this.InitGame();
    },
    
    InitGame()
    {       
        this.StartUI.active=false;
        this.Player.node.position=cc.v2(0,-850); 
        this.Player.node.active=true;       
        var action=cc.sequence(cc.moveTo(1,cc.v2(this.Player.x,-380)),cc.callFunc(this.ShowIntroduce,this,true));
        this.Player.node.runAction(action);    
        this.ScoreUI.active=true;
        this.Score=0;
        this.ScoreLabel.active=true;
        this.ScoreLabel.string="score:"+this.Score;
        this.Second=0;
        this.SurvivalTime=0;
        this.physicsManager.enabled=true;
        this.collisionManager.enabled=true;
    },

    ShowIntroduce(value)
    {
        this.IntroduceUI.active=value;
        this.GameOver=false;
        this.IsTouching=false;
        this.EnemyManager.InitGame(this);
        this.BulletManager.InitGame(this);  
        this.TouchManager.InitGame(this);  
        this.Player.InitGame(); 
    },
    ReStartGame()
    {
        this.EndUI.node.active=false;
        this.StartUI.active=true;   
        if(this.IntroduceUI.activeInHierarchy)
        {
            this.IntroduceUI.active=false;
        }   
    },
    SetGameOver(){
        this.GameOver=true;
        this.Player.node.active=false;
        this.EndUI.ShowEndUI(this.Score,this.SurvivalTime);
        this.ScoreUI.active=false;
        this.EnemyManager.node.removeAllChildren();
        this.StarPool.removeAllChildren();
        this.TouchManager.GameStart=false;
        this.physicsManager.enabled=false;  
        this.collisionManager.enabled=false;
    },
    AddScore(num)
    {
        this.Score+=num;
        this.ScoreLabel.string="score:"+this.Score;
    },
    update (dt) {

        if(this.GameOver)return;
        if(!this.IsTouching)return;
        this.Second+=dt;
        if(this.Second>1)
        {
            this.SurvivalTime+=1;
            this.AddScore(this.SurvivalScore);
            this.Second=0;
        }
    },
});
