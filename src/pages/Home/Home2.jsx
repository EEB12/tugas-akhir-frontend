import "./Home2.css";
import ChatContent from "../Component/ChatContent";
import ChatContentWA from "../Component/ChatContentWA";
import ChatContentTele from "../Component/ChatContentTele";
import Topbar from "../Component/Topbar";
import TopbarWA from "../Component/TopbarWA";
import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.css";
import dummy from "./dummy-data-live-chat.json";
import Swal from "sweetalert2";
import io from "socket.io-client";
import InfiniteScroll from "react-infinite-scroll-component";
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const sockett = io("localhost:8080/admin", {
  autoConnect: false,
});

let listmessage = [];

const Home2 = () => {
  const [show, setShow] = useState(false);
  const [socket, setSocket] = useState(sockett);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [filter, setFilter] = useState(false);

  const [contactlist, setContactlist] = useState([]);
  const [contactlisttempo, setContactlisttempo] = useState([]);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [session, setSession] = useState("");
  const [sessiontelegram, setSessiontelegram] = useState("");
  const [admin, setAdmin] = useState({});

  const [chatindex, setChatindex] = useState(0);
  const [truchatindex, setTruchatindex] = useState(0);
  const [chatmessage, setChatmessage] = useState([]);
  const [contactinfo, setContactinfo] = useState([]);
  const [pagechat, setPagechat] = useState(0);

  const [chatplatform, setChatPlatform] = useState("");
  const [numberWA, setNumberWA] = useState("");

  const [message, setMessage] = useState("");
  const [sendmessage, setSendmessage] = useState({});
  const [newmessage, setNewmessage] = useState({});
  const [channel, setChannel] = useState("");

  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasmore, setHasmore] = useState(true);
  // const bottomRef = useRef(null);
  // console.log(items.length)
  const handleFilter = () => {
    setFilter(!filter);
  };

  // const getwhatsapp = () => {
  // 	fetch('http://localhost:8080/whatsapp/customer/all',
  // 		{

  // 			headers: {
  // 				session_id: session.value
  // 			}
  // 		}
  // 	).then((res) => res.json())
  // 		.then((data) => {

  // 			const newArr = data.map(v => ({ ...v, platform: "whatsapp" }))
  // 			Object.values(newArr).map((value, index) => {
  // 				setContactlist(current => [...current, value])
  // 				setContactlisttempo(current => [...current, value])
  // 			})

  // 		})

  // }

  const gettelegram = () => {
    fetch("http://localhost:8080/telegram/customers", {})
      .then((res) => res.json())
      .then((data) => {
        const newArr = data.map((v) => ({ ...v, platform: "telegram" }));
        Object.values(newArr).map((value, index) => {
          const isFound = contactlist.find((e) => e.value.id === value.id);

          if (!isFound) {
            setContactlist((current) => [...current, value]);
            setContactlisttempo((current) => [...current, value]);
          }
        });
      });
  };

  const handleScroll = (event) => {
    var cek = event.currentTarget.scrollTop - event.target.clientHeight;

    var cek2 = event.currentTarget.scrollHeight - 2;

    var a = pagechat;
    if (Math.abs(cek) > cek2) {
      // console.log("paling atas")

      a = a + 8;

      // console.log(a, "cek halaman")
      var b = Number(chatindex);

      setPagechat(a);
    }
  };

  // handle chat widget
  const handleChat = (value, index, truindex, platform) => {
    // console.log(value.ChatSocket.id, "ini dari handle chat")
    setSendmessage({});
    var info = {
      id: value.ChatSocket.id,
      socket: value.ChatSocket.socket,
    };
    console.log(contactlist, "contactlist");
    // console.log(info)
    var b = Number(index);
    console.log(b, "ini index");
    // fetchMoreData()
    setTruchatindex(truindex);
    setSendmessage(info);
    setChatindex(b);
    setChatPlatform(platform);
  };

  const handlechannel = (event) => {
    // console.log(value.ChatSocket.id, "ini dari handle chat")

    setChannel(event);
  };

  const handleChatWA = (notelp, platform, truindex) => {
    setSendmessage({});
    fetch("http://localhost:8080/whatsapp/customer", {
      headers: {
        session_id: session.value,
        number: notelp,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setChatmessage(data);
      });

    setNumberWA(notelp);
    setTruchatindex(truindex);
    setChatPlatform(platform);
    setChatindex(0);
  };

  const handleChattele = (noid, platform, truindex) => {
    setSendmessage({});
    console.log(contactlist, "contactlist");
    console.log(noid);
    console.log(session.value);
    var info = {
      id: noid,
    };
    fetch("http://localhost:8080/telegram/customer", {
      headers: {
        id: noid,
        session_id: sessiontelegram.value,
        limit: 20,
        offset: 0,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setChatmessage(data);
      });
    setTruchatindex(truindex);
    setChatPlatform(platform);
    setSendmessage(info);
    setChatindex(0);
  };

  // filter search
  const searchfilter = (event) => {
    var searchinput = event.target.value;
    var b = [...contactlist];
    console.log(b);
    if (searchinput === "") {
      b = contactlisttempo;
    } else {
      b = contactlisttempo.filter((item) => {
        if (item.username == searchinput) {
          // console.log("sama")

          return item.username === searchinput;
        }
      });
    }
    setContactlist(b);
  };

  const filterchannel = () => {
    var filterinput = channel;
    var b = [...contactlist];
    console.log(b);
    if (filterinput === "") {
      b = contactlisttempo;
    } else {
      b = contactlisttempo.filter((item) => {
        if (item.platform == filterinput) {
          // console.log("sama")

          return item.platform === filterinput;
        }
      });
    }

    setContactlist(b);
  };
  const handleKeyforsearch = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
      // setMessage("")
    }
  };

  const messagehandler = (event) => {
    var message = event.target.value;

    setMessage(message);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitmessage();
      // setMessage("")
    }
  };

  const handleKeyDownWA = (event) => {
    if (event.key === "Enter") {
      submitmessageWA();
      // setMessage("")
    }
  };

  const handleKeyDownTele = (event) => {
    if (event.key === "Enter") {
      // console.log("ini tele")
      submitmessageTele();
      // setMessage("")
    }
  };

  // widget
  const submitmessage = () => {
    if (Object.keys(message).length === 0 && message.constructor === Object) {
    } else {
      const data = {
        msg: message,
        to: sendmessage.socket,
        toId: sendmessage.id,
      };
      socket.emit("send_message", data, (message1) => {
        const parseMessage = JSON.parse(message1);
        const date = new Date(parseMessage.created_at);
        console.log(parseMessage);

        setChatmessage((current) => [...current, parseMessage]);
        setMessage("");
        // contedddd()
      });
    }
  };

  const submitmessageWA = () => {
    // console.log("ini jalan")
    if (Object.keys(message).length === 0 && message.constructor === Object) {
    } else {
      const data1 = {
        number: "639452817811",
        session_id: session.value,
        message: message,
      };

      fetch("http://localhost:8080/whatsapp/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data1),
      });

      fetch("http://localhost:8080/whatsapp/customer", {
        headers: {
          session_id: session.value,
          number: numberWA,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          data.sort((a, b) => {
            return a.id - b.id;
          });

          setChatmessage(data);

          // console.log(data[data.length-1],'ceking')
        });

      // setChatmessage(current => [...current, message])
      setMessage("");
    }
  };

  const submitmessageTele = () => {
    // console.log("ini jalan")
    if (Object.keys(message).length === 0 && message.constructor === Object) {
    } else {
      const data1 = {
        id: sendmessage.id,
        session_id: sessiontelegram.value,
        message: message,
      };
      fetch("http://localhost:8080/telegram/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data1),
      })
        .then((res) => res.json())
        .then((data) => {
          setChatmessage((current) => [...current, data]);
          setMessage("");
          // console.log(data[data.length-1],'ceking')
        });
    }
  };
  // ngambil message
  useEffect(() => {
    setChatmessage([]);
    var b = Number(chatindex);
    if (chatplatform === "widget") {
      console.log(chatplatform);
      socket.emit("get_message", b, 0, 8, (messages) => {
        var msgs = JSON.parse(messages);
        setChatmessage(msgs);
      });
    } else {
    }
  }, [chatindex]);

  // inisiasi page awal
  useEffect(() => {
    let fetchddata = async () => {
      setUser(
        await Swal.fire({
          title: "Masukkan Username anda : ",
          input: "text",
          allowOutsideClick: false,
          inputPlaceholder: "Username Admin",
          inputValidator: (value) => {
            if (!value) return "ID tidak boleh kosong";
          },
        })
      );
      setPass(
        await Swal.fire({
          title: "Masukkan Password anda : ",
          input: "password",
          allowOutsideClick: false,
          inputPlaceholder: "Password Admin",
        })
      );

      setSession(
        await Swal.fire({
          title: "Masukkan Session Whatsapp anda : ",
          input: "text",
          allowOutsideClick: false,
          inputPlaceholder: "Session Whatsapp",
        })
      );
      setSessiontelegram(
        await Swal.fire({
          title: "Masukkan id bot telegram anda : ",
          input: "text",
          allowOutsideClick: false,
          inputPlaceholder: "Session Telegram",
        })
      );
    };
    fetchddata();
  }, []);

  // inisiasi page awal pt2
  useEffect(() => {
    if (user !== "" && pass !== "") {
      let fetchData = async () => {
        let username1 = user.value;
        let password1 = pass.value;

        let telegram = sessiontelegram.value;

        // authentikasi melalui socsket
        socket.auth = {
          username: username1,
          password: password1,

          session_telegram: telegram,
        };

        socket.connect();

        socket.on("connect", () => {});

        // list kontak

        // info admin
        socket.on("admin_info", (contact) => {
          var admininfo = JSON.parse(contact);
          setAdmin(admininfo);
        });

        // tiap kali ada new user masuk update contactlist
        socket.on("new_user", (contact) => {
          const parseContact = JSON.parse(contact);
          const isFound = contactlist.find(
            (e) => e.ChatSocket.id === parseContact.ChatSocket.id
          );
          if (!isFound) {
            contactlist((current) => [...current, parseContact]);
          }
        });
        socket.on("telegram_contact", (contact) => {
          const parseContact = JSON.parse(contact);
          parseContact.platform = "telegram";
          const isFound = contactlist.find((e) => e.id === parseContact.id);

          if (!isFound) {
            contactlist((current) => [...current, parseContact]);
          }
        });

        socket.on("whatsapp_msg", (msg) => {
          // const message1 = JSON.parse(msg);

          setChatmessage((current) => [...current, msg]);
        });

        // kalau ada contact baru
        // socket.on("whatsapp_contact", (contact) => {
        // 	const parseContact = JSON.parse(contact);
        // 	console.log(parseContact)
        // 	// const newArr = parseContact.map(v => ({ ...v, platform: "whatsapp" }))
        // 	// make sure when the same user relog its not make new object
        // 	const isFound = contactlist.find(
        // 		(e) => e.ChatSocket.id === parseContact.ChatSocket.id
        // 	);

        // 	if (!isFound) {
        // 		contactlist(current => [...current, parseContact])

        // 	}
        // });

        // socket.onAny((event, ...args) => {
        // 	console.log(event)
        // });

        // ! for development
        socket.on("connect_error", (reason) => {
          console.log(reason);
        });
      };

      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
  });

  useEffect(() => {
    // kalau contact baru
    socket.on("list_contact", (contact) => {
      var contacts = JSON.parse(contact);
      // console.log(contacts)
      contacts = contacts.map((v) => ({ ...v, platform: "widget" }));
      // console.log(contacts,"widget bro")
      setContactlist(contacts);
      setContactlisttempo(contacts);

      // getwhatsapp()
      gettelegram();
    });
  }, []);

  useEffect(() => {
    socket.on("msg", (data) => {
      const message = JSON.parse(data);
      setChatmessage((current) => [...current, message]);
    });
  }, []);

  useEffect(() => {
    socket.on("telegram_msg", (msg) => {
      const message1 = JSON.parse(msg);

      console.log(message1);
      setChatmessage((current) => [...current, message1]);
    });
  }, []);

  useEffect(() => {
    var b = Number(chatindex);
    socket.emit("get_message", b, pagechat, 8, (messages) => {
      var msgs = JSON.parse(messages);

      var oldchat = chatmessage;
      Object.values(msgs).map((value, index) => {
        setChatmessage((current) => [...current, value]);
      });
    });
  }, [pagechat]);

  useEffect(() => {
    filterchannel();
  }, [channel]);

  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-auto sidebar-area ">
            <div className="sidebar2 ">
              <div className="icon-container mt-4">
                <div className="logo mt-1"></div>
                <img src="/icons/tools-light.svg" alt="tools" />
                <img src="/icons/chat-light.svg" alt="chat" />
                {/* <img src="/icons/option-light.svg" alt="option" /> */}
                <a
                  className="nav-link sideMenuItem nav-link-active filterMenu"
                  href="#!"
                  onClick={handleFilter}
                >
                  <div
                    className={
                      filter
                        ? "menu-filter bg-white position-absolute mt-2 d-flex ms-5 py-1 px-2"
                        : "d-none"
                    }
                  >
                    <div>
                      <img
                        className="sub-filter me-2"
                        src="/icons/ic-wa.png"
                        onClick={(e) => handlechannel("Whatsapp")}
                        alt="filter wa"
                      />
                    </div>
                    <div>
                      <img
                        className="sub-filter me-2"
                        src="/icons/ic-line.png"
                        alt="filter wa"
                      />
                    </div>
                    <div>
                      <img
                        className="sub-filter me-2"
                        src="/icons/ic-tele.png"
                        onClick={(e) => handlechannel("telegram")}
                        alt="filter wa"
                      />
                    </div>
                    <div>
                      <img
                        className="sub-filter"
                        src="/icons/ic-globe.png"
                        onClick={(e) => handlechannel("")}
                        alt="filter wa"
                      />
                    </div>
                  </div>
                  <div className="sb-nav-link-icon text-center">
                    <img src="/icons/ic-filter.svg" alt="IcFilter" />
                  </div>
                  {/* <p className="text-center mt-2">Filter</p> */}
                </a>
              </div>
              <div className="logout-container">
                <img src="/icons/logout-light.svg" alt="logout" />
              </div>
            </div>
          </div>

          <div className="col-3 chatlist-area">
            <div className="profile-input-area">
              <img
                class="user-profile"
                src="/icons/user.svg"
                alt="user"
                onClick={() => handleShow()}
              />

              <input
                type="search"
                placeholder="Search"
                onChange={(e) => searchfilter(e)}
              />
            </div>
            <div className="chat-list-container2">
              {/* daftar kontak */}
              {contactlist?.map((value, index) =>
                // console.log(contactlist)

                value.platform == "widget" ? (
                  <div
                    className="chatbox2"
                    onClick={() =>
                      handleChat(value, value.socket_id, index, value.platform)
                    }
                  >
                    <div className="user-image2 me-3">
                      <div id="user-profilepicture">
                        <h1 className="ms-3">
                          {value?.username[0]?.toUpperCase()}
                        </h1>
                      </div>

                      {/* <img src={value.image} id="user-profilepicture" alt="user" /> */}
                      <img
                        className="ms-2"
                        id="icon-platform"
                        src="/icons/ic-globe.png"
                      />
                    </div>
                    <div className="chatbox-detail2 mt-3">
                      <h4>{value.username}</h4>
                      {/* <p>Hey, kabarmu gimana? </p> */}
                    </div>
                  </div>
                ) : value.platform == "whatsapp" ? (
                  <div
                    className="chatbox2"
                    onClick={() =>
                      handleChatWA(value.number, value.platform, index)
                    }
                  >
                    <div className="user-image2 me-3">
                      <img
                        src={value.foto_profil}
                        id="user-profilepicture"
                        alt="user"
                      />
                      <img id="icon-platform" src="/icons/ic-wa.png" />
                    </div>
                    <div className="chatbox-detail2 mt-3">
                      <h4>{value.number}</h4>
                      {/* {value.number} */}
                      {/* <p>Hey, kabarmu gimana? </p> */}
                    </div>
                  </div>
                ) : (
                  <div
                    className="chatbox2"
                    onClick={() =>
                      handleChattele(value.id, value.platform, index)
                    }
                  >
                    <div className="user-image2 me-3">
                      <div id="user-profilepicture">
                        <h1 className="ms-3">
                          {value?.username[0]?.toUpperCase()}
                        </h1>
                      </div>
                      <img id="icon-platform" src="/icons/ic-tele.png" />
                    </div>
                    <div className="chatbox-detail2 mt-3">
                      <h4>{value.username}</h4>
                      {/* {value.number} */}
                      {/* <p>Hey, kabarmu gimana? </p> */}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="col px-0 chat-area	">
            <div className="kotak d-flex flex-column">
              {/* Header Chat */}
              {
                chatplatform === "whatsapp" ? (
                  <TopbarWA
                    contactlist={contactlist}
                    truchatindex={truchatindex}
                  ></TopbarWA>
                ) : (
                  // console.log(chatplatform)
                  <Topbar
                    contactlist={contactlist}
                    truchatindex={truchatindex}
                  ></Topbar>
                )
                // console.log(chatplatform)
              }

              {/* kontent chat */}
              {/* <ChatContent contact={contactlist[truchatindex]} contentChat={chatmessage} idAdmin={admin} socketinfo={sendmessage} index={chatindex} function={handleScroll}></ChatContent> */}

              {chatplatform === "whatsapp" ? (
                <>
                  <ChatContentWA
                    contact={contactlist[truchatindex]}
                    contentChat={chatmessage}
                    idAdmin={admin}
                    socketinfo={sendmessage}
                    index={chatindex}
                    function={handleScroll}
                  ></ChatContentWA>
                </>
              ) : chatplatform === "widget" ? (
                <>
                  <ChatContent
                    contact={contactlist[truchatindex]}
                    contentChat={chatmessage}
                    idAdmin={admin}
                    socketinfo={sendmessage}
                    index={chatindex}
                    function={handleScroll}
                  ></ChatContent>
                </>
              ) : (
                <>
                  <ChatContentTele
                    contact={contactlist[truchatindex]}
                    contentChat={chatmessage}
                    function={handleScroll}
                  ></ChatContentTele>
                </>
              )}

              <div class="tes row g-0 mt-0 mb-0 ">
                <div className="col-auto align-self-center ms-4 me-5">
                  <img src="/icons/smile.svg" alt="tools" />
                </div>
                <div className="col-auto align-self-center me-5">
                  <img src="/icons/attach.svg" alt="tools" />
                </div>

                <div className="col ms-2 ">
                  {chatplatform === "whatsapp" ? (
                    <input
                      className="chat-input"
                      value={message}
                      type="search"
                      placeholder="Search"
                      onKeyDown={(e) => handleKeyDownWA(e)}
                      onChange={(e) => messagehandler(e)}
                    />
                  ) : chatplatform === "telegram" ? (
                    <input
                      className="chat-input"
                      value={message}
                      type="search"
                      placeholder="Search"
                      onKeyDown={(e) => handleKeyDownTele(e)}
                      onChange={(e) => messagehandler(e)}
                    />
                  ) : (
                    <input
                      className="chat-input"
                      value={message}
                      type="search"
                      placeholder="Search"
                      onKeyDown={(e) => handleKeyDown(e)}
                      onChange={(e) => messagehandler(e)}
                    />
                  )}
                </div>

                <div className="col-auto align-self-center ms-5 me-5">
                  <img src="/icons/microphone.svg" alt="tools" />
                </div>

                <div
                  className="col-auto align-self-center me-5 send-message"
                  onClick={() => submitmessage()}
                >
                  <img src="/icons/send.svg" alt="tools" />
                </div>
              </div>
            </div>
          </div>

          <div
            class="col-sm-2 col-auto px-0 collapse collapse-horizontal overflow-hidden profil-kanan"
            id="sidebar"
          >
            <div
              class="list-group border-0 text-center text-sm-start min-vh-100 align-items-center"
              id="sidebar-menu"
            >
              <div className="profile-img"></div>
              {/* <h4>{getchat().nama}</h4>
							<h4>{getchat().number}</h4> */}
            </div>
          </div>

          <Offcanvas show={show} onHide={handleClose} backdrop={false}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Profile</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="profile-lawan-container">
                <div className="profile-lawan-img"></div>
                <h4>{admin.username}</h4>
                <h4>{admin.email}</h4>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </>
  );
};

export default Home2;
