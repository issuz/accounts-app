import React, { Component } from 'react';
import axios from 'axios';

export default class RecordForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      title: '',
      amount: '',
    }
  }

  volid() {
    const { date, title, amount } = this.state;
    return date && title && amount;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const { date, title, amount } = this.state;
    const body = { date, title, amount: Number.parseInt(amount, 0) };

    axios.post('https://5be831378d650800131e2754.mockapi.io/api/v1/records',body)
      .then(res => {
        this.props.handleNewRecord(res.data);
        this.setState({
          date: '',
          title: '',
          amount: '',
        });
      })
      .catch(error => {
        console.log(error);
      })

  }

  render() {
    return (
      <form className="form-inline mb-3" onSubmit={this.handleSubmit}>
        <div className="form-group mr-2">
          <input type="text" className="form-control" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange}/>
        </div>
        <div className="form-group mr-2">
          <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange}/>
        </div>
        <div className="form-group mr-2">
          <input type="text" className="form-control" placeholder="Amount" name="amount" value={this.state.amount} onChange={this.handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.volid()}>Create Record</button>
      </form>
    );
  }
}
