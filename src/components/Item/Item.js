import React, {Component} from 'react';
import './Item.css';

export default class Item extends Component {
    constructor(props){
        super(props);

        this.handleDelete = () => {
            this.props.onHandleDelete(this.props.item.name);
        };

        this.handleClick = () => {this.props.onActivate(this.props.item);};
    }

    render() {
        const active = this.props.item.active ? ' active' : "";

        return (
            <div className={"item" + active}>
                <div className="item-content" onClick={this.handleClick}>
                    <p className="item-name">{this.props.item.name}</p>

                    {this.props.item.comments.length > 0 &&
                    <p className="item__comment-number">{this.props.item.comments.length}</p>
                    }
                </div>

                <button type="button" className="delete-btn" onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}
