import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import './Welcome.css'

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { UIshowaction } from "../Redux/UIshow";




const Welcome = () => {
    let email = useSelector((state) => (state.auth.email))
    const dispatch = useDispatch()
    const [text, setText] = useState("");
    const [sender, setSender] = useState("");
    function GetTextformEditor() {
      const plainText = extractPlainTextFromHTML(text);
      storeEmail(plainText);
    }
  
  function extractPlainTextFromHTML(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  }
  async function storeEmail(text) {
    email = email.replace(/[@.]/g, "");
    const obj = {
        email: text,
        sender: sender,
        showstar:true,
      };
    try {
        let response = await axios.post(
          `https://mail-box-8aa8b-default-rtdb.firebaseio.com/${email}/data.json`,
          {
            obj,
          },
          {
            headers: {
              "Content-Type": "Application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          const sendobj = { id: response.data.name, showstar: true };
        dispatch(UIshowaction.anothershowStar(sendobj));
        } else {
          console.log("Error:", response.data, response.status);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    }
      
    return (
    
         <>
      
      <div className="emailbox">
        <div className="forwidth">
          <h2>Send Email</h2>
          <div className="mail-box">
            <small className="text-email">
              To
              <small className="email-body">
                
                <small className="mx-1"> {email}</small>
              </small>
            </small>
            <small className="text-email2">Cc/Bcc</small>

            <small className="text-email mt-3">
              <textarea
                id="plainText"
                style={{
                  border: "none",
                  outline: "none",
                  height: "20px",
                  width: "100%",
                  resize: "none",
                }}
                onChange={(e) => {
                  setSender(e.target.value);
                }}
              ></textarea>
            </small>
            <div>
              <SunEditor
                autoFocus={true}
                width="700"
                height="200"
                setDefaultStyle="font-size:16px"
                onChange={(text) => setText(text)}
              />
            </div>
            <button onClick={GetTextformEditor} className="sendbtn">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
        
    )

}


export default Welcome