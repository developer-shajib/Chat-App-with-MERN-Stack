import avatar from '../../assets/images/avatar.jpg';
import { BsThreeDots } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { HiOutlineLogout } from 'react-icons/hi';
import './Message.scss';
import ActiveFriends from '../../components/ActiveFriends/ActiveFriends.jsx';
import Friends from '../../components/Friends/Friends.jsx';
import RightSide from '../../components/RightSide/RightSide.jsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, getSingleMessage, messageStatusChange, sendMessage } from '../../features/user/userApiSlice.jsx';
import { clearNewUserAdded, getAllUsers, sendSocketMessage, setLogoutEmpty, setNewUserAdded, socketMessageStatusChange } from '../../features/user/userSlice.jsx';
import { getAllAuthData, setMessageEmpty } from '../../features/auth/authSlice.jsx';
import useFormFields from '../../hooks/useFormFields.jsx';
import { io } from 'socket.io-client';
import { createToast } from '../../utils/createToast.js';
import useSound from 'use-sound';
import notificationSound from '../../assets/audio/notification.mp3';
import sendingSound from '../../assets/audio/sending.mp3';
import { logout } from '../../features/auth/authApiSlice.jsx';
import { useNavigate } from 'react-router-dom';
const socket = io(import.meta.env.VITE_API_URI);
import Cookies from 'js-cookie';

