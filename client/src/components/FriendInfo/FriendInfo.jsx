import './FriendInfo.scss';
import avatar from '../../assets/images/avatar.jpg';
import gal_img from '../../assets/images/gal_img.jpg';
import { BsChevronDown } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../features/user/userSlice.jsx';

const FriendInfo = ({ currentFrd, activeUser }) => {
  const { messageData } = useSelector(getAllUsers);
  return (
    <>
      <div className='friend-info'>
        <input
          type='checkbox'
          id='gallery'
        />
        <div className='image-name'>
          <div className='image'>
            <img
              src={currentFrd?.image || avatar}
              alt=''
            />
          </div>

          {activeUser?.map((item, index) => {
            if (item?.userInfo?._id === currentFrd?._id) {
              return (
                <div
                  key={index}
                  className='active-user'>
                  Active
                </div>
              );
            }
          })}

          <div className='name'>
            <h4>{currentFrd.userName}</h4>
          </div>
        </div>
        <div className='others'>
          <div className='custom-chat'>
            <h3>Customize Chat</h3>
            <BsChevronDown />
          </div>
          <div className='privacy'>
            <h3>Privacy and Support</h3>
            <BsChevronDown />
          </div>
          <div className='media'>
            <h3>Shared Media</h3>
            <label htmlFor='gallery'>
              <BsChevronDown />
            </label>
          </div>
        </div>
        <div className='gallery'>
          {messageData &&
            messageData.length > 0 &&
            messageData?.map((item, index) => {
              if (item?.image) {
                return (
                  <img
                    key={index}
                    src={item?.image}
                    alt=''
                  />
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default FriendInfo;
