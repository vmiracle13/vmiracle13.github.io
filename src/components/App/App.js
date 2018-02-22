import React, {Component} from 'react';
import './App.css';
import Form from './../Form/Form';
import Item from './../Item/Item';
import Comment from './../Comment/Comment';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem('itemList')) ? {items: JSON.parse(localStorage.getItem('itemList'))} : {items: []};
        this.handleCreateItem = this.handleCreateItem.bind(this);
        this.handleCreateComment = this.handleCreateComment.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleActivate = this.handleActivate.bind(this);
    }

    handleCreateItem(name) {
        const notUnique = this.state.items.some((item) => {
            return item.name === name;
        });

        if (notUnique) {
            alert('Duplicate item can not be saved');
            return;
        }

        const item = {
            name: name,
            id: this.state.items.length,
            active: !this.state.items.length,
            comments: []
        };

        this.setState({items: (this.state.items).concat([item])}, () => {
            this.saveIntoLocalStorage(this.state.items);
        });
    }

    handleCreateComment(text) {
        const updatedItems = this.state.items.map((item) => {
            if (item.active) {

                const commentObj = {
                    id: item.comments.length,
                    text: text
                };

                item.comments.push(commentObj);
            }

            return item;
        });

        this.setState({items: updatedItems}, () => {
            this.saveIntoLocalStorage(updatedItems);
        });
    }

    saveIntoLocalStorage(array) {
        localStorage.setItem('itemList', JSON.stringify(array));
    }

    handleDeleteItem(name) {
        const updatedItems = this.state.items.filter((item, i) => {
            if (item.name !== name) {
                return item;
            }
        });

        if (updatedItems.length) {
            updatedItems[0].active = true;
        }

        this.setState({items: updatedItems}, () => {
            this.saveIntoLocalStorage(updatedItems);
        });
    }

    handleActivate(item) {
        this.activeItem.active = false;
        this.activeItem = item;
        this.activeItem.active = true;
        this.setState({items: this.state.items});
        this.saveIntoLocalStorage(this.state.items);
    }

    render() {
        this.activeItem = this.state.items.filter((item) => {
            if (item.active) return item;
        })[0];

        return (
            <div className="app">
                <aside className="aside">
                    <h2 className="aside_title">Dairy app</h2>
                    <p className="aside_text">Comment with no sense</p>
                </aside>

                <div className="content-block">
                    <div className="items-wrap">
                        <h2 className="items-wrap__h2">Items</h2>
                        <Form onHandleCreateItem={this.handleCreateItem}/>

                        {this.state.items.length > 0 &&
                        <div>
                            <ul className="item-list">
                                {this.state.items.map((item) => {
                                    return (
                                        <li key={item.name} className="item-list__elem">
                                            <Item item={item}
                                                  onHandleDelete={this.handleDeleteItem}
                                                  onActivate={this.handleActivate}
                                            />
                                        </li>
                                    );
                                })
                                }
                            </ul>
                        </div>}
                    </div>

                    <div className="comment-wrap">
                        {this.state.items.length > 0 &&
                        <div>
                            {<h2 className="comment-wrap__h2">Comments #{this.activeItem.id + 1}</h2>}
                            {<Comment
                                comments={this.activeItem.comments}
                                onHandleCreateComment={this.handleCreateComment}
                            />}
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

