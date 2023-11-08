import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import "./AllMails.css";
import { UIshowaction, getAllReceivedmails, getAllSendmails} from "../Redux/UIshow";
import { Button, Col, Container, Row} from "react-bootstrap";
const AllMails = () => {
  let email = useSelector((state) => state.auth.email);
  let receivedmails = useSelector((state) => state.UIshow.receivedmails);
  let sendMails = useSelector((state) => state.UIshow.sendMails);
  let recievemsg = useSelector((state) => state.UIshow.togglereceivedmsg);
 const dispatch = useDispatch()
 const navigate = useNavigate()


  useEffect(() => {
    let mail = email.replace(/[@.]/g, "");
    let linkreceived = `https://mail-box-8aa8b-default-rtdb.firebaseio.com/${mail}/send.json`;
    let linkSend = `https://mail-box-8aa8b-default-rtdb.firebaseio.com/${mail}/allsendmail.json`;
    dispatch(getAllReceivedmails(linkreceived));
    setInterval(() => {
      dispatch(getAllSendmails(linkSend));
      console.log("called");
    }, 2000);
  }, [email, dispatch]);
  function showrecieveItems() {
    dispatch(UIshowaction.receivedMailHandler(true));
  }
  function showsentItems() {
    dispatch(UIshowaction.receivedMailHandler(false));
  }
  const allmails = recievemsg ? receivedmails : sendMails;

  


  async function hideStar(item) {
    let mail = email.replace(/[@.]/g, "");
    const obj = {
      email: item.email,
      receiver: item.receiver,
      sender: item.sender,
      subject: item.subject,
      showstar: false,
    };

    if (recievemsg) {
      const getMail = receivedmails.findIndex((email) => {
        return email.id === item.id;
      });
      const copyAllmails = [...receivedmails];
      const objCopy = { ...copyAllmails[getMail] };
      objCopy.showstar = false;
      copyAllmails[getMail] = objCopy;
      dispatch(UIshowaction.HidestarReceived(copyAllmails));
    } else {
      const getMail = sendMails.findIndex((email) => {
        return email.id === item.id;
      });
      const copyAllmails = [...sendMails];
      const objCopy = { ...copyAllmails[getMail] };
      objCopy.showstar = false;
      copyAllmails[getMail] = objCopy;
      console.log(objCopy);
      dispatch(UIshowaction.HidestarSend(copyAllmails));
    }
      try {
        let link;
      if (recievemsg) {
        link = `https://mail-box-8aa8b-default-rtdb.firebaseio.com/${mail}/send/${item.id}.json`;
      } else {
        link = `https://mail-box-8aa8b-default-rtdb.firebaseio.com/${mail}/allsendmail/${item.id}.json`;
      }
        let response = await axios.put(
          link ,
          {
            obj,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.log("Error is", response.data);
        }
      } catch (err) {
        console.log("Error is", err);
      }
      
    }
    async function deleteMail(id) {

      if (recievemsg) {
        const copyAllmails = [...receivedmails];
        const getMail = copyAllmails.filter((email) => {
          return email.id !== id;
        });
        dispatch(UIshowaction.HidestarReceived(getMail));
      } else {
        const copyAllmails = [...sendMails];
        const getMail = copyAllmails.filter((email) => {
          return email.id !== id;
        });
        console.log("hidestar", getMail);
        dispatch(UIshowaction.HidestarSend(getMail));
      }
  
      let mail = email.replace(/[@.]/g, "");
      let link;
      if (recievemsg) {
        link = `https://mail-box-8aa8b-default-rtdb.firebaseio.com/${mail}/send/${id}.json`;
      } else {
        link = `https://mail-box-8aa8b-default-rtdb.firebaseio.com/${mail}/allsendmail/${id}.json`;
      }
      try {
        let response = await axios.delete(link);
        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.log("Error is", response.data);
        }
      } catch (err) {
        console.log("Error is", err);
      }
      
    }
    let allmailsnum = 0;
  for (const mail of receivedmails) {
    if (mail.showstar) {
      allmailsnum += 1;
    }
  }
  return (
    <>
      <Container fluid>
        <Row className="mx-5">
          <Col md="3">
            <button
              className="compose" style={{marginTop:'20px'}}
              onClick={() => {
                navigate("/Welcome");
              }}
              >
              Compose
            </button>
            <div className="inbox">
              <Button variant="outline-primary" onClick={showrecieveItems}>
                Inbox
              </Button>
              <div>{allmailsnum}</div>
            </div>
            <div className="sentdiv">
              <Button variant="outline-primary" onClick={showsentItems}>
                Sent
              </Button>
            </div>
          </Col>
          <Col md="9">
            
            <Table bordered hover style={{marginTop:'20px' ,backgroundColor: 'rgba(255, 255, 255, 1)'}}>
              <thead>
                <tr>
                <th style={{ border: "none" }}>
                    {!recievemsg ? "Send To" : "Received By"}
                  </th>
                  <th style={{ border: "none" }}>Mail</th>
                </tr>
              </thead>
              <tbody>
              {allmails.map((item) => (
                  <tr key={item.id}>
                    <td style={{ border: "none" }}>
                    
                      {item.showstar ? (
                        <span className="golden-text">★</span>
                      ) : (
                        "  "
                      )}
                        {recievemsg ? item.sender : item.receiver}
                    
                    
                  </td>
                    <td
                      style={{ border: "none" }}
                      className="text-with-ellipsis setcursor"
                      onClick={() => hideStar(item)}
                    >
                      <Link
                        to={`/allmails/${item.id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        {item.email}
                      </Link>
                    </td>
                    <td style={{ border: "none" }}>
                      <Button
                        variant="danger"
                        onClick={() => deleteMail(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
    
          </Col>
        </Row>
      </Container>
    </>
  );
                      }
export default AllMails;