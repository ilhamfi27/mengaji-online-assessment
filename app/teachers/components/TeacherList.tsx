'use client';

import SimpleDialog from 'src/components/Dialog/SimpleDialog';
import { Edit, Delete, Add } from '@mui/icons-material';
import { IconButton, Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import ProductForm from './TeacherForm';
import ConfirmationDialog from 'src/components/Dialog/ConfirmationDialog';
import { useTeacher } from '@/src/hooks/useTeacher';
import { Teacher } from '@/src/services/teacher';

const TeacherList = () => {
  const { teachers, refreshTeachers, teacher, setTeacher } = useTeacher();
  const [modalOpen, setModalOpen] = useState(false);
  const [willDelete, setWillDelete] = useState(false);

  useEffect(() => {
    refreshTeachers();
  }, []);

  const handleButtonAction = (param: any) => {
    setModalOpen(true);
    setTeacher(param.row);
  };

  const handleOk = (p: any) => {};

  const columns: GridColDef<any>[] = [
    { field: 'employeeId', headerName: 'Employee ID' },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    {
      field: 'id',
      headerName: 'Action',
      width: 160,
      renderCell: (param) => (
        <>
          <IconButton
            onClick={() => {
              handleButtonAction(param);
            }}
            aria-label="edit"
            size="small"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              handleButtonAction(param);
              setWillDelete(true);
            }}
            aria-label="delete"
            size="small"
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="w-full flex gap-4 justify-end mb-4">
        <Button
          variant="contained"
          onClick={() => {
            setModalOpen(true);
            setTeacher(null);
          }}
        >
          <Add />
          Add Teacher
        </Button>
      </div>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}
      >
        <DataGrid
          rows={teachers?.items ?? []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          disableColumnSelector={true}
          disableRowSelectionOnClick={true}
        />
      </Box>
      {willDelete ? (
        <ConfirmationDialog
          open={modalOpen && willDelete}
          handleClose={() => {
            setModalOpen(false);
            setWillDelete(false);
          }}
          handleOk={() => {
            setModalOpen(false);
            setWillDelete(false);
            handleOk(null);
          }}
          title="Delete Teacher"
          message={`Are you sure you want to delete ${teacher?.name} with employee ID ${teacher?.employeeId}? This action cannot be undone.`}
        />
      ) : (
        <SimpleDialog
          open={modalOpen}
          handleClose={() => {
            setModalOpen(false);
          }}
          title={`${teacher ? 'Edit' : 'Add'} Teacher`}
          maxWidth="md"
        >
          <ProductForm
            data={teacher as Teacher}
            onSubmitSuccess={() => {
              setModalOpen(false);
            }}
          />
        </SimpleDialog>
      )}
    </>
  );
};

export default TeacherList;
