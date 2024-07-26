import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { InputSwitch } from 'primereact/inputswitch';
import Navbar from './navbar';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { DeviceStatusService } from '../service/devicestatusservice';
import { DeviceTypeService } from '../service/devicetypeservice';
import { DeviceClassService } from '../service/deviceclassificationservice';
import { Dropdown } from 'primereact/dropdown';
import 'jspdf-autotable';
import { Image } from 'primereact/image';



const ProductGrid = () => {
    let emptyProduct = {
        id: null,
        owner: '',
        brand: '',
        model: '',
        image: null,
        price: 0,
        type: null,
        class: null,
        statusId: 2,
        isActive: false,
        rating: 0,
    };


    const [products, setProducts] = useState(null);
    const [statData, setStatData] = useState(null);
    const [users, setUsers] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedDeviceType, setSelectedDeviceType] = useState('');
    const [deviceTypes, setDeviceTypes] = useState([]);
    const chartRef = useRef(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        DeviceTypeService.getDeviceTypes().then(data => setDeviceTypes(data));
        const fetchDevices = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/devices/all/devicesdetail`);
                setProducts(response.data.data);
                console.log(response.data.data);
                const stats = [0, 0, 0, 0, 0, 0];

                for (let i = 0; i < response.data.data.length; i++) {
                    stats[response.data.data[i].statusId - 1]++;
                }
                // products.forEach(product => {
                //     stats[product.statusId]++;
                // });
                setStatData(stats);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/staff/findall/user`);
                setUsers(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                // Handle errors appropriately (e.g., display an error message)
            }
        };
        fetchUsers();
        fetchDevices();
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-UK', { style: 'currency', currency: 'GBP' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const saveProduct = async () => {
        setSubmitted(true);
        const editedProduct = {
            deviceDetailsId: product.deviceDetailsId,
            userId: product.userId,
            model: product.model,
            brand: product.brand,
            deviceClassificationId: product.deviceClassificationId,
            deviceTypeId: product.deviceTypeId,
            expectedValue: product.expectedValue,
            statusId: 2,
        };

        let updatedProducts = [...products];
        let productIndex = updatedProducts.findIndex(p => p.deviceDetailsId === product.deviceDetailsId);
        if (productIndex !== -1) {
            updatedProducts[productIndex] = {
                ...product
            };
            setProducts(updatedProducts);
        }
        try {
            const response = await axios({
                method: 'post',
                url: `${API_BASE_URL}/devices/update/devicedetail`,
                data: editedProduct,
            });
            console.log('Server response:', response.data);
            setProductDialog(false);
            setProduct(emptyProduct);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Device has been updated!.', life: 3000 });

        } catch (error) {
            console.error('There was an error:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'There was a problem saving the Device.', life: 3000 });
        }
    };

    const sendEmail = async (rowData) => {
        const sendEmailDTO = {
            deviceDetailsId: rowData.deviceDetailsId,
            userId: rowData.userId
        };
        console.log(sendEmailDTO);

        try {
            const response = await axios({
                method: 'post',
                url: `${API_BASE_URL}/user/device/secureemaillink`,
                data: sendEmailDTO,
            });
            console.log('Server response:', response.data);
            setProductDialog(false);
            setProduct(emptyProduct);
            if (response.status === 200) {
                const response = await axios.put(`${API_BASE_URL}/staff/device/status?deviceDetailsId=${rowData.deviceDetailsId}&statusId=${5}`);
                console.log(response.data);
                const updatedProducts = products.map(product => {
                    if (product.deviceDetailsId === rowData.deviceDetailsId) {
                        return { ...product, statusId: 5 };
                    }
                    return product;
                });
                setProducts(updatedProducts);
            }
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Data has been sent!.', life: 3000 });

        } catch (error) {
            console.error('There was an error:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'There was a problem sending the data.', life: 3000 });
        }
    };


    const wipeData = async (rowData) => {


        try {
            const response = await axios.put(`${API_BASE_URL}/staff/device/status?deviceDetailsId=${rowData.deviceDetailsId}&statusId=${3}`);
            console.log(response.data);
            const updatedProducts = products.map(product => {
                if (product.deviceDetailsId === rowData.deviceDetailsId) {
                    return { ...product, statusId: 3 };
                }
                return product;
            });
            setProducts(updatedProducts);

            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Data has been wiped!.', life: 3000 });

        } catch (error) {
            console.error('There was an error:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'There was a problem sending the data.', life: 3000 });
        }
    };

    const draftProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(false);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Draft has been created!.', life: 3000 });
    }

    const editProduct = (product) => {
        setSelectedDeviceType(DeviceTypeService.getDeviceType(product.deviceTypeId));
        setProduct({ ...product });
        setProductDialog(true);
    };


    const onCategoryChange = (e) => {
        console.log('e.value = ', typeof (e.value))
        let _product = { ...product };

        _product['deviceClassificationId'] = Number(e.value);
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };
    const onDropdownChange = (e, name) => {
        const val = e.value.deviceTypeId || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };




    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.expectedValue);
    };

    const imageBodyTemplate = (rowData) => {
        return <Image src={`${rowData.imageData}` || iphone14} zoomSrc={`${rowData.imageData}` || iphone14} alt="Image" width="80" height="60" preview />

    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={getStatus(rowData.statusId)} severity={getSeverity(getStatus(rowData.statusId))}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {(rowData.statusId === 1 &&
                    <Button icon="pi pi-pencil" title='Edit' rounded className="mr-1" onClick={() => editProduct(rowData)} />
                )}
                {(rowData.statusId > 1 &&
                    <Button icon="pi pi-pencil" title='Edit' disabled={true} rounded className="mr-1" onClick={() => editProduct(rowData)} />
                )}
            </React.Fragment>
        );
    };
    const isActiveSwitchTemplate = (rowData) => {
        const onToggle = (e) => {
            let updatedProducts = [...products];
            let productIndex = updatedProducts.findIndex(product => product.deviceDetailsId === rowData.deviceDetailsId);
            if (productIndex !== -1) {
                updatedProducts[productIndex] = {
                    ...updatedProducts[productIndex],
                    isActive: e.value,

                };
                (e.value === true) ? updatedProducts[productIndex].statusId = 2 : updatedProducts[productIndex].statusId = 1;
                setProducts(updatedProducts);
                //console.log(rowData.deviceDetailsId, e.value);
                updateIsActive(rowData.deviceDetailsId, e.value);
            }
        };
        return (
            <React.Fragment>
                {(rowData.statusId > 2 &&

                    <InputSwitch disabled={true} checked={rowData.isActive} onChange={onToggle} />
                )}
                {(rowData.statusId < 3 &&

                    <InputSwitch checked={rowData.isActive} onChange={onToggle} />
                )}


            </React.Fragment>
        );
    };
    const emailBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.statusId === 4 && (
                    <Button icon="pi pi-envelope" title="Mail Data" className="mr-2" onClick={() => sendEmail(rowData)} />
                )}
                
            </React.Fragment>
        );
    };
    const createdDateTemplate = (rowData) => {
        const date = new Date(rowData.createdDate);
        return date.toDateString();
    };
    const wipedataBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.statusId === 6 && (
                    <Button icon="pi pi-trash" title="Wipe Data" className="mr-2" onClick={() => wipeData(rowData)} />
                )}
                
            </React.Fragment>
        );
    };
    const getStatus = (statusId) => {
        const status = DeviceStatusService.getDeviceStatus(statusId);
        return status.status;
    };
    const getCategory = (deviceTypeId) => {
        const category = DeviceTypeService.getDeviceType(deviceTypeId);
        return category.deviceType;
    };
    const getClass = (deviceClassId) => {
        const deviceClass = DeviceClassService.getDeviceClassById(deviceClassId);
        return deviceClass.deviceClass;
    }
    const getSeverity = (status) => {
        switch (status) {
            case 'Received':
                return 'warning';

            default:
                return null;
        }
    };

    const statusData = DeviceStatusService.getDeviceStatusData();
    const statuslabels = statusData.map(item => item.status);


    const updateIsActive = (productID, isVisible) => {
        axios.put(`${API_BASE_URL}/devices/visibility/${productID}?isvisible=${isVisible}`)
            .then(response => {
                console.log('Server response:', response.data);
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between">
            <h3 className="m-0">Manage Electronics</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Draft" icon="pi pi-bookmark" onClick={draftProduct} />
            <Button label="Update" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );

    return (
        <><Navbar /><div>
            <Toast ref={toast} />
            <div className="card">

                <DataTable
                    ref={dt}
                    value={products}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="owner" header="Owner" body={(rowData) => rowData.name} sortable></Column>
                    <Column field="model" header="Model" body={(rowData) => rowData.model} sortable></Column>
                    <Column field="brand" header="Brand" sortable></Column>
                    <Column field="image_url" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
                    <Column field="type" header="Type" body={(rowData) => getCategory(rowData.deviceTypeId)} sortable></Column>
                    <Column field="class" header="Classification" body={(rowData) => getClass(rowData.deviceClassificationId)} sortable></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate}></Column>
                    <Column field="createdDate" header="Created Date" body={createdDateTemplate}></Column>
                    <Column field="isActive" header="Active" body={isActiveSwitchTemplate}></Column>
                    <Column body={actionBodyTemplate} header="Edit" exportable={false}></Column>
                    <Column body={emailBodyTemplate} header="Dispatch" exportable={false}></Column>
                    <Column body={wipedataBodyTemplate} header="Wipe Data" exportable={false}></Column>


                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Device Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`https://picsum.photos/id/${product.image}/200/300`} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="model" className="font-bold">
                        Model
                    </label>
                    <InputText id="model" value={product.model} onChange={(e) => onInputChange(e, 'model')} className={classNames({ 'p-invalid': submitted && !product.model })} />
                    {submitted && !product.model && <small className="p-error">Model is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="brand" className="font-bold">
                        Brand
                    </label>
                    <InputText id="brand" value={product.brand} onChange={(e) => onInputChange(e, 'brand')} className={classNames({ 'p-invalid': submitted && !product.brand })} />
                    {submitted && !product.brand && <small className="p-error">Brand is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Class</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value='1' onChange={onCategoryChange} checked={product.deviceClassificationId === 1} />
                            <label htmlFor="category1">Current</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value='2' onChange={onCategoryChange} checked={product.deviceClassificationId === 2} />
                            <label htmlFor="category2">Recycle</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value='3' onChange={onCategoryChange} checked={product.deviceClassificationId === 3} />
                            <label htmlFor="category3">Rare</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value='4' onChange={onCategoryChange} checked={product.deviceClassificationId === 4} />
                            <label htmlFor="category4">Unknown</label>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">Device type</label>
                    <Dropdown value={selectedDeviceType} options={deviceTypes} onChange={e => { onDropdownChange(e, 'deviceTypeId'); setSelectedDeviceType(e.value) }} optionLabel="deviceType" />
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.expectedValue} onValueChange={(e) => { onInputNumberChange(e, 'expectedValue') }} mode="currency" currency="USD" locale="en-US" />
                    </div>

                </div>
            </Dialog>
        </div></>
    );
}

export default ProductGrid;
