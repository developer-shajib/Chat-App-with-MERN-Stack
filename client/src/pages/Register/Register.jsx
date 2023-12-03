import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import useFormFields from '../../hooks/useFormFields.jsx';
import avatar from '../../assets/images/avatar.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authApiSlice.jsx';
import { useEffect } from 'react';
import { getAllAuthData, setMessageEmpty } from '../../features/auth/authSlice.jsx';
import { createToast } from '../../utils/createToast.js';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Cookies from 'js-cookie';

const Register = () => {
  const dispatch = useDispatch();
  const {token, error, successMessage, isLoading } = useSelector(getAllAuthData);
  const { input, setInput, handleInputChange } = useFormFields({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: ''
  });
  const navigate = useNavigate();

  // <!-- File Handle -->
  const fileHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.files[0] });
  };

  // <!-- Register Form Submit -->
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input.userName || !input.email || !input.password || !input.confirmPassword) {
      return createToast('All fields are required!');
    }

    if (input?.password !== input?.confirmPassword) return createToast('Password not match!');

    // <!-- Form Data initialize -->
    const formData = new FormData();
    formData.append('userName', input?.userName);
    formData.append('email', input?.email);
    formData.append('password', input?.password);
    formData.append('confirmPassword', input?.confirmPassword);
    if (input?.image) {
      formData.append('image', input.image);
    }

    dispatch(register(formData));
  };

  useEffect(() => {
    if (token) {
      Cookies.set('accessToken', token);
    }

    if (successMessage) {
      createToast(successMessage, 'success');
      dispatch(setMessageEmpty());
      setInput({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: ''
      });
     

      navigate('/');
    }
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
  }, [successMessage, error, dispatch, setInput, navigate, token]);

  return (
    <>
      <div className='register'>
        <div className='card'>
          <div className='card-header'>
            <h3>Register</h3>
          </div>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <div className='form-group'>
                <label htmlFor='username'>User Name</label>
                <input
                  name='userName'
                  value={input.userName}
                  onChange={handleInputChange}
                  type='text'
                  className='form-control'
                  placeholder='user name'
                  id='username'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  name='email'
                  value={input.email}
                  onChange={handleInputChange}
                  type='text'
                  className='form-control'
                  placeholder='email'
                  id='email'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  name='password'
                  value={input.password}
                  onChange={handleInputChange}
                  autoComplete='on'
                  type='password'
                  className='form-control'
                  placeholder='password'
                  id='password'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  name='confirmPassword'
                  value={input.confirmPassword}
                  onChange={handleInputChange}
                  type='password'
                  autoComplete='on'
                  className='form-control'
                  placeholder='confirm password'
                  id='confirmPassword'
                />
              </div>
              <div className='form-group'>
                <div className='file-image'>
                  <div className='image'>
                    {input?.image ? (
                      <img
                        src={URL.createObjectURL(input?.image)}
                        alt=''
                      />
                    ) : (
                      <img
                        src={avatar}
                        alt=''
                      />
                    )}
                  </div>
                  <div className='file'>
                    <label htmlFor='image'>Select Image</label>
                    <input
                      onChange={fileHandle}
                      name='image'
                      type='file'
                      className='form-control'
                      id='image'
                    />
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <div className='btn'>
                  {isLoading ? (
                    <ScaleLoader
                      color={'#e1ebe9'}
                      loading={true}
                      cssOverride={{
                        display: 'block',
                        margin: '0 auto',
                        borderColor: '#e1ebe9',
                        padding: '12px 0px'
                      }}
                      height={15}
                      width={3}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />
                  ) : (
                    <input
                      type='submit'
                      value={'Register'}
                      className='submit_btn'
                    />
                  )}
                </div>
              </div>
              <div className='form-group'>
                <span>
                  <Link to={'/login'}>Login you account !</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
