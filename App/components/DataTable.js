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
let arr = [];
let counter = 0;
let here;
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
      total: "0.00",
      checked: [],
    };

    this.renderData = this.renderData.bind(this);
    this.renderheader = this.renderheader.bind(this);
    this.balanceCounter = this.balanceCounter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
    this.rowsCount = this.rowsCount.bind(this);
    this.one = this.one.bind(this);
    this.checkedFunc = this.checkedFunc.bind(this);
  }

  async getData() {
    await axios.get("/api/data").then((res) => {
      const dataForTable = res.data;
      this.setState({ dataForTable });
    });

    const head = Object.keys(this.state.dataForTable[0]);
    this.setState({ head });
  }
  one() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let checkbox of checkboxes) {
      if (!checkbox.hasAttribute("checked") || checkbox.checked === false) {
        this.setState({ total: "0.00" });
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevState, prevProp) {
    if (prevState.dataForTable !== this.state) {
      this.getData;
    }
  }

  deleteData(id) {
    let checkbox = document.getElementsByClassName("checkboxes");
    let arr = Array.from(checkbox);
    for (let i = 0; i < arr.length; i++) {
      if (selected) {
        axios.delete(`api/data/${id}`, { id });
        this.getData();
        selected = false;
        arr.splice(indexOf(data1), 1);
        this.setState({ checked: arr });
      }
    }
  }

  rowsCount() {
    this.setState({ rows: this.state.dataForTable.length });
    return this.state.rows;
  }

  renderData() {
    return this.state.dataForTable.map((data) => {
      return (
        <tr key={data.id}>
          <input
            type="checkbox"
            className="checkboxes"
            value={data.balance}
            onClick={() => {
              this.checkedFunc(data);
              clicked = true;
              id = data.id;
              data1 = data;
            
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
  checkedFunc(data) {
    if (!arr.includes(data)) {
      arr.push(data);
      this.setState({ checked: arr });

    } else {
      let index = arr.indexOf(data);
      arr.splice(index, 1);
      this.setState({ total: "0.00" });
      this.setState({ checked: arr });
    }

   
    this.balanceCounter();
  }
  deselect() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type == "checkbox") checkboxes[i].checked = false;
    }
  }
  toggle() {
    let all = document.getElementsByClassName("selectAll");
    let counter = 0;
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    for (let checkbox of checkboxes) {
      if (!checkbox.checked && this.state.dataForTable.length >= 1) {
        here = true;
        checkbox.checked = true;
        allChecked = false;
        clicked = false;
        this.setState({ total: "0.00" });
        this.state.checked.length = this.state.dataForTable.length;
      } else {
        this.setState({ total: "0.00" });
        this.state.checked.length = 0;

        checkbox.checked = false;
        allChecked = true;
      }
    }
    if (here) {
      this.state.dataForTable.forEach((elem) => {
        counter += parseInt(elem.balance);
        this.setState({
          total: counter
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        });
      });
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
                  counter = 0;
                  this.toggle();
                  this.balanceCounter();
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
    let newTotal = 0.0;

    this.state.checked.forEach((el) => {
      parseInt(el.balance);
      if (this.state.checked.length >= 1) {
        newTotal += parseInt(el.balance);
        this.setState({
          total: newTotal
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        });
      } else if (this.state.checked.length < 1) {
        this.setState({
          total: parseInt(el.balance)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        });
      }
    });
  }

  render() {
    const { handleSubmit, handleChange, deleteData } = this;
    const {
      creditorName,
      balance,
      firstName,
      lastName,
      minPaymentPercentage,
      total,
    } = this.state;
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
          <div className="maintotal">
            <p className="total"> Total: </p>
            <p className="total2">${total}</p>
          </div>
          <div className="counts">
            <p className="rowcount">
              {" "}
              Total Row Count: {this.state.dataForTable.length}{" "}
            </p>
            <p className="checkedcount">
              {" "}
              Checked Rows: {this.state.checked.length}{" "}
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
  margin-left: auto;
  margin-right: auto;

  button {
    cursor: pointer;
  }

  .empty {
    border: 0px;
  }
  .maintotal {
    display: flex;
    flex-direction: row;
  }
  .total {

    height: 20px;
    width: 50%;
    text-align: left;
  }
  .total2 {
    
    height: 20px;
    width: 50%;
    text-align: right;
  }

  table {
    width: 100%;
  }
  .counts {
    display: flex;
    flex-direction: row;
  }
  .rowcount {
    text-align: left;
    width: 50%;
  }
  .checkedcount {
    text-align: left;
    width: 50%;
  }
`;
