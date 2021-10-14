
import { _decorator, Component, Node, Label } from 'cc';
import { ListView } from '../../Script/Framework/Component/ListView';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TestListView
 * DateTime = Thu Oct 14 2021 16:11:43 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = TestListView.ts
 * FileBasenameNoExtension = TestListView
 * URL = db://assets/Script/TestFrame/TestListView.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 /**
  * 测试列表框功能
  */
@ccclass('TestListView')
export class TestListView extends Component {

    @property(ListView)
    listView:ListView;

    @property(Label)
    label:Label;

    start()
    {
        this.listView.SetTotalNum(1);
        this.listView.SetCallBack((index:number)=>
        {
            this.onIndexCall(index);
        });

    }

    onIndexCall(index:number)
    {
        let node = this.listView.GetIndexNode(index);
        node.getComponentInChildren(Label).string = index.toString();
    }

    public testAddNum()
    {   
        let num = this.listView.GetTotalNum();
        this.listView.SetTotalNum(num+1);
    }

    public testReduceNum()
    {   
        let num = this.listView.GetTotalNum();
        this.listView.SetTotalNum(num-1);
    }


    update()
    {
        let num = this.listView.GetTotalNum();
        this.label.string = '当前总个数:'+num; 
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
