import avatar from '../../assets/images/avatar.jpg';
import './ActiveFriends.scss';

const ActiveFriends = ({ activeUser, setCurrentFrd }) => {
  return (
    <>
      <div className='active-friend'>
        <div className='image-active-icon'>
          {activeUser?.map((item, index) => (
            <div
              onClick={() => setCurrentFrd(item.userInfo)}
              className='image'
              key={index}>
              <img
                src={item?.userInfo?.image}
                alt=''
              />
              <div className='active-icon'></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ActiveFriends;
