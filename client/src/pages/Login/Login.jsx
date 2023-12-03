import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAuthData, setMessageEmpty } from '../../features/auth/authSlice.jsx';
import useFormFields from '../../hooks/useFormFields.jsx';
import { useEffect } from 'react';
import { createToast } from '../../utils/createToast.js';
import { login } from '../../features/auth/authApiSlice.jsx';
import Cookies from 'js-cookie';

const Login = () => {
  const { isLoading, successMessage, error } = useSelector(getAllAuthData);
  const { input, setInput, handleInputChange } = useFormFields({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get('accessToken');

  // <!-- Login Form Submit handler -->
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input.email || !input.password) return createToast('Email & Password is required!');

    dispatch(login({ email: input?.email, password: input?.password }));
  };

  useEffect(() => {
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
      Cookies.set('accessToken', token);
      navigate('/');
    }
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
  }, [successMessage, error, dispatch, setInput, navigate, token]);

  return (
    <>
      <div className='login'>
        <div className='card'>
          <div className='card-header'>
            <h3>Login</h3>
          </div>

          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  value={input.email}
                  onChange={handleInputChange}
                  name='email'
                  type='text'
                  placeholder='email'
                  id='email'
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  placeholder='password'
                  value={input.password}
                  onChange={handleInputChange}
                  name='password'
                  id='password'
                  className='form-control'
                />
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
                      value={'Login'}
                      className='submit_btn'
                    />
                  )}
                </div>
              </div>
              <div className='form-group'>
                <span>
                  <Link to={'/register'}>Register you account !</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
