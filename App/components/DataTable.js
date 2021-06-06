import React from 'react'
import styled from 'styled-components'
import { Component } from 'react'
import axios from 'axios'
class DataTable extends Component {
    constructor(props) {
        super(props)
       this.state = {
           dataForTable: [],
           head: []
       }
        this.renderData = this.renderData.bind(this)
        this.renderheader = this.renderheader.bind(this)
        this.balanceCounter = this.balanceCounter.bind(this)
    }
    async componentDidMount(){
        await axios.get('/api/data').then(res => {
            const dataForTable = res.data;
            this.setState({ dataForTable });
        })
        const head =  Object.keys(this.state.dataForTable[0])
        this.setState({ head })
    }
    renderData(){
        return this.state.dataForTable.map((data) => {
        return (
            <tr key={data.id}>
              <input type ='checkbox' /><td>{data.creditorName}</td>
               <td>{data.firstName}</td>
               <td>{data.lastName}</td>
               <td>{data.minPaymentPercentage}</td>
               <td>{data.balance}</td>
            </tr>
        )
        })
    }

    renderheader(){
        return this.state.head.map((key, index) => {
            switch(key){
                case "id":
                    return <th key={index} className="first"><input type='checkbox' /> </th>; ///select all if clicked
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
        })
    }
    balanceCounter(){
    let counter = 0; 
    this.state.dataForTable.map((elem)=>{
        counter += parseInt(elem.balance)
    })
return counter
    }
    render(){ 
        return(
        <Container>
            <Table>
        <table id='data'>

            <tbody>
                <tr className ='header'>{this.renderheader()}</tr>
                {this.renderData()}
            </tbody>
            <td className='empty'></td>
            <button className ="button1"> Add Debt</button>
            <button className ="button2"> Remove Debt</button>
            
            </table>
            <p className='total'> Total {`$${this.balanceCounter().toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
             </p>
             <div>
             <p className='rowcount'> Total Row Count: {this.state.dataForTable.length} </p>
             
             </div>

            </Table>
            
        </Container>
    )}
}

export default DataTable

const Container = styled.div`
display: flex;
justify-content: center;
align-content: center;
margin: 200px;
flex-direction: column;
`


const Table = styled.div`
// background-color: lightblue;
margin-left: auto;
margin-right: auto;
button { 
    cursor: pointer;
}

.empty{
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

table{
    width 100%;
}

.rowcount {
text-align: left;

}
`