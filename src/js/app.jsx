import React from 'react';
import '../css/style.less'

/**************************** Button ************************************/
function Button(props) {
  return (
    <button      
            type="submit" 
            onClick={props.onClick} 
            name="submit" 
            className="btn btn-primary col-md-5 text-center form-control "
            id="mainButton">
            Calculate
    </button>
  )
};

function CalcTable(event, rate, balance, term) {
  
    let r = (rate/100)/12;
    let n = term * 12;
    let upper = r*(Math.pow((1+r),n));  
    let lower = (Math.pow((1+r), n ) -1);
    let frac = (upper/lower);
    let m = balance * frac;
    m = m.toFixed(2);
    m = parseFloat(m);
    var curBalance = balance;
    var data = [];
    var t = [];
    for (let i = 0; i < n; i ++) {
      let period = i + 1;
      let interest = ((rate/100) * curBalance)/12;
      interest = interest.toFixed(2);
      parseFloat(interest);
      let principal = m - interest;
      principal = principal.toFixed(2);
      parseFloat(principal);
      curBalance -= principal;
      curBalance = curBalance.toFixed(2);
      parseFloat(curBalance);
      data[i] = {period, interest, principal, curBalance}
      t[i] = i;

    }
    var def = new Array(15);
    if (t.length === 0) {
      t = def;
    } else { 
      t === t
    }
    
    var key = 0;
    key = key + 1;
    return (
      <tbody>{def.map((tr)=>{tr
        return (
          <tr key = {key++}>
          {[1,2,3,4].map((td)=> {
            return (
            <td key = {key++}>{td}</td>
            )
          })}
          </tr>
        )
      })}
      </tbody>

      // <tbody>{t.map((trows) => {
      //   return(
      //   <tr key = {key}>{data.map((tdata) => {
      //     return (
      //     <td key = {tdata.period}>{tdata.period}</td>,
      //     <td key = {tdata.interest}>{tdata.interest}</td>,
      //     <td key = {tdata.principal}>{tdata.principal}</td>,
      //     <td key = {tdata.curBalance}>{tdata.curBalance}</td>
      //     )
      // })}
      //   </tr>
      //   )
      // })}
      // </tbody>
      
    )
    
    
    
}
/**************************** Table ************************************/
class Table extends React.Component {

  /**************************** Table Calc ************************************/

  render () {
    return (
      <table className = "table table-bordered">
        <thead>
          <tr>
            <th>Period</th>
            <th>Interest</th>
            <th>Principal</th>
            <th>Balance</th>
          </tr>
        </thead>
          {<CalcTable/>}
      </table>
    )
  }
}
/**************************** APP ************************************/

/**************************** APP ************************************/
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      balance: "",
      rate: "",
      term: "15",
      output: 0
    };
    this.handleBalance = this.handleBalance.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.handleTerm = this.handleTerm.bind(this);
    this.calculate = this.calculate.bind(this);
  };

  handleBalance(event) {
    const balance = (event.target.validity.valid) ? event.target.value : this.state.balance;
    this.setState({balance})
  };
  handleRate(event) {
    const rate = (event.target.validity.valid) ? event.target.value: this.state.rate;
    this.setState({rate})
  };
  handleTerm(event) {
    this.setState({
      term: event.target.value,
    })
  };


  calculate(e) {
    e.preventDefault();
    let p = 0;
    let r = 0;
    let n = 0;
    p = this.state.balance;
    r = this.state.rate;
    n = this.state.term;
    p = parseInt(p);
    r = parseFloat(r);
    n = parseInt(n);
    CalcTable(e, r , p , n);
    r = (r / 100) / 12;
    n = n * 12;
    let upper = Math.pow((1 + r), n);
    upper = upper * r;
    let lower = Math.pow((1 + r), n);
    lower = lower - 1;
    let frac = (upper / lower);
    let m = p * frac;
    m = m.toFixed(2);
    this.setState({
      output: "$" +m + " a month",
    });
    
  };



  render() {
    return (
      <div>
      <div className = "fullPage">
      <div className = "headerDiv">
      <header >
        Mortgage Calculator
      </header>
      </div>
      <div className='container Calc'>        
        <div className = "formClass"> 
        <form className="form-horizontal wholeForm">
          <div className="form-group">
            <label  htmlFor="loan" 
                    className="control-label col-md-4 label">
                    Loan Balance
            </label>
            <div className="col-md-4">
              <input  className= "inputs form-control" 
                      id="loan" 
                      name="balance" 
                      type="text" 
                      pattern ="[0-9]*" 
                      value={this.state.balance} 
                      onChange={this.handleBalance} />
            </div>
          </div>

          <div className="form-group">
            <label  htmlFor="intRate" 
                    className="control-label col-md-4 label">
                    Interest Rate (%)
            </label>
            <div className="col-md-4">
              <input  className= "inputs form-control" 
                      id="intRate" 
                      name="rate" 
                      type="text" 
                      pattern = "^[0-9]+(\.[0-9]*)?$" 
                      value={this.state.rate} 
                      onChange={this.handleRate} />
            </div>
            
          </div>

          <div className="form-group">            
              <label  htmlFor="loanTerms" 
                      className="control-label col-md-4 label">
                      Loan Terms
               (years)
              </label>
              <div className="col-md-4">
                <select name="term" 
                        className= "select form-control" 
                        id="loanTerms" 
                        value={this.state.value} 
                        onChange={this.handleTerm}>                           
                  <option value="15"> 15 </option>
                  <option value="30"> 30 </option>
                </select>
              </div>            
          </div>

          <div className="form-group buttonGroup">
            <div className="row buttonDiv">
             <Button onClick={this.calculate}/>  
            </div>            
          </div>                    
        </form>
        <div className="row outputRow">
            <div className="outputDiv" name="output" id="output" >
              <div className="col-md-12 outputCol">
                {(this.state.output)}  
              </div>
            
            </div>
          </div>
        </div>
      </div>
      </div>
      <footer>
        <div className = "footer"></div>
      </footer>
      </div>
    );
  }
}
