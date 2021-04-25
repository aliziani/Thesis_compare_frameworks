import React, {Component} from 'react';

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
            id: this.props.id,
            className : this.props.className
        };
    }

    handleChange(e) {
        const {checked} = e.target;

        this.setState({checked});
        this.props.onChange(checked);
    }

    render() {
        return (<input id={this.props.id} className={this.props.className} type="checkbox" checked={this.state.checked} onChange={this.handleChange.bind(this)}/>);
    }
}

export default CheckBox;
