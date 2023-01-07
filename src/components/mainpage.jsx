import React from 'react';
import { useState, useEffect } from 'react';
import '../csscomponents/mainpagecss.css';

const MainPage = () => {

    const [formFields, setFormFields] = useState([
        {
            totalAmount : 0,
            downpayment : 0,
            numofmonths: 0,
            interestrate: 0
        }
    ]);

    const [cssStyle, setCssStyle] = useState("invisible");

    const [montlyPayment, setMonthlyPayment] = useState(0);

    const [annualSalary, setAnnualSalary]= useState(0);

    const changeStyle = () =>{
        setCssStyle("visible");
    }

    useEffect(()=>{
        var salary= (montlyPayment*10) *12;
        setAnnualSalary(salary.toFixed(2));
    },[montlyPayment])

    useEffect(() =>{
        var rate = formFields.interestrate / 100;
        var amountBorrowed = formFields.totalAmount - formFields.downpayment;
        var base = 1 - Math.pow(1+(rate/12), -formFields.numofmonths);
        var payment = (amountBorrowed * (rate/12)) / base;
        setMonthlyPayment(payment.toFixed(2));
    }, [formFields.totalAmount, formFields.downpayment, formFields.interestrate, formFields.numofmonths]);

    return ( 
    <React.Fragment>
        <div id='carbac'>
            <div id='overlay'>
                <div id="Heading" className="heading">
                    <h1 className='Heading'>Monthly Car Payment Calculator</h1>
                </div>
            </div>
        </div>
         

        <p  className='message'>Let us help you with the math to give you a peace of mind!</p>

        <div id='form'>
            <form className='grid-container'>
                <div className='borders grid-item1'>   
                
                <label className=''>
                    Total Amount
                    <input type="number"  value={formFields.totalAmount || 0} onChange={(e) => setFormFields({...formFields, totalAmount: e.target.value})}/>
                </label>
                
                <label  className=''>
                    Down Payment
                    <input type="number"  value={formFields.downpayment || 0} onChange={(e) => setFormFields({...formFields, downpayment: e.target.value})}/>
                </label>
                </div>

                <div className='borders grid-item3'>
                <label className=''>
                    Loan Duration
                    <input type="number"  value={formFields.numofmonths  || 0} onChange={(e) => setFormFields({...formFields, numofmonths: e.target.value})}/>
                </label>
                <label className=''>
                    Rate of Interest
                    <input type="number"  value={formFields.interestrate || 0} onChange={(e) => setFormFields({...formFields, interestrate: e.target.value})}/>
                </label>
                </div>
            </form>
        </div>

        <div id='result' className='calc'>
            <p>The monthly payments for your car are <span className='paymentnum'>{(isNaN(montlyPayment)) ? 0 : montlyPayment}</span>$</p>
        </div>

        <div  id='budget'>
            <p>Would you like to know how much you should be earning to comfortable afford the car based on common budgetting guidelines?</p>
            <button onClick={changeStyle}>yes!</button>
            <p className={cssStyle}> Annual Salary based on current monthly payment = {(isNaN(annualSalary)) ? 0 : annualSalary}$</p>
        </div>
        
    </React.Fragment>
    );
}
 
export default MainPage;