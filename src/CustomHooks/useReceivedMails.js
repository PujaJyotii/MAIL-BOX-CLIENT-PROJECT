import axios from "axios";
import { useDispatch } from "react-redux";
import { UIshowaction } from "../Component/Redux/UIshow";
import { useEffect } from "react";

function useReceivedMails(email) {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchReceivedMails = async () => {
        let mail = email.replace(/[@.]/g, "");
        let link = `https://mail-box-8aa8b-default-rtdb.firebaseio.com/${mail}/send.json`;
  
        try {
          let response = await axios.get(link);
          let arr = [];
          if (response.status === 200) {
            const data = response.data;
            if (data !== null && data !== undefined) {
              const keys = Object.keys(data);
              for (const key of keys) {
                let item = data[key];
                let myobj = {
                  ...item.obj,
                  id: key,
                };
                arr.push(myobj);
              }
              dispatch(UIshowaction.receiveallMails(arr));
            } else {
              console.log("response is null");
            }
          } else {
            console.log("Error:", response.data);
          }
        } catch (err) {
          console.log("Error:", err);
        }
      };
  
      fetchReceivedMails();
    }, [email, dispatch]);
  
    return null; // You can return any additional data or state you need here
  }
  
  export default useReceivedMails;