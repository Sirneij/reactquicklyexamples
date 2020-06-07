import React from 'react';
import './App.css';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, Table} from 'react-bootstrap';

function DigitalDisplay (props){
	return (
		<div>
			{props.time}
		</div>
	)
}
function AnalogDisplay(props){
	let date = new Date(props.time)
	let dialStyle = {
		position: 'relative',
		top: 0,
		left: 0,
		width: 200,
		height: 200,
		borderRadius: 20000,
		borderStyle: 'solid',
		borderColor: 'black'
	}
	let secondHandStyle = {
		position: 'relative',
		top: 100,
		left: 100,
		border: '1px solid red',
		width: '40%',
		height: 1,
		transform: 'rotate(' + ((date.getSeconds()/60)*360 - 90).toString() + 'deg)',
		transformOrigin: '0% 0%',
		backgroundColor: 'red'
	}
	let minuteHandStyle = {
		position: 'relative',
		top: 100,
		left: 100,
		border: '1px solid grey',
		width: '40%',
		height: 3,
		transform: 'rotate(' + ((date.getMinutes()/60)*360 - 90).toString() + 'deg)',
		transformOrigin: '0% 0%',
		backgroundColor: 'grey'
	};
	let hourHandStyle = {
		position: 'relative',
		top: 95,
		left: 105,
		border: '1px solid grey',
		width: '20%',
		height: 7,
		transform: 'rotate(' + ((date.getHours()/12)*360 - 90).toString() + 'deg)',
		transformOrigin: '0% 0%',
		backgroundColor: 'grey',
	};
	return (
			<div style={dialStyle}>
				<div style={secondHandStyle}></div>
				<div style={minuteHandStyle}></div>
				<div style={hourHandStyle}></div>
			</div>
	)
}

class App extends React.Component{
	constructor(props){
		super(props)
		this.launchClock()
		this.sayTime = this.sayTime.bind(this)
		this.handleRadio = this.handleRadio.bind(this)
		this.state = {
		currentTime: (new Date()).toLocaleString(),
		users:[],
		counter: 0,
		radioGroup:{
			angular: false,
			react: true,
			polymer: false
		}
		}
	}
	handleRadio(event){
		let obj = {}
		obj[event.target.value] = event.target.checked
		this.setState({radioGroup: obj})
	}
	sayTime(){
		//this.setState({counter: ++this.state.counter})
		alert(this.lauchClock)
	}
	componentDidMount(){
		fetch('http://jsonplaceholder.typicode.com/users').then(response => response.json()).then((users) => this.setState({users: users})).catch(function(error){
			console.log(error.message)
		})
	}
	launchClock(){
		setInterval(function(){
			this.setState({
				currentTime: (new Date()).toLocaleString()
			})
		}.bind(this), 1000)
	}
	render(){
		return (
			<div className="App">
				  <header>
        <Navbar expand="lg" variant="dark" bg="dark">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item>Action</NavDropdown.Item>
                    <NavDropdown.Item>Another action</NavDropdown.Item>
                    <NavDropdown.Item>Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
          </Navbar.Collapse>
        </Navbar>
      </header>
      		<div className="container">
      		<div className="row mt-5">
      		            <div className="col-lg-4 mb-4 grid-margin">
      		              <div className="card h-100">
      		                  <h4 className="card-header">Real-time clock display</h4>
      		                  <div className="card-body">
      		                  <AnalogDisplay time={this.state.currentTime}/>
      		                  <DigitalDisplay time={this.state.currentTime} className="btn btn-primary" />
      		                  </div>
      		                 </div>
      		              </div>
      		            </div>
	<div className="row mt-5">
      		            <div className="col-lg-4 mb-4 grid-margin">
      		              <div className="card h-100">
      		                  <h4 className="card-header">Real-time Form</h4>
      		                  <div className="card-body">
      		                  <Form>
      		                 <Form.Check type="radio" name="radioGroup" value='angular' checked={this.state.radioGroup['angular']} onChange={this.handleRadio} label='Angular'/>
      		                  
      		                  <Form.Check type="radio" name="radioGroup" value='react' checked={this.state.radioGroup['react']} onChange={this.handleRadio} label='React'/>
      		                  
      		                  <Form.Check type="radio" name="radioGroup" value='polymer' checked={this.state.radioGroup['polymer']} onChange={this.handleRadio} label='Polymer'/>
      		                  </Form>
      		                  </div>
      		                 </div>
      		              </div>
      		            </div>
      		            
<div className="row mb-4">
          <div className="col-sm-12 grid-margin">
            <div className="card h-100">
              <h4 className="card-header">Table</h4>
              <div className="card-body">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company Catch Phrase</th>
                      <th>Call</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>{this.state.users.map((user) => 
                    <tr key={user.key}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.company.catchPhrase}</td>
                      <td>
                      <Button color="success">call</Button>
                      </td>
                      <td>
                      <Button color="warning">email</Button>
                      </td>
                    </tr>)}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      		            
      		            </div>
				</div>
		)
	}
}

export default App;
