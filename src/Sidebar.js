import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import "./Sidebar.css";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExitIcon from "@material-ui/icons/ExitToApp";
import { Add, SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "50%",
    height: "70%",
    overflow: "scroll",

    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user, clickedUid }, dispatch] = useStateValue();
  const [userList, setUserList] = useState([]);
  const [chatList, setChatList] = useState([]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const uid = auth.currentUser?.uid;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    window.location.reload();
  };

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const createChat = async () => {
    await db
      .collection("rooms")
      .get()
      .then((doc) => {
        setChatList(doc.docs);
      });
    handleOpen();
    await db
      .collection("Users")
      .get()
      .then((doc) => {
        setUserList(doc.docs);
      });
  };

  const openChat = async (event) => {
    const chatName = event.target.innerText;
    if (chatName) {
      await db.collection("rooms").add({
        name: chatName,
      });
    }

    setOpen(false);
  };

  return (
    <div className="sidebar">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {userList.map((value, id) => {
              return (
                value.id !== uid && (
                  <div onClick={() => {}} key={value.id} className="chatUser">
                    <Avatar src={value.data().photoURL} />
                    <h5 onClick={openChat}>{value.data().name}</h5>
                  </div>
                )
              );
            })}
          </div>
        </Fade>
      </Modal>
      {/* <div className="chatUser">
            <Avatar/>
            <h5>Name</h5>
           </div> */}
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton onClick={logout}>
            <ExitIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
      <div className="new_chat">
        <Button fullWidth onClick={createChat}>
          <Add></Add>
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
