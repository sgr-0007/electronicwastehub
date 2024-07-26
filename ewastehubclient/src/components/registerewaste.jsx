import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import '../App.css';
import { DeviceTypeService } from '../service/devicetypeservice';
import { DeviceClassService } from '../service/deviceclassificationservice';
import Navbar from './navbar';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { CexService } from '../service/cexservice';
import { useRef } from 'react';


const RegisterEWaste = () => {
    const fileUploadRef = useRef(null);
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const userId = userData.id;
    const [deviceTypes, setDeviceTypes] = useState([]);
    const [deviceclasses, setDeviceClasses] = useState([]);
    const [expectedValue, setExpectedValue] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const [cex, setCex] = useState([]);

    const defaultValues = {
        model: '',
        brand: '',
        deviceType: {
            deviceTypeId: null,
            deviceType: ''
        },
        deviceClass: {
            deviceClassId: null,
            deviceClass: ''
        },
        expectedValue: 0.0,
        isDraft: false,
        isActive: false,
    }


    useEffect(() => {
        DeviceTypeService.getDeviceTypes().then(data => setDeviceTypes(data));
        DeviceClassService.getDeviceClass().then(data => setDeviceClasses(data));
        CexService.getCexLinkUrl().then(data => setCex(data));

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues});

    const onSubmit = async (data) => {
        data.userId = userId;
        data.expectedValue = expectedValue;
        data.deviceClassificationId = data.deviceClass.deviceClassId;
        data.deviceTypeId = data.deviceType.deviceTypeId;
        data.deviceClassification = data.deviceClass.deviceClass;
        data.deviceType = data.deviceType.deviceType;
        data.dataTransferFee = 0;
        data.statusId=1;
        data.cex = cex.find(c => c.device.toLowerCase().replace(/\s/g, '') === (data.brand + ' ' + data.model).toLowerCase().replace(/\s/g, ''))?.cexlink;
        console.log(data);
        // Make POST request to backend
        try {
            const response = await axios.post(`${API_BASE_URL}/staff/device/detail`, data);
            if (response.data.deviceDetailId>0) {
                console.log(response);
                console.log(imageUrl);
                const res = await axios.post(`${API_BASE_URL}/images/upload/${response.data.deviceDetailId}`, { imageData: imageUrl});
                setFormData(data);
                setShowMessage(true);
                reset();
                setExpectedValue(0);
                setImageUrl(null);
                fileUploadRef.current.clear();
            } 


                       

        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (e.g., show error message to user)
        }


    };

    const handleFileUpload = async (event) => {
        const file = event.files[0];
      
        if (!file) {
          return;
        }
        const base64 = await convertToBase64(file);
        console.log(base64);
        setImageUrl(base64);
    
        
      };
      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;


    return (
        <><Navbar /><div className="form">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Submitted Successfully!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your e device has been registered.
                    </p>

                </div>
            </Dialog>
            <div className="registerewaste-container">

                <div className="flex">
                    <Card className='registerewaste-card' style={{borderRadius : '20px 20px 20px 20px'}}>
                        <h3 className="text-center">Register your Electronics</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">

                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="deviceType" control={control}
                                        rules={{ required: 'Device Type is required.' }}
                                        render={({ field, fieldState }) => (
                                            <Dropdown id={field.deviceTypeId} className={[classNames({ 'p-invalid': fieldState.invalid }), 'mt-4']} value={field.value} onChange={(e) => field.onChange(e.value)} options={deviceTypes} optionLabel="deviceType" />
                                        )} />
                                    <label id='deviceType' htmlFor="deviceType" className={classNames({ 'p-error': !!errors.deviceType })}>Device Type*</label>
                                </span>
                                {getFormErrorMessage('deviceType')}

                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="brand" control={control} rules={{ required: 'Brand is required.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="brand" className={classNames({ 'p-error': errors.brand })}>Brand*</label>
                                </span>
                                {getFormErrorMessage('brand')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="model" control={control} rules={{ required: 'Model is required.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.model} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="model" className={classNames({ 'p-error': errors.model })}>Model*</label>
                                </span>
                                {getFormErrorMessage('model')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="deviceClass" control={control}
                                        rules={{ required: 'Device Class is required.' }}
                                        render={({ field, fieldState }) => (
                                            <Dropdown id={field.deviceClassId} className={[classNames({ 'p-invalid': fieldState.invalid }), 'mt-4']} value={field.value} onChange={(e) => field.onChange(e.value)} options={deviceclasses} optionLabel="deviceClass" />
                                        )} />
                                    <label id='deviceClass' htmlFor="deviceClass" className={classNames({ 'p-error': !!errors.deviceClass })}>Device Class*</label>
                                </span>
                                {getFormErrorMessage('deviceClass')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="expectedValue" control={control} rules={{ required: 'Estimate is required.' }} render={({ field, fieldState }) => (
                                        <InputNumber value={expectedValue} onValueChange={(e) => setExpectedValue(e.value)} mode="currency" currency='GBP' minFractionDigits={2} />
                                    )} />
                                    <label htmlFor="expectedValue" className={classNames({ 'p-error': errors.expectedValue })}>Expected Value*</label>
                                </span>
                                {getFormErrorMessage('expectedValue')}
                            </div>

                            <div className="field">
                            <FileUpload ref={fileUploadRef} name="fileupload" auto accept="image/*" onSelect={handleFileUpload} />
                            </div>
                            <Button type="submit" label="Submit" className="mt-2" />
                        </form>
  
                    </Card>
                </div>
            </div>
        </div></>
    );
}

export default RegisterEWaste;
