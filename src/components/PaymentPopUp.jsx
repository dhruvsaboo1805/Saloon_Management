import React from 'react';
import '../styles/PaymentPopUp.css';
import paymentPopupImage from '../assets/payment-pic.png';

const PaymentPopUp = ({ amount, transactionId, totalAmount, onClose }) => {
  return (
    <div className="payment-popup-overlay">
      <div className="payment-popup">
        <div className="payment-popup-header">
          <h2>Payment Window</h2> 
          {/* temporary hain */}
           <button className="close-button" onClick={onClose}>X</button>  
        </div>
        <div className="payment-popup-content" >
          <div className="payment-method">
            <p>Payment Method</p>
            <label>
              Cash
              <input type="radio" name="paymentMethod" value="cash" defaultChecked />
            </label>
            <label className="upi-label">
              UPI
              <input type="radio" name="paymentMethod" value="upi" />
            </label>
            <label>
              Card
              <input type="radio" name="paymentMethod" value="card" />
            </label>
          </div>
          <div className="payment-details">
            <div className="payment-details-amt">
                <p>Amount: <span>{amount}</span></p>
            </div>
            <div className="payment-detials-tst">
                <p>Transaction ID: <span>{transactionId}</span></p>
            </div>
          </div>
          <div className="payment-total">
            <p>Total Amount: <span>{totalAmount}</span></p>
          </div> 
           <button className="mark-as-paid">Mark as Paid</button> 
        </div>
      </div>
    </div>
  );
};

export default PaymentPopUp;