const Message = () => {
  const dispatch = useDispatch();
  const { users, messageData, socketMessageStatus, socketGetLastMsgToDb, lastMessage, newUserAdded } = useSelector(getAllUsers);
  const { user, successMessage, error } = useSelector(getAllAuthData);
  const [currentFrd, setCurrentFrd] = useState('');
  const withoutMe = users?.filter((item) => item?._id !== user?._id);
  const { input, setInput, handleInputChange } = useFormFields({ newMessage: '', image: '' });
  const scrollRef = useRef();
  const [activeUser, setActiveUser] = useState([]);
  const [socketMessage, setSocketMessage] = useState('');
  const [typingMessage, setTypingMessage] = useState(false);
  const [notificationPlay] = useSound(notificationSound);
  const [sendingPlay] = useSound(sendingSound);
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  // <!-- Message Sent Handler -->
  const handleSendMessage = (e) => {
    e.preventDefault();

    // <!-- From Data Initialize -->
    const formData = new FormData();
    formData.append('senderName', user?.userName);
    formData.append('reseverId', currentFrd?._id);
    if (input?.image) {
      formData.append('chatImg', input?.image);
    } else {
      formData.append('text', input?.newMessage ? input?.newMessage : '💘');
    }
    sendingPlay();

    dispatch(sendMessage(formData));
  };

  // <!-- Theme Change Handler -->
  const handleThemeChange = (e) => {
    console.log(e.target.value);
    setTheme(e.target.value);
    localStorage.setItem('theme', e.target.value);
  };

  // <!-- Logout Button Handler -->
  const handleLogoutBtn = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    socket.emit('logout', user?._id);
    dispatch(setLogoutEmpty());
    Cookies.remove('accessToken');

    navigate('/login');
  };

  // <!-- Search Handler -->
  const handleSearchInput = (e) => {
    const getFriendClass = document.getElementsByClassName('hover-friend');
    const friendNameClass = document.getElementsByClassName('Fd_name');
    for (let i = 0; i < getFriendClass.length, i < friendNameClass.length; i++) {
      let text = friendNameClass[i].innerText.toLowerCase();
      if (text.indexOf(e.target.value.toLowerCase()) > -1) {
        getFriendClass[i].style.display = 'block';
      } else {
        getFriendClass[i].style.display = 'none';
      }
    }
  };

  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
    if (successMessage) {
      createToast(successMessage, 'success');
      dispatch(setMessageEmpty());
    }
    dispatch(getAllUser());
  }, [dispatch, error, successMessage, navigate]);

  // useEffect(() => {
  //   if (withoutMe && withoutMe.length > 0) {
  //     setCurrentFrd(withoutMe[0]);
  //   }
  // }, [withoutMe]);

  useEffect(() => {
    dispatch(getSingleMessage(currentFrd?._id));
  }, [currentFrd._id, dispatch]);

  useEffect(() => {
    setInput({ ...input, newMessage: '' });
  }, [currentFrd._id]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageData]);

  useEffect(() => {
    socket.emit('addUser', user);

    socket.on('getUser', (data) => {
      const withoutMe = data?.filter((item) => item?.userId !== user?._id);
      setActiveUser(withoutMe);
    });

    socket.on('getMessage', (data) => {
      setSocketMessage(data);
    });
    if (input.newMessage) {
      socket.emit('typingMessage', { senderId: user._id, reseverId: currentFrd._id, msg: true });
    } else {
      socket.emit('typingMessage', { senderId: user._id, reseverId: currentFrd._id, msg: false });
    }

    socket.on('typingMsgGet', (data) => {
      data.msg && currentFrd._id == data.senderId ? setTypingMessage(true) : setTypingMessage(false);
    });
  }, [user, input.newMessage, currentFrd._id]);

  useEffect(() => {
    if (socketMessage && currentFrd) {
      if (socketMessage.senderName == currentFrd.userName && socketMessage.reseverId == user._id) {
        dispatch(sendSocketMessage(socketMessage));
      }
    }

    if (socketMessage && socketMessage.reseverId == user._id) {
      if (!currentFrd || socketMessage.senderId != currentFrd?._id) {
        notificationPlay();
        createToast(`${socketMessage.senderName} sent a message.`, 'success');
      }
    }

    setSocketMessage('');
  }, [currentFrd, user._id, socketMessage, dispatch, notificationPlay]);

  // <!-- When message sent success server than reaction->
  useEffect(() => {
    if (socketMessageStatus) {
      if (input.image) {
        socket.emit('sendMessage', {
          senderId: user?._id,
          senderName: user?.userName,
          reseverId: currentFrd?._id,
          time: new Date(),
          image: socketGetLastMsgToDb?.image,
          lastMsgDataInfo: socketGetLastMsgToDb
        });
      } else {
        socket.emit('sendMessage', {
          senderId: user?._id,
          senderName: user?.userName,
          reseverId: currentFrd?._id,
          time: new Date(),
          image: '',
          text: input?.newMessage ? input?.newMessage : '💘',
          lastMsgDataInfo: socketGetLastMsgToDb
        });
      }
      socket.emit('seenStatusChange', socketGetLastMsgToDb);
      dispatch(socketMessageStatusChange(false));
    }
    setInput((prevState) => ({ ...prevState, newMessage: '', image: '' }));
  }, [socketMessageStatus]);

  useEffect(() => {
    if (currentFrd._id) {
      socket.on('seenStatusSee', (data) => {
        if (data?.status == 'unseen' || data?.status == 'delivered') {
          dispatch(messageStatusChange({ id: data._id, data: { status: 'seen' } }));
        }
      });

      const findUser = lastMessage.find((item) => item?.senderId == currentFrd?._id && item?.reseverId == user._id);

      if (findUser?.status == 'unseen' || findUser?.status == 'delivered') {
        dispatch(messageStatusChange({ id: findUser._id, data: { status: 'seen' } }));
      }
    }
  }, [currentFrd._id, dispatch, lastMessage, user._id]);

  useEffect(() => {
    socket.on('seenStatusSee', (data) => {
      if (data?.status == 'delivered') {
        dispatch(messageStatusChange({ id: data._id, data: { status: 'delivered' } }));
      }
      if (currentFrd?._id && data?.status == 'delivered') {
        dispatch(messageStatusChange({ id: data._id, data: { status: 'seen' } }));
      }
    });
  }, [dispatch, currentFrd]);

  useEffect(() => {
    socket.on('new_user_add', (data) => {
      dispatch(setNewUserAdded(data));
      dispatch(getAllUser());
      dispatch(clearNewUserAdded());
    });
  }, [newUserAdded, dispatch]);

  return (
    <>
      <div className={`messenger ${theme ? (theme == 'dark' ? 'theme' : '') : ''}`}>
        <div className='row'>
          <div className='col-3'>
            <div className='left-side'>
              <div className='top'>
                <div className='image-name'>
                  <div className='image'>
                    <img
                      src={user?.image || avatar}
                      alt=''
                    />
                  </div>
                  <div className='name'>
                    <h3>{user?.userName}</h3>
                  </div>
                </div>
                <div className='icons'>
                  <div
                    onClick={() => setHide(!hide)}
                    className='icon'>
                    <BsThreeDots />
                  </div>

                  <div className='icon'>
                    <FaEdit />
                  </div>
                  {/* <!-- Theme & Logout Menu --> */}
                  <div className={`theme_logout ${hide ? 'show' : ''}`}>
                    <h3>Dark Mode</h3>
                    <div className='on'>
                      <label htmlFor='dark'>ON</label>
                      <input
                        onChange={handleThemeChange}
                        id='dark'
                        value='dark'
                        type='radio'
                        name='theme'
                      />
                    </div>
                    <div
                      className='of'
                      htmlFor='white'>
                      <label htmlFor='white'>OFF</label>
                      <input
                        onChange={handleThemeChange}
                        id='white'
                        value='white'
                        type='radio'
                        name='theme'
                      />
                    </div>
                    <div
                      className='logout'
                      onClick={handleLogoutBtn}>
                      <HiOutlineLogout />
                      Logout
                    </div>
                  </div>
                </div>
              </div>
              <div className='friend-search'>
                <div className='search'>
                  <button>
                    <BiSearch />
                  </button>
                  <input
                    onChange={handleSearchInput}
                    type='text'
                    placeholder='Search...'
                    className='form-control'
                  />
                </div>
              </div>

              <div className='active-friends'>
                <ActiveFriends
                  activeUser={activeUser}
                  setCurrentFrd={setCurrentFrd}
                />
              </div>

              <div className='friends'>
                {withoutMe?.map((item) => (
                  <div
                    onClick={() => setCurrentFrd(item)}
                    className={`hover-friend ${currentFrd?._id === item?._id && 'active'}`}
                    key={item?._id}>
                    <Friends
                      data={item}
                      currentFrd={currentFrd}
                      activeUser={activeUser}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='col-9'>
            {currentFrd ? (
              <RightSide
                handleInputChange={handleInputChange}
                input={input}
                setInput={setInput}
                currentFrd={currentFrd}
                handleSendMessage={handleSendMessage}
                messageData={messageData}
                scrollRef={scrollRef}
                activeUser={activeUser}
                typingMessage={typingMessage}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
