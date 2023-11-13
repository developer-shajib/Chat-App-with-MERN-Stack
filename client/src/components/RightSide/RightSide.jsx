import { BsCameraVideoFill } from 'react-icons/bs';
import { IoCall } from 'react-icons/io5';
import { HiDotsCircleHorizontal } from 'react-icons/hi';
import avatar from '../../assets/images/avatar.jpg';
import './RightSide.scss';
import { Chat } from '../../pages';
import MessageSend from '../../pages/MessageSend/MessageSend.jsx';
import FriendInfo from '../FriendInfo/FriendInfo.jsx';

const RightSide = ({ currentFrd, handleInputChange, input, handleSendMessage, messageData, scrollRef, setInput, activeUser, typingMessage }) => {
  return (
    <>
      <div className='right-side'>
        <input
          type='checkbox'
          id='dot'
        />
        <div className='row'>
          <div className='col-8'>
            <div className='message-send-show'>
              <div className='header'>
                <div className='image-name'>
                  <div className='image'>
                    <img
                      src={currentFrd?.image || avatar}
                      alt=''
                    />
                    {activeUser?.map((item, index) => {
                      if (item?.userInfo?._id === currentFrd?._id) {
                        return (
                          <div
                            key={index}
                            className='active-icon'></div>
                        );
                      }
                    })}
                  </div>
                  <div className='name'>
                    <h3>{currentFrd?.userName}</h3>
                  </div>
                </div>
                <div className='icons'>
                  <div className='icon'>
                    <IoCall className='single_icon' />
                  </div>
                  <div className='icon'>
                    <BsCameraVideoFill className='single_icon' />
                  </div>
                  <div className='icon'>
                    <label htmlFor='dot'>
                      <HiDotsCircleHorizontal />
                    </label>
                  </div>
                </div>
              </div>
              <Chat
                messageData={messageData}
                currentFrd={currentFrd}
                scrollRef={scrollRef}
                typingMessage={typingMessage}
              />
              <MessageSend
                setInput={setInput}
                handleInputChange={handleInputChange}
                input={input}
                handleSendMessage={handleSendMessage}
              />
            </div>
          </div>

          <div className='col-4'>
            <FriendInfo
              currentFrd={currentFrd}
              activeUser={activeUser}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
