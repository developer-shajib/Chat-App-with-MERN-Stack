/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import avatar from '../../assets/images/avatar.jpg';
import './Friends.scss';
import { getAllUsers } from '../../features/user/userSlice.jsx';
import { getAllAuthData } from '../../features/auth/authSlice.jsx';
import moment from 'moment';
import { RiCheckboxCircleFill, RiCheckboxCircleLine } from 'react-icons/ri';

const Friends = ({ data, currentFrd, activeUser }) => {
  const { lastMessage } = useSelector(getAllUsers);
  const { user } = useSelector(getAllAuthData);

  return (
    <>
      <div className='friend'>
        <div className='friend-left-side'>
          <div className='friend-image'>
            <div className='image'>
              <img
                className='frd-img-list'
                src={data?.image || avatar}
                alt=''
              />
              {activeUser?.map((item, index) => {
                if (item?.userInfo?._id === data?._id) {
                  return (
                    <div
                      key={index}
                      className='active-icon'></div>
                  );
                }
              })}
            </div>
          </div>
          <div className='friend-name'>
            <h4 className='Fd_name'>{data?.userName}</h4>
            <div className='msg-info'>
              {lastMessage?.map((item, index) => {
                // <!-- If last message is mine -->
                if ((item?.senderId == user._id && item?.reseverId == data._id) || (item?.senderId == data._id && item?.reseverId == user._id)) {
                  if (item?.senderId == user._id) {
                    if (item.text) {
                      if (item.text.length > 15) {
                        return (
                          <span
                            key={index}
                            className='youMsg'>
                            {`You: ${item?.text.slice(0, 15)}...`}
                            <span className='timeAgo'>{moment(data?.createdAt).startOf('mini').fromNow()}</span>
                          </span>
                        );
                      } else {
                        return (
                          <span
                            key={index}
                            className='youMsg'>
                            {`You: ${item?.text.slice(0, 20)}`}
                            <span className='timeAgo'>{moment(item?.createdAt).startOf('mini').fromNow()}</span>
                          </span>
                        );
                      }
                    }
                    if (item.image) {
                      return (
                        <span
                          key={index}
                          className='youMsg'>
                          <span className='youMsg'>
                            {`You: send a attachment`}
                            <span className='timeAgo'>{moment(item?.createdAt).startOf('mini').fromNow()}</span>
                          </span>
                        </span>
                      );
                    }
                  }
                  if (item?.senderId == data._id) {
                    if (item.text) {
                      if (item.text.length > 15) {
                        return (
                          <span
                            key={index}
                            className='frdMsg'>
                            {`${item?.text.slice(0, 15)}...`}
                            <span className='timeAgo'>{moment(item?.createdAt).startOf('mini').fromNow()}</span>
                          </span>
                        );
                      } else {
                        return (
                          <span
                            key={index}
                            className='frdMsg'>
                            {item?.text}
                            <span className='timeAgo'>{moment(item?.createdAt).startOf('mini').fromNow()}</span>
                          </span>
                        );
                      }
                    }
                    if (item.image) {
                      return (
                        <span
                          key={index}
                          className='frdMsg'>
                          send a attachment
                          <span className='timeAgo'>{moment(item?.createdAt).startOf('mini').fromNow()}</span>
                        </span>
                      );
                    }
                  }
                }
              })}
            </div>
          </div>
        </div>
        <div className='seen-unseen-icon '>
          {lastMessage?.map((item, index) => {
            if (item?.senderId == user._id && item?.reseverId == data?._id) {
              return item.status == 'seen' ? (
                <img
                  key={index}
                  className='seen-unseen-img'
                  src={avatar}
                  alt=''
                />
              ) : item.status == 'unseen' ? (
                <div
                  key={index}
                  className='circle-fill'>
                  <RiCheckboxCircleLine />
                </div>
              ) : (
                <div
                  key={index}
                  className='circle-fill'>
                  <RiCheckboxCircleFill />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Friends;
