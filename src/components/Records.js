import React, { Component } from 'react';
import Record from './Record';
import axios from 'axios';
import RecordForm from './RecordForm';
import AmountBox from './AmountBox';

class Records extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      records: [],
    }
  }

  componentDidMount() {
    axios.get('https://5be831378d650800131e2754.mockapi.io/api/v1/records')
      .then((res) => {
        this.setState(()=>({
          isLoaded: true,
          records: res.data,
        }))
      })
      .catch(error => {
        this.setState(()=>({
          isLoaded: true,
          error,
        }));
      })
  }

  handleAddRecord = (record) => {
    this.setState((prevState) => ({
      records: [...prevState.records, record],
    }))
  }

  updateRecord = (record, data) => {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item,index) => {
      if (index !== recordIndex){
        return item;
      }
      return {
        ...item,
        ...data,
      };
    });
    this.setState({ records: newRecords });
  }

  deleteRecord = (record) => {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter((item, index) => index !== recordIndex);
    this.setState({ records: newRecords });
  }


  credits() {
    let credits = this.state.records.filter((record) => {
      return record.amount >= 0;
    });

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0);
  }

  debits() {
    let credits = this.state.records.filter((record) => {
      return record.amount < 0;
    })

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  balance() {
    return this.credits() + this.debits();
  }


  render() {
    const { error, isLoaded, records } = this.state;
    let recordsComponets;
    if (error) { 
      recordsComponets = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      recordsComponets = <div>Loading...</div>;
    } else {
      recordsComponets = ( 
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => 
              (<Record
                key={index}
                record={item}
                handleEditRecord={this.updateRecord}
                handleDeleteRecord={this.deleteRecord}
              />)
            )}
          </tbody>
        </table>
      );
    }

    return(
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credits" type="success" amount={this.credits()} />
          <AmountBox text="Debits" type="danger" amount={this.debits()} />
          <AmountBox text="Balance" type="info" amount={this.balance()} />
        </div>
        <RecordForm handleNewRecord={this.handleAddRecord} />
        {recordsComponets}
      </div>
    )
  }
}

export default Records;
