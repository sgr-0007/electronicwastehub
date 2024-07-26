import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Navbar from './navbar';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';



const userRoles = [
    { label: 'admin', value: 1 },
    { label: 'owner', value: 2 },
    { label: 'staff', value: 3 },
    { label: 'localtrader', value: 4 },

];


const activeStates = [
    { label: 'true', value: true },
    { label: 'false', value: false },

];

const ManageUsers = () => {
    let emptyUser = {
        userid: null,
        useremail: '',
        password: '',
        role: '',
        roleid: 0,
        isactive: false,
    };


    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(emptyUser);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [userDialog, setUserDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
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

    }, []);

    const onInputChange = (event, field) => {
        const newUser = { ...user };

        newUser[field] = event.target.value;
        
        setUser(newUser);
    };

    const onRoleChange = (event, field) => {
        const newUser = { ...user }; // Create a copy to avoid mutation

        newUser[field] = event.target.value;
        const selectedRole = userRoles.find((role) => role.value === event.target.value);
        if (selectedRole) {
            newUser.role = selectedRole.label; 
        }
        setUser(newUser);
    };
    const onActiveChange = (event, field) => {
        const newUser = { ...user }; // Create a copy to avoid mutation

        newUser[field] = event.target.value;
    
        setUser(newUser);
    };
    const editUser = (user) => {
        setUser({ ...user });
        setUserDialog(true);
    };

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const saveUser = async () => {
        setSubmitted(true);
        if (user.useremail.trim()) {
          let _users = [...users];
          let _userIndex = _users.findIndex((u) => u.userid === user.userid);
      
          if (_userIndex !== -1) { // Update user if found
            _users[_userIndex] = user;
          }
      
          setUsers(_users); 
          const response = await axios.put(`${API_BASE_URL}/account/edit/info`, {
            userId : user.userid,    
            name: user.name,
            userEmail: user.useremail,
            password: user.password,
            role: user.role,
            isActive: user.isactive,
            roleId: user.roleid,
    
          });
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User details has been Updated', life: 3000 });
          setUserDialog(false);
        }
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" title='Edit' rounded className="mr-1" onClick={() => editUser(rowData)} />
            </React.Fragment>
        );
    };

    const userDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveUser} />
        </React.Fragment>
    );


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h3 className="m-0">Manage Users</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );


    return (
        <><Navbar /><div>
            <Toast ref={toast} />
            <div className="card">

                <DataTable
                    ref={dt}
                    value={users}
                    dataKey="userid"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                    header={header}
                    globalFilter={globalFilter}
                    >
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="useremail" header="Email ID" sortable></Column>
                    <Column field="role" header="Role" sortable></Column>
                    <Column field="isactive" header="Is Active"></Column>
                    <Column body={actionBodyTemplate} exportable={false}></Column>
                </DataTable>


            </div>
            <Dialog visible={userDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="User Details" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
            <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={user.name} onChange={(e) => onInputChange(e, 'name')} autoFocus className={classNames({ 'p-invalid': submitted && !user.name })} />
                </div>
                <div className="field">
                    <label htmlFor="useremail" className="font-bold">
                        Email ID
                    </label>
                    <InputText id="useremail" value={user.useremail} onChange={(e) => onInputChange(e, 'useremail')} autoFocus className={classNames({ 'p-invalid': submitted && !user.useremail })} />
                </div>
                <div className="field">
                    <label htmlFor="role" className="font-bold">
                        Role
                    </label>
                    <Dropdown id="role" onChange={(e) => onRoleChange(e, 'roleid')} value={user.roleid} options={userRoles}

                        placeholder="Select a role" className={classNames({ 'p-invalid': submitted && !user.roleid })} />
                </div>
                <div className="field">
                    <label htmlFor="isactive" className="font-bold">
                        Is Active
                    </label>
                    <Dropdown id="isactive" onChange={(e) => onActiveChange(e, 'isactive')} value={user.isactive} options={activeStates}

                        placeholder="Is Active?" className={classNames({ 'p-invalid': submitted && !user.isactive })} />
                </div>

            </Dialog>

        </div></>
    );
}

export default ManageUsers