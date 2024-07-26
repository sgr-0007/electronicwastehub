import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import '../App.css';
import { RoleService } from '../service/roleservice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import loginImage from '../assets/images/waste1.png';



const RegisterUser = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const defaultValues = {
    name: '',
    userEmail: '',
    password: '',
    role: {
      roleId: null,
      role: ''
    },
    isActive: false
  }

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');

  };

  useEffect(() => {
    RoleService.getRoles().then(data => setRoles(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    try {

      if (data.role.role === 'owner') {
        data.isActive = true;
      }

      setFormData(data);
      console.log(data);
      const response = await axios.post(`${API_BASE_URL}/account/register`, {
        name: data.name,
        userEmail: data.userEmail,
        password: data.password,
        role: data.role.role,
        isActive: data.isActive,
        roleId: data.role.roleid,

      });
      setShowMessage(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="page-container">
    <div className="form">
      <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="flex justify-content-center flex-column pt-6 px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>Registration Successful!</h5>
          {formData.role?.role === 'admin' || formData.role?.role === 'staff' || formData.role?.role === 'localtrader' ? (
            <p style={{ lineHeight: 1.5 }}>
              Your account is registered under name <b>{formData.name}</b>; it will be activated shortly within 5 minutes.
            </p>
          ) : (
            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
              Your account is registered under name <b>{formData.name}</b>.
            </p>
          )}
        </div>
      </Dialog>
        <div className="flex justify-content-center">
          <Card className='login-card' style={{borderRadius:'20px 20px 20px 20px'}}>
          <div className='grid'>
          <div className='col-6'>
          <div className="login-image-container">
          <img src={loginImage} alt="login" 
          style={{
            objectPosition: 'center',
            height: '350px',
            width: '350px',
            aspectRatio: "350/350",
            objectFit: "cover",
          }} />
        </div> 
        </div>
        <div className='col-5'>
        <h2 style={{
          justifyContent: 'center',
          display: 'flex',
          
        }}>E Waste Hub Connect</h2> 
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
              <div className="field">
                <span className="p-float-label">
                  <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                  )} />
                  <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
                </span>
                {getFormErrorMessage('name')}
              </div>
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <Controller name="userEmail" control={control}
                    rules={{ required: 'userEmail is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid userEmail address. E.g. example@userEmail.com' } }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                  <label id='userEmail' htmlFor="userEmail" className={classNames({ 'p-error': !!errors.userEmail })}>userEmail*</label>
                </span>
                {getFormErrorMessage('userEmail')}
              </div>
              <div className="field">
                <span className="p-float-label">
                  <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                  )} />
                  <label id='password' htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                </span>
                {getFormErrorMessage('password')}
              </div>
              <div className="field">
                <span className="p-float-label">
                  <Controller name="role" control={control}
                    rules={{ required: 'Role is required.' }}
                    render={({ field, fieldState }) => (
                      <Dropdown id={field.roleId} className={[classNames({ 'p-invalid': fieldState.invalid }), 'mt-4']} value={field.value} onChange={(e) => field.onChange(e.value)} options={roles} optionLabel="role" />
                    )} />
                  <label id='role' htmlFor="role" className={classNames({ 'p-error': !!errors.role })}>Role*</label>
                </span>
                {getFormErrorMessage('role')}
              </div>

              <Button type="submit" label="Register" className="mt-2" />

            </form>
            <div className="signup-center">
              <Button
                className="mt-2"
                label="Login"
                text
                onClick={handleLogin}
              />
            </div>
          </div>
        </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
