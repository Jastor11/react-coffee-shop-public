import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Navbar  />
        <Sidebar 
          title={ this.props.sidebarTitle } 
          now  ={ this.props.rightnow }
          menu ={ this.props.menu }
        />
        <Main menu={ this.props.menu }   />
        <Footer  />
      </div>   
    )
  }
}

App.defaultProps = {
  sidebarTitle: 'Daily Menu',
  rightnow: new Date().toString()
    .split(" ")
    .slice(0, 4)
    .join(" "),
  menu: {
    coffee: [
      { id: 1, name: 'Espresso',         price: 3.99 },
      { id: 2, name: 'Cafe Latte',       price: 3.50 },
      { id: 3, name: 'Drip Coffee',      price: 1.99 },
      { id: 4, name: 'Iced Coffee',      price: 2.99 },
      { id: 5, name: 'Cold Brew Coffee', price: 4.99 },
      { id: 6, name: 'Cafe Americano',   price: 2.99 },
      { id: 7, name: 'Cappucino',        price: 3.50 },
      { id: 8, name: 'Cafe Mocha',       price: 4.50 },
    ],
    bakery: [
      { id: 9,  name: 'Blueberry Scone',       price: 2.99 },
      { id: 10, name: 'Pumpkin Muffin',        price: 2.50 }, 
      { id: 11, name: 'Cinnamon Raisin Bagel', price: 2.99 }, 
    ]
  }
}


function Navbar(){
  return (
    <div className="App--navbar">
      <h1>Coffee Shop</h1>
    </div>
  )
}

// main component should display the current orders
// and also give users the ability to select items on the menu
class Main extends Component {
  state = {
    orders: [ ],
    menuValue: 'none',
    menuItemValue: 'none',
    menuItemAmountValue: 1
  }
  
  renderOrder = (order, idx) => <OrderItem order={order} key={idx} />

  onMenuSelected = ({ target }) => this.setState({ menuValue: target.value })
  
  onMenuItemSelected = ({ target }) => this.setState({ menuItemValue: target.value })

  handleItemAmountChange = ({ target }) => this.setState({ menuItemAmountValue: target.value })

  renderMenuSelect = () => {
    const keys = Object.keys(this.props.menu)
    return (
      <select value={ this.state.menuValue } onChange={ this.onMenuSelected }>
        <option value={ 'none' }>Select Menu</option>
        {
          keys.map( (category, idx) => {
            return (
              <option value={category} key={idx}>{ category }</option>
            )
          })
        }
      </select>  
    )
  }
  
  renderMenuItemSelect = () => {
    const { menuValue } = this.state
    if ( menuValue === 'none' ) return null
    const items = this.props.menu[menuValue]
    
    return (
      <select 
        value={this.state.menuItemValue} 
        onChange={ this.onMenuItemSelected }
      >
        <option value={ 'none' }>Select Item</option>
        {
          items.map( (item) => {
            return (
              <option value={ item.name } key={ item.id }>
                { item.name } - { item.price.toFixed(2) }
              </option>
            )
          })
        }
      </select>
    )
  }
  
  renderMenuItemAmountInput = () => {
    if ( this.state.menuItemValue === 'none' ) return null
    
    return (
      <input 
        value={ this.state.menuItemAmountValue } 
        onChange={ this.handleItemAmountChange }
      />
    )
  }
  
  handleOrderSubmit = ( ) => {
    const { menuItemValue, menuItemAmountValue, orders } = this.state
    
    const newOrder = {
      customer: `Order #${ orders.length+1 }`,
      items: [
        { name: menuItemValue, amt: menuItemAmountValue }
      ]
    }
    
    this.setState( (prevState) => {
      return {
        orders: [ ...prevState.orders, newOrder ],
        menuValue: prevState.menuValue,
        menuItemValue: 'none',
        menuItemAmountValue: 1
      }
    })
  }

  render(){
    return (
      <div className="App--main">
        <div>
          <h2>Orders</h2>
          <hr />
        </div>
        <ul>
          {
            this.state.orders.length ?
            this.state.orders.map( (order, idx) => this.renderOrder(order, idx) )
            :
            <li key={-1}>No orders yet!</li>
          }
        </ul>
        <div className="select-menu-item">
          <hr />
          <p>
            Enter item here: &nbsp;
            { this.renderMenuSelect()     }
            { this.renderMenuItemSelect() }
            { this.renderMenuItemAmountInput() }
            {
              this.state.menuItemValue !== 'none' &&
              <button 
                style={{ cursor: 'pointer' }}
                onClick={ this.handleOrderSubmit }
              >
                Order
              </button>
            }
          </p>
        </div>
      </div>      
    )
  }
}

function OrderItem( props ){
  const { customer, items } = props.order

  return (
    <li className="order-item">
      <strong>{ customer }</strong>
      <ul>
        {
          items.map( (order, i) => {
            return (
              <li className="menu-item" key={ i }>
                <span>{ order.amt } - </span> { order.name }
              </li>
            )
          })
        }
      </ul>
      <br /><br /><br />
    </li>
  )
}


function Sidebar(props){
  return (
    <div className="App--sidebar">
      <h2>{ props.title }</h2>
      <p>Last updated: { props.now }</p>
      <hr />
      <p><em>Coffee</em></p>
      <ul>
        { 
          props.menu.coffee.map( (item, idx) => {
            return (
              <li className="menu-item" key={idx}>
                { item.name } <span>${item.price.toFixed(2)}</span>
              </li>
            )
          })
        }
      </ul>
    </div>  
  )
}

function Footer(){
  return (
    <div className="App--footer">
      <h5>&copy; 2018 Coffee Shop Inc.</h5>
    </div>  
  )
}


// props is data in your component that does not change
// state is data in your component that DOES change

export default App;
