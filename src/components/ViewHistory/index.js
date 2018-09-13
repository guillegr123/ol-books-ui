import React, { Component } from 'react';
import { Icon, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import store from '../../store';

class ViewHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewHistory: store.getState().viewHistory
    };

    this.storeUnsubscribe = store.subscribe(() => {
      this.setState({
        viewHistory: store.getState().viewHistory
      });
    });
    console.log('ViewHistory subscribed to store.');
  }

  componentWillUnmount() {
    this.storeUnsubscribe();
    console.log('ViewHistory unsubscribed from store.');
  }

  render() {
    return (
      <div>
        <h2>Vistas recientes</h2>
        <List>
          { this.state.viewHistory.map(item =>
            <List.Item key={ item.olid } as={ Link } name={ item.olid } to={ `works/${item.olid}` }>
              <Icon name="book" />
              { item.title }
            </List.Item>
          ) }
        </List>
      </div>
    );
  }
}

export default ViewHistory;
