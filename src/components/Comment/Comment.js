import React, {Component} from 'react';
import './Comment.css';
import isEmpty from './../../index';

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = (event) => {
            this.setState({value: event.target.value});
        };

        this.handleKeyDown = (event) => {
            const e = event || window.event;

            if (e.ctrlKey && e.keyCode === 13) {
                if (isEmpty(this.state.value)) return;

                this.props.onHandleCreateComment(this.state.value);
                this.setState({value: ''});
                return;
            }

            if(e.keyCode === 13) {
                alert('Use Ctrl + Enter to save a comment');
                event.preventDefault();
            }
        };
    }

    render() {
        return (
            <div className="comment-list-wrap">
                <ul className="comment-list">
                    {this.props.comments.map((comment) => {
                        return (
                            <li key={comment.id} className="comment-list__elem">
                                <p className="comment">{comment.text}</p>
                            </li>
                        );
                    })}
                </ul>

                <form className="create-comment-form" onSubmit={this.handleSubmit} onKeyDown={this.handleKeyDown}>
                    <textarea onChange={this.handleChange} value={this.state.value} className="create-comment-form__textarea"/>
                </form>
            </div>
        );
    }
}
