import React from 'react';
import $ from 'jquery';
import ListItemEntry from './ListItemEntry.jsx';
import ItemForm from './ItemForm.jsx';

class ListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.list._id,
      store: '' || this.props.stores.name,
      total_price: 0.00,
      items: this.props.list.items,
      stores: this.props.stores
    }
    console.log('SET THE STATE TO BE ', this.state)
  } // end constructor

  updateList(newItem, callback) {
    $.ajax({
      url: '/addItem',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        newItem: newItem,
        list: this.props.list._id,
      }),
      success: (data) => {
        data = JSON.parse(data);
        console.log('add item returned ', data)
        this.setState({items: data[0].items});
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  handleStoreChange(e) {
    this.setState({store: e.target.value});
  }
  render() {
    console.log(this.state,'from listEntry')
      return (
        <div>
          <h3>{this.props.list.name}</h3>
          <br/>
          <select className="store-selection" onChange={this.handleStoreChange.bind(this)}>
            <option key="new">New store</option>
            {
              this.state.stores.map((store, index) => {
                return <option key={index}>{store}</option>
              })
            }
          </select>
          <br/>
          <br/>
          <table>
            <tbody>
              {
                // console.log('these are the items', this.state.items)
                this.state.items.map((item) => {
                  return <ListItemEntry key={item._id} item={item}/>
                })
              }
            </tbody>
          </table>

          <br/>
          <ItemForm updateList={this.updateList.bind(this)}/>
          <button type="button">Delete</button>
          <button type="calculate">Calculate</button>
        </div>
      );
  } // end render
} // end component

export default ListEntry;