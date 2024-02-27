import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAdminGetStatus } from '../../../hooks/useAdminGetStatus';
import { getMusicians } from '../../../redux/states/MusiciansSlice/MusiciansActions';
import { deleteMusician } from '../../../redux/states/MusiciansSlice/MusiciansActions';
import AdminHeader from './components/AdminHeader';
import Loader from '../../../components/loader/Loader';

import { DataGridColors } from './components/DataGridColors';

const AdminMusicians = () => {
  useAdminGetStatus(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const admin = useSelector(state => state.adminReducer);
  const musiciansReducer = useSelector(state => state.musiciansReducer.musicians);
  const [withData, setWithData] = useState(false);
  const [rows, setRows] = useState([])
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (admin.isSignedIn) {
      dispatch(getMusicians())
    }
  }, [admin.isSignedIn])

  useEffect(() => {
    setShowLoader(true);
    setRows([]);
    if (admin.isSignedIn) {
      try {
        if (musiciansReducer.length > 0) {
          setShowLoader(true);
          let rowsObj = [];
          musiciansReducer.map(musician => {

            const div = document.createElement("div");
            div.innerHTML = musician?.description;

            const rowObj = {
              id: musician?._id,
              name: musician?.name,
              url: musician?.url,
              age: musician?.age,
              description: `${div.innerText}`,
              image: musician.image?.filePath,
              edit: musician?._id,
            }
            rowsObj = [...rowsObj, rowObj];
          })
          setRows(rowsObj);
          setTimeout(() => {
            setShowLoader(false);
          }, 1000);          
        } else {
          setShowLoader(false);
        }
        setWithData(true);

      } catch (e) {
        console.log(e);
        setShowLoader(false);
      }
    }
  }, [musiciansReducer])

  const deletItemsSelected = (e) => {
    setShowLoader(true);
    dispatch(deleteMusician(selectionModel)).then(() => {  
      dispatch(getMusicians());
    })
  }

  const confirmDelete = () => {
    confirmAlert({
      title: "Delete Muisician",
      message: "Are you sure you want to delete this musician?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deletItemsSelected(),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const columns = [
    {
      field: 'image',
      headerName: "Foto",
      flex: 0.3,
      renderCell: (params) => <img className='admin-data-grid-image' src={params.value} />
    },
    { field: 'name', headerName: 'Nombre', flex: 0.5 },
    { field: 'url', headerName: 'Url', flex: 0.5 },
    { field: 'age', headerName: 'Edad', flex: 0.2 },
    { field: 'description', headerName: 'Descripción', flex: 1.5 },
    {
      field: 'edit',
      headerName: "",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <button
            className='admin-grid-edit-btn'
            onClick={() => {
              navigate(`/admin/musician/${params.value}`);
            }}
          >Edit
          </button>
        )
      }
    },
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer className='admin-data-grid-header'>
        <div className='admin-grid-crear'>
          <button onClick={() => navigate('/admin/musician/')} className='admin-grid-edit-btn'>Crear Músico</button>
        </div>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <GridToolbarFilterButton />
        {showDeleteIcon &&
          <div><DeleteIcon className='admin-delete-icon' onClick={confirmDelete} /></div>
        }

      </GridToolbarContainer>
    );
  }

  return (
    <>
      {showLoader && <Loader />}
      {admin.isSignedIn &&
        <AdminHeader />
      }
      {withData &&
        <div style={{ height: 400, width: '100%' }}>
          <Box
            m="40px 10px 0px 10px"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: DataGridColors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: DataGridColors.blueAccent[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: DataGridColors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: DataGridColors.blueAccent[100],
              },
              "& .MuiCheckbox-root": {
                color: `${DataGridColors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${DataGridColors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection
              onRowSelectionModelChange={(newSelectionModel) => {
                if (newSelectionModel.length > 0) {
                  setShowDeleteIcon(true);
                } else {
                  setShowDeleteIcon(false);
                }
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              slots={{ toolbar: CustomToolbar }}
            />
          </Box>
        </div>
      }
    </>
  )
}

export default AdminMusicians