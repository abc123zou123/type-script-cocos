
import { _decorator, Component, Node, ScrollView, EventHandler, math, UITransform, Size, Prefab, instantiate, v2, Vec3, v3, Label, Pool, NodePool, assert } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ListViewTs
 * DateTime = Tue Oct 12 2021 15:53:29 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = ListView.ts.ts
 * FileBasenameNoExtension = ListView.ts
 * URL = db://assets/ListView.ts.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 

/**
 * 列表框目前只支持纵向
 */
@ccclass('ListView')
export class ListView extends Component {


    ////////////////////////////提供给使用者的接口/////////////////////////////////

    /**
     * 设置列表个数
     * @param num 
     */
     public SetTotalNum(num:number)
     {
         console.log("SetTotalNum",num);

         console.assert(num>=0,"num<0");
         
         this._itemTotalNum  = num;
         var totalH = this._itemTotalNum*this.itemH;
         this._scroll_com.content!.getComponent(UITransform)!.contentSize = {width:this._visibleSize!.width,height :totalH} as Size;
         this._initState();
     }

     public GetTotalNum():number
     {
        return this._itemTotalNum;
     }

     /**
      * 设置刷新指定位置的回调
      * @param action 
      */
     public SetCallBack(action:(index:number)=>void)
     {
         this._callback = action;
     }
 
 
     /**
      * 获取指定索引的Node
      * @param index 
      * @returns 
      */
     public GetIndexNode(index:number)
     {
         return this._itemArr.get(index);
     }
 
     ///////////////////////////////////////////////////////////


    
    @property(Prefab)
    itemPref!:Prefab



    @property
    itemH: number = 0;

    @property
    private _itemTotalNum: number=0;

    /**
     * 当前节点的ScrollView组件
     */
    private get _scroll_com(): ScrollView
    {
        return this.node.getComponent(ScrollView) as ScrollView;
    }

    /**
     * 可视区域的大小信息
     */
    private get _visibleSize()
    {
        return this._scroll_com.view?.contentSize;
    }


    /**
     * 内部实际需要创建的node个数，屏幕能容纳下的最大个数
     */
     private _realItemNum!: number; 

    /**
     * 索引映射到指定的Node
     */
     private _itemArr: Map<number,Node> = new Map<number,Node>();
    
    /**
     * node不使用的时候会被丢到Pool里面
     */
    private _nodePool!:Array<Node>;

    /**
     * 索引对应的激活或者非激活状态
     */
    private _indexsState:Map<number,boolean> = new Map<number,boolean>();

    /**
     * 外部会调用的回调
     */
    private _callback?:(index:number)=>void;
    
    /**
     * 判定是否初始化创建好节点
     */
    private _cloneNodeOk:boolean = false;




    start () {

        this._realItemNum = Math.floor(this._visibleSize!.height / this.itemH) + 2;
        this._nodePool = new Array<Node>();
        var totalH = this._itemTotalNum*this.itemH;
        this._scroll_com.content!.getComponent(UITransform)!.contentSize = {width:this._visibleSize!.width,height :totalH} as Size;
        this._createNodes();        
        this._cloneNodeOk = true;
        this._initState();   
    }


    /**
     * 创建所有的Node节点
     */
    private _createNodes(){
        for(var i=0; i < this._realItemNum; i++){
            let item = instantiate(this.itemPref) as Node;       
            item.active = false;
            this._nodePool.push(item);             
        }
      
    }


    /**
     * 初始化Node状态
     * @returns 
     */
    private _initState()
    {
        if (this._cloneNodeOk == false)
        {
            return;
        }


        
        //先把正在使用的全部入栈，再清空
        this._itemArr.forEach((item,index) => {
            this._nodePool.push(item);
            item.active = false;
            this._indexsState.set(index,false);    
        });
        this._itemArr.clear();



        let lastIndex = Math.floor( (this._visibleSize!.height )/ this.itemH ) //踩界
        lastIndex = (this._itemTotalNum-1 < lastIndex ? this._itemTotalNum-1 : lastIndex);



        for(var index=0;index<=lastIndex;index++)
        {                       
            var item = this._itemArr.get(index);
            item! = (item != null ? item : this._nodePool.pop()! as Node);
            this._scroll_com.content!.addChild(item!);  
            var new_y = - this.itemH*index;
            item!.position = new Vec3(0,new_y,0); 
            item!.active = true;
            this._indexsState.set(index,true);
            this._itemArr.set(index,item!);
            this._refreshData(index,item!);            
        }
    }


     update(dealTime:number){
         this._refresh();
    }


    /**
     * 核心重用逻辑,刷新列表并且重用节点
     * @returns 
     */
    private _refresh(){

        let currOffset = this._scroll_com.getScrollOffset();

        var isOutMax = this._visibleSize!.height + currOffset.y > this._itemTotalNum*this.itemH
        if (isOutMax)
        {
            // console.log("isOutMax");
            return;
        }

        var start_index = Math.floor(currOffset.y / this.itemH);  

        if (start_index < 0)
        {
            return;
        }

        let lastIndex = Math.floor( (this._visibleSize!.height + currOffset.y)/ this.itemH ) //踩界
        let removeIndexs = new Array<number>()


        //把这一帧不需要用的节点入栈
        this._itemArr.forEach((node,index) => {
            if (index <start_index || index > lastIndex)
            {
                if (this._nodePool.indexOf(node) == undefined)
                node.active =false;
                this._indexsState.set(index,false);
                this._nodePool.push(node);
                removeIndexs.push(index);
            }
        });

        //判定什么节点在这一帧里面需要被激活
        for(var index=start_index;index<=lastIndex;index++)
        {   
          
            var state =  this._indexsState.get(index);

            if (state == null || state == false)
            {   
                var item = this._itemArr.get(index) ;
                item! = (item != null ? item : this._nodePool.pop()! as Node);
                this._scroll_com.content!.addChild(item!);
                var new_y = - this.itemH*index;
                item!.position = new Vec3(0,new_y,0); 
                item!.active = true;
                // console.log("active index",index);
                this._indexsState.set(index,true);
                this._itemArr.set(index,item!);
                this._refreshData(index,item!);
            }
        }


       
        //删除itemArr记录的引用
        removeIndexs.forEach(element => {
            this._itemArr.delete(element);
        });


    }


    // public TestAddItem()
    // {
    //     console.log("TestAddItem");
        

    //     this.itemTotalNum --;
    //     var totalH = this.itemTotalNum*this.itemH;
    //     this._scroll_com.content!.getComponent(UITransform)!.contentSize = {width:this._visibleSize!.width,height :totalH} as Size;
    // }

    /**
     * 被刷新的索引需要回调
     * @param dataIndex 
     * @param item 
     */
    private _refreshData(dataIndex:number, item:Node){

        this._callback?.(dataIndex);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
