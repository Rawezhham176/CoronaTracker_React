import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Donation.css";
import PayP from "../util/PayP";

const Donation = () => {
  const [value, setValue] = useState(1);
  const [msg, setMsg] = useState("");
  const [checkout, setCheckout] = useState();

  return (
    <div>
      <form className="donation_from" id="donation">
        <h1 className="header">Buy me a Coffee ;)</h1>
        <div className="customFieldAmountBox">
          <label className={`${"customField"} ${"customFieldAmount"}`}>
            <input
              type="number"
              min="1"
              placeholder="&nbsp;"
              onChange={(event) => setValue(event.target.value)}
              required
            />
            <span className="placeholder">Enter Amount: {value}$</span>
          </label>

          <label className="customField">
            <textarea
              name=""
              id="message"
              cols="30"
              rows="10"
              onChange={(event) => setMsg(event.target.value)}
              placeholder="Write me a message"
            ></textarea>
          </label>
        </div>

        <div className="paypal_box">
          <PayP value={value} />
        </div>
      </form>
    </div>
  );
};

export default Donation;
