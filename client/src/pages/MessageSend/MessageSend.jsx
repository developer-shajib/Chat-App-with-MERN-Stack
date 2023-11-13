import './MessageSend.scss';
import { ImAttachment } from 'react-icons/im';
import { TfiGallery } from 'react-icons/tfi';
import { BiMessageAltEdit } from 'react-icons/bi';
import { AiFillGift, AiOutlineSend } from 'react-icons/ai';

const MessageSend = ({ handleInputChange, input, handleSendMessage, setInput }) => {
  const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '😝', '😜', '🧐', '🤓', '😎', '😕', '🤑', '🥴', '😱'];

  return (
    <>
      <div className='message-send-section'>
        <input
          type='checkbox'
          id='emoji'
        />
        <div className='file hover-attachment'>
          <div className='add-attachment'>Add Attachment</div>

          <ImAttachment />
        </div>
        <div className='file hover-image'>
          <input
            onChange={(e) => setInput({ ...input, newMessage: '1 file added', image: e.target.files[0] })}
            type='file'
            id='pic'
            className='form-control'
          />
          <label htmlFor='pic'>
            <div className='add-image'>Add Image</div>

            <TfiGallery />
          </label>
        </div>
        <div className='file '>
          <BiMessageAltEdit />
        </div>
        <div className='file hover-gift'>
          <div className='add-gift'>Add Gift</div>

          <AiFillGift />
        </div>

        <div className='message-type'>
          <input
            value={input?.newMessage}
            onChange={handleInputChange}
            type='text'
            name='newMessage'
            id='message'
            placeholder='Aa...'
            className='form-control'
          />

          <label htmlFor='emoji'>🙂</label>
        </div>
        <div
          onClick={handleSendMessage}
          className='file'>
          {input?.newMessage || input?.image ? <AiOutlineSend style={{ color: '#a0aef7' }} /> : '💘'}
        </div>

        <div className='emoji-section'>
          <div className='emoji'>
            {emojis?.map((item, index) => (
              <span
                onClick={() => setInput({ ...input, newMessage: input.newMessage + item })}
                key={index}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageSend;
