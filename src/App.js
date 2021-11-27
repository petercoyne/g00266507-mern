import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Add } from './components/add'
import { List } from './components/list'
import { Edit } from './components/edit'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <nav className="w-full flex p-8 bg-gray-100 items-center">
              <img src="/lowpoly.svg" className="mr-4" alt="Lowpoly Garden Centre"/>
              <div>
                <Link to="/" className="button bg-gray-300 hover:bg-gray-200">List Products</Link>
                <Link to="/add" className="button bg-green-300 hover:bg-green-200">Add New Product</Link>
              </div>
            </nav>
          </header>
          <div id="content">
            <Switch>
              <Route path='/' component={List} exact />
              <Route path='/add' component={Add} />
              {/* <Route path='/edit/:id' render={(props) => <Edit {...props} />}/> */}
              <Route path='/edit/:id' component={Edit}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
