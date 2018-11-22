import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Record extends Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  handleToggele = () => {
    this.setState({
      edit: !this.state.edit,
    })
  }

  handleEdit = (event) => {
    event.preventDefault();
    const { id } = this.props.record;
    const record = {
      date: this.refs.date.value,
      title: this.refs.title.value,
      amount: Number.parseInt(this.refs.amount.value, 0),
    };
    
    axios.put(`https://5be831378d650800131e2754.mockapi.io/api/v1/records/${id}`, record)
      .then(res => {
        this.setState({ edit:false });
        this.props.handleEditRecord(this.props.record, res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleDelete = (event) => {
    event.preventDefault();
    const { id } = this.props.record;
    axios.delete(`https://5be831378d650800131e2754.mockapi.io/api/v1/records/${id}`)
      .then(res => {
        this.props.handleDeleteRecord(this.props.record);
      })
      .catch(error => {
        console.log(error);
      })
  }
 
  recordRow() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{this.props.record.amount}</td>
        <td>
          <button className="btn btn-info mr-2" onClick={this.handleToggele}>Edit</button>
          <button className="btn btn-danger mr-2" onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    );
  }

  recordForm() {
    return(
      <tr>
        <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date" /></td>
        <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title" /></td>
        <td><input type="text" className="form-control" defaultValue={this.props.record.amount} ref="amount" /></td>
        <td>
          <button className="btn btn-info mr-2" onClick={this.handleEdit}>Update</button>
          <button className="btn btn-danger mr-2" onClick={this.handleToggele}>Canle</button>
        </td>
      </tr>
    );
  }

  render() {
    if(this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }
}

Record.propTypes = {
  record: PropTypes.object.isRequired,
}

export default Record;
