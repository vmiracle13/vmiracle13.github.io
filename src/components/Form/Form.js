import React from 'react';
import {Component} from 'react';
import './Form.css';
import isEmpty from './../../index';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = (event) => {
            this.setState({value: event.target.value});
        };
        this.handleSubmit = (event) => {
            if (isEmpty(this.state.value)) return;

            this.props.onHandleCreateItem(this.state.value);
        };

        this.handleKeyDown = (event) => {
            const e = event || window.event;

            if (e.ctrlKey && e.keyCode === 13) {
                if (isEmpty(this.state.value)) return;

                this.props.onHandleCreateItem(this.state.value);
                this.setState({value: ''});
                return;
            }

            if(e.keyCode === 13) {
                alert('Use Ctrl + Enter to save an item');
                event.preventDefault();
            }
        };
    }

    render() {
        return (
            <form className="add-item-form"
                  name="add-item-form"
                  onSubmit={this.handleSubmit}
                  onKeyDown={this.handleKeyDown}
            >
                <input className="add-item__input"
                       type="text"
                       placeholder="Type name here..."
                       value={this.state.value}
                       onChange={this.handleChange}
                />
                <input className="add-item__input-submit"
                       type="submit"
                       value="Add new"
                />
            </form>
        );
    }
}
