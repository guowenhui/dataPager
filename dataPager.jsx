import React from 'react';
import style from './dataPager.scss';

class DataPager extends React.Component{
	constructor(...props){
		super(...props);	
		this.state={
			current:1,
			total:0,
            record:0,
            totalRecords:0,
            pageRecord:10,
            step:1,
            totalStep:5
		}
	}
    
    componentDidMount(){
        this.setState({totalRecords:500,record:10,pageRecord:10});
    }

    componentWillReceiveProps(nextProps){
       
    }

    handClick(num,e){
        this.setState({current : num});
        this.props.pageChoose(num);
    }

    goPrev(){
        let step=this.state.step;
        if(step>1){
            let current=this.state.current-this.state.record;
            this.setState({step:step-1,current:current});
            this.props.pageChoose(current);
        }
    }
    goNext(){
        let step=this.state.step;
        if(step<this.state.totalStep){
            let current=this.state.current+this.state.record;
            this.setState({step:step+1,current:current});
            this.props.pageChoose(current);
        }
    }
    render(){
        let self = this;
        /*let totalRecords=this.props.totalRecords;
        let record=this.props.record;*/
        let total = this.state.totalRecords/this.state.record;
        let cur = this.state.current;
        let items = [];
        let len;
        let step=this.state.step;
        let pageRecord=this.state.pageRecord;
        let nowTotal=step*pageRecord;
        if(total > 5){
            len = 5;
            let judeTotal=(step*2-1)*pageRecord/2;
            if(cur==(step-1)*pageRecord+1){
                items.push({num : (step-1)*pageRecord+1, cur : true});
                items.push({num : (step-1)*pageRecord+2, cur : false});
                items.push({num : (step-1)*pageRecord+3, cur : false});
                items.push({num : judeTotal, cur : false,left:true,right:true});
                items.push({num : nowTotal, cur : false});
            }else if(cur==(step-1)*pageRecord+2){
                items.push({num : (step-1)*pageRecord+1, cur : false});
                items.push({num : (step-1)*pageRecord+2, cur : true});
                items.push({num : (step-1)*pageRecord+3, cur : false});
                items.push({num : judeTotal, cur : false,left:true,right:true});
                items.push({num : nowTotal, cur : false});
            }else if(cur==(step-1)*pageRecord+3){
                items.push({num : (step-1)*pageRecord+2, cur : false});
                items.push({num : (step-1)*pageRecord+3, cur : true});
                items.push({num : (step-1)*pageRecord+4, cur : false});
                items.push({num : judeTotal, cur : false,left:true,right:true});
                items.push({num : nowTotal, cur : false});
            }else if(cur==nowTotal){
                items.push({num : (step-1)*pageRecord+1, cur : false});
                items.push({num : judeTotal, cur : false,left:true,right:true});
                items.push({num : nowTotal-2, cur : false});
                items.push({num : nowTotal-1, cur : false});
                items.push({num : nowTotal, cur : true});
            }else if(cur==(nowTotal-1)){
                items.push({num : (step-1)*pageRecord+1, cur : false});
                items.push({num : judeTotal, cur : false,left:true,right:true});
                items.push({num : nowTotal-2, cur : false});
                items.push({num : nowTotal-1, cur : true});
                items.push({num : nowTotal, cur : false});
            }else if(cur==(nowTotal-2)){
                items.push({num : (step-1)*pageRecord+1, cur : false});
                items.push({num : judeTotal, cur : false,left:true,right:true});
                items.push({num : nowTotal-3, cur : false});
                items.push({num : nowTotal-2, cur : true});
                items.push({num : nowTotal-1, cur : false});
            }else{
                items.push({num : (step-1)*pageRecord+1, cur : false});
                items.push({num:cur-1,cur:false,left:true}); 
                items.push({num:cur,cur:true});
                items.push({num:cur+1,cur:false,right:true});
                items.push({num:nowTotal,cur:false})
            }
        }else{
            len = total;
            for(let i = 0; i < len; i ++){
                let cur = this.state.current;
                let showI =(i+1);
                if(cur == showI){
                    items.push({num : showI, cur : true});
                }else{
                    items.push({num : showI, cur : false});
                }
                
            }
        }
        return  (
        		<div className="pageCont">
        			<a className={this.state.step == 1? "prev disable":"prev"} onClick={this.goPrev.bind(this)}></a>
                    {
                        items.map(function(item,i){
                            if(item.left==true&&item.right==true){
                                return (<div key={item.num}><span>.&thinsp;.&thinsp;.</span><a onClick={self.handClick.bind(self,item.num)} className="num">{item.num}</a><span>.&thinsp;.&thinsp;.</span></div>);
                            }else if(item.left==true){
                                return (<div key={item.num}><span>.&thinsp;.&thinsp;.</span><a onClick={self.handClick.bind(self,item.num)} className="num">{item.num}</a></div>);
                            }else if(item.right==true){
                                return (<div key={item.num}><a onClick={self.handClick.bind(self,item.num)} className="num">{item.num}</a><span>.&thinsp;.&thinsp;.</span></div>);
                            }else{
                                return <a key={item.num} onClick={self.handClick.bind(self,item.num)} className={item.cur? "num current":"num"}>{item.num}</a>
                            }
                        })
                    }
                    <a className={this.state.step == this.state.totalStep? "next disable":"next"} onClick={this.goNext.bind(this)}></a>
                </div>
                )
    }

}
DataPager.propTypes={
    totalRecords:React.PropTypes.number, //总记录数
    record:React.PropTypes.number, //每页记录数
    pageChoose:React.PropTypes.func,
    current:React.PropTypes.number //当前页
};
export default DataPager;