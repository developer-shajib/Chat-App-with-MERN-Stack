/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import avatar from '../../assets/images/avatar.jpg';
import './Chat.scss';
import { getAllAuthData } from '../../features/auth/authSlice.jsx';
import moment from 'moment';

const Chat = ({ messageData, currentFrd, scrollRef, typingMessage }) => {
  const { user } = useSelector(getAllAuthData);

  return (
    <>
      <div className='message-show'>
        {messageData && messageData.length > 0 ? (
          messageData?.map((item, index) => {
            return item?.senderId === user?._id ? (
              <div
                key={index}
                className='my-message'
                ref={scrollRef}>
                <div className='image-message'>
                  <div className='my-text'>
                    {item.text && <p className='message-text'>{item?.text}</p>}
                    {item.image && (
                      <p className='message-text'>
                        <img
                          src={item?.image}
                          alt={item?.userName}
                        />
                      </p>
                    )}
                  </div>
                </div>
                <div className='time'>{moment(item?.createdAt).startOf('min').fromNow()}</div>
              </div>
            ) : (
              <div
                key={index}
                className='fd-message'
                ref={scrollRef}>
                <div className='image-message-time'>
                  <img
                    className='frd-img'
                    src={currentFrd?.image || avatar}
                    alt=''
                  />
                  <div className='message-time'>
                    <div className='fd-text '>
                      {item.text && <p className='message-text'>{item?.text}</p>}
                      {item?.image && (
                        <p className='message-text'>
                          <img
                            src={item?.image}
                            alt={item?.userName}
                          />
                        </p>
                      )}
                    </div>
                    <div className='time'>{moment(item?.createdAt).startOf('min').fromNow()}</div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className='friend_connect'>
              <img
                src={currentFrd?.image}
                alt=''
              />
              <h3>{currentFrd?.userName} connect with you</h3>
              <span>{moment(currentFrd?.createdAt).startOf('min').fromNow()}</span>
            </div>
          </>
        )}

        {typingMessage && (
          <div className='typing-message'>
            <p>Typing Message...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
