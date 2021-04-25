import React, {Component} from 'react';
import CheckBox from './CheckBox';

export default class  TodoItem extends Component  {

    constructor(props) {
        super(props)
        this.state = {
            text : props.data.text
        }
    }

    handleTextChange = (event) => {
        this.setState({text: event.target.value});
    } 


    render() {
        const {data, changeStatus, removeFromList, changeText} = this.props;
        const handleChange = (checked) => changeStatus(data.id, checked);
        const className = 'todo ui-state-default ' + (data.completed === true ? 'completed' : '');
    
        const idCheckBox = "index-" + Math.random();
        
        return (
            
            <li className={className} data-truc={data.completed}>
                
                {
                    !data.editing ? 
                        <div className="view"> 
                            <CheckBox  id={idCheckBox} className="toggle" checked={data.completed} onChange={handleChange}/>
                            <label forhtml={idCheckBox} onDoubleClick={(e) => { data.editing = true; this.setState({});}} >{data.text}</label>
                            <button className="destroy" onClick={() => removeFromList(data, this.props.index)} ></button>
                        </div>
                    : 
                        <input className="edit" value={this.state.text} type="text" placeholder="edit current text..." 
                        onChange={this.handleTextChange}
                        style={{"display": "block"}}
                        onKeyPress={(e) => {if (e.key === 'Enter') {data.editing = false; changeText(data.id, this.state.text);} return;}} />
                }
            </li>
        );    
      }
}
