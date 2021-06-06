import React from "react";
import styled from "styled-components";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
let added = false;
class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataForTable: [],
      head: [],
      creditorName: "",
    };
    this.renderData = this.renderData.bind(this);
    this.renderheader = this.renderheader.bind(this);
    this.balanceCounter = this.balanceCounter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
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
  }
  // async componentDidUpdate(prevProps, prevState){
  //     if (prevState.dataForTable !== this.state.dataForTable && added === true ) {
  //         console.log('data state has changed.', prevState.dataForTable )
  //         await axios.get('/api/data').then(res => {
  //         const dataForTable = res.data;
  //         this.setState({ dataForTable });
  //     })
  //       }

  //     console.log(prevState.dataForTable)
  //  }

  deleteData(id) {
    axios.delete(`api/data/${id}`);
  }
  renderData() {
    // console.log('here', this.state.dataForTable)
    return this.state.dataForTable.map((data) => {
      return (
        <tr key={data.id}>
          <input type="checkbox" id="checkboxes" />
          <td>{data.creditorName}</td>
          <td>{data.firstName}</td>
          <td>{data.lastName}</td>
          <td>{data.minPaymentPercentage}</td>
          <td>{data.balance}</td>
        </tr>
      );
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await axios
      .post("/api/data/create", { creditorName: "BANK2" })
      .then((res) => {
        this.getData();
      });
  }
  renderheader() {
    return this.state.head.map((key, index) => {
      switch (key) {
        case "id":
          return (
            <th key={index} className="first">
              <input type="checkbox" />{" "}
            </th>
          ); ///select all if clicked
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
  balanceCounter() {
    let counter = 0;
    this.state.dataForTable.map((elem) => {
      counter += Number(elem.balance);
    });
    console.log(counter);
    return counter;
  }

  render() {
    const { handleSubmit } = this;
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
          <form className="popup" id="popup">
            <div>
              <div>
                <label htmlFor="projectTitle">Creditor Name: </label>
                <input name="title" placeholder="Creditor" />
              </div>
              <div>
                <label htmlFor="projectDeadline">Min Pay %: </label>
                <input name="deadline" placeholder="Minimum Payment %" />
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
          <button className="button2" onClick={handleSubmit}>
            Remove Debt
          </button>
          <p className="total">
            {" "}
            Total{" "}
            {`$${this.balanceCounter()
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </p>
          <div>
            <p className="rowcount">
              {" "}
              Total Row Count: {this.state.dataForTable.length}{" "}
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

  .total {
    flex-direction: column;
    // background-color: grey;
    word-spacing: 350px;
    height: 20px;
    width: 100%;
    text-align: center;
  }

  table {
    width: 100%;
  }

  .rowcount {
    text-align: left;
  }
`;
