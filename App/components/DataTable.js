import React from "react";
import styled from "styled-components";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
let clicked = false;
let selected = false;
let checkedCount = 0;
let allChecked = false;
let id;

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataForTable: [],
      head: [],
      creditorName: "",
      balance: "",
      firstName: "",
      lastName: "",
      minPaymentPercentage: "",
      total:"",
    };

    this.renderData = this.renderData.bind(this);
    this.renderheader = this.renderheader.bind(this);
    this.balanceCounter = this.balanceCounter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
    this.rowsCount = this.rowsCount.bind(this);

  }

  async getData() {
    await axios.get("/api/data").then((res) => {
      const dataForTable = res.data;
      this.setState({ dataForTable });
    });

    const head = Object.keys(this.state.dataForTable[0]);
    this.setState({ head });
  }

  componentDidMount() {
    this.getData();
  }4

  componentDidUpdate(prevState, prevProp){
if (prevState.dataForTable !== this.state){
  this.getData
}}

  deleteData(id) {
    let checkbox = document.getElementsByClassName("checkboxes")
   let arr = Array.from(checkbox)
    for(let i = 0; i < arr.length; i++){
      let one = arr[i]
      if (selected) {
        console.log('hi')
        axios.delete(`api/data/${id}`, { id });
        this.getData();
        selected = false;
      }
    }
  }
  rowsCount(){
    this.setState({rows: this.state.dataForTable.length})
    return this.state.rows
  }  

renderData() {
    return this.state.dataForTable.map((data) => {
      return (
        <tr key={data.id}>
          <input
            type="checkbox"
            className="checkboxes"
            value={(data.id, data.balance)}
            onClick={() => {
              checkedCount++;
              clicked = true;
              selected = true
              // if (clicked){
                id = data.id
              this.balanceCounter(data.balance);
              // }
            }}
          />
          <td>{data.creditorName}</td>
          <td>{data.firstName}</td>
          <td>{data.lastName}</td>
          <td>{data.minPaymentPercentage}</td>
          <td>{data.balance}</td>
        </tr>
      );
    });
  }
  toggle() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let checkbox of checkboxes) {
      if (checkbox.hasAttribute("checked")) {
        checkbox.removeAttribute("checked");
        allChecked =false
        clicked = false
      } else {
        checkbox.setAttribute("checked", "true");
        allChecked = true
      }
      
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async handleSubmit(event, newdata) {
    event.preventDefault();
    await axios.post("/api/data/create", this.state).then((res) => {});
    this.getData();
  }
  renderheader() {
    return this.state.head.map((key, index) => {
      switch (key) {
        case "id":
          return (
            <th key={index} className="first">
              <input
                type="checkbox"
                className="selectAll"
                onClick={() => {
                  this.toggle();
                  this.balanceCounter()
                }}
              />{" "}
            </th>
          );
        case "creditorName":
          return <th key={index}>Creditor</th>;

        case "firstName":
          return <th key={index}>First Name</th>;

        case "lastName":
          return <th key={index}>Last Name</th>;

        case "minPaymentPercentage":
          return <th key={index}>Min Pay %</th>;

        case "balance":
          return <th key={index}>Balance</th>;

        default:
      }
    });
  }

  balanceCounter(data) {
    let counter = 0;
    let balance = this.state.dataForTable;
    for(let i = 0; i < balance.length; i ++){
      if (allChecked){
        let newarr = Object.values(balance)
        newarr.forEach((el) => {
          counter += parseInt(el.balance)

          this.setState({total: counter.toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") })
        })
      } else if(clicked) {
        counter += parseInt(data)
        
        this.setState({total: counter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })
      } else{
        counter = 0
        counter = counter.toFixed(2).toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.setState({total: counter})
      }
    }
  }

  render() {
    const { handleSubmit, handleChange, deleteData } = this;
    const { creditorName, balance, firstName, lastName, minPaymentPercentage, total } =
      this.state;
    return (
      <Container>
        <Table>
          <table>
            <tbody id="data">
              <tr className="header">{this.renderheader()}</tr>
              {this.renderData()}
            </tbody>
            <td className="empty"></td>
          </table>
          <form className="popup" id="popup" onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="creditorname">Creditor : </label>
                <input
                  name="creditorName"
                  placeholder="Creditor Name"
                  onChange={handleChange}
                  value={creditorName}
                />
              </div>
              <div>
                <label htmlFor="firstName">First Name: </label>
                <input
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={firstName}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name: </label>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={lastName}
                />
              </div>
              <div>
                <label htmlFor="minPaymentPercentage">Payment %: </label>
                <input
                  name="minPaymentPercentage"
                  placeholder="Min Pay%"
                  onChange={handleChange}
                  value={minPaymentPercentage}
                />
              </div>
              <div>
                <label htmlFor="balance">Balance: </label>
                <input
                  name="balance"
                  placeholder="Balance"
                  onChange={handleChange}
                  value={balance}
                />
              </div>
              <button type="submit">Submit</button>
            </div>
          </form>
          <button
            className="button1"
            onClick={function myFunction() {
              var x = document.getElementById("popup");
              if (x.style.display === "none") {
                x.style.display = "block";
              } else {
                x.style.display = "none";
              }
            }}
          >
            {" "}
            Add Debt
          </button>
          <button
            className="button2"
            onClick={() => {
              selected = true;
              this.deleteData(id);
              this.getData();
            }}
          >
            Remove Debt
          </button>
          <div className='maintotal'>
          <p className="total">
            {" "}
            Total{" "}
            
          </p>
      <p className="total2">${total}</p>
      </div>
          <div className='counts'>
            <p className="rowcount">
              {" "}
              Total Row Count: {this.state.dataForTable.length}{" "}
            </p>
            <p className="checkedcount">
              {" "}
              Checked Rows: {checkedCount}{" "}
            </p>

          </div>
        </Table>
      </Container>
    );
  }
}

export default DataTable;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 200px;
  flex-direction: column;
`;

const Table = styled.div`
  // background-color: lightblue;
  margin-left: auto;
  margin-right: auto;
  // flex-direction: column;

  button {
    cursor: pointer;
  }

  .empty {
    border: 0px;
  }
  .maintotal{
    // background-color: red;
    display: flex;
    flex-direction: row;
  }
  .total {
    // flex-direction: row;
    // background-color: grey;
    // word-spacing: 350px;
    height: 20px;
    width: 50%;
    text-align: left;
  }
  .total2{
    // flex-direction: column;
    // background-color: grey;
    // word-spacing: 350px;
    height: 20px;
    width: 50%;
    text-align: right;
  }

  table {
    width: 100%;
  }
  .counts {
    // background-color: red;
    display: flex;
    flex-direction: row;
  }
  .rowcount {
    text-align: left;
    width: 50%;
    // background-color: grey;

  }
  .checkedcount {
    text-align: left;
    width: 50%;
    // background-color: grey;

  }
`;
