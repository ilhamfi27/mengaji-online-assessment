'use client';

import SimpleDialog from 'src/components/Dialog/SimpleDialog';
import { Edit, Add, Archive } from '@mui/icons-material';
import { IconButton, Box, Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import TeacherForm from './TeacherForm';
import ConfirmationDialog from 'src/components/Dialog/ConfirmationDialog';
import { useTeacher } from '@/src/hooks/useTeacher';
import { Teacher } from '@/src/services/teacher';
import { useSnackbar } from '@/src/hooks/useSnackbar';

const TeacherList = () => {
  const {
    teachers,
    refreshTeachers,
    isLoading,
    teacher,
    setTeacher,
    filter,
    setFilter,
    deleteTeacher,
  } = useTeacher();
  const { showSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const [willDelete, setWillDelete] = useState(false);

  useEffect(() => {
    refreshTeachers();
  }, []);

  const handleButtonAction = (param: any) => {
    setModalOpen(true);
    setTeacher(param.row);
  };

  const handleOk = (p: Teacher) => {
    deleteTeacher(p.id as string).then(() => {
      refreshTeachers();
      showSnackbar('Teacher archived!', 'success');
    });
  };

  const columns: GridColDef<any>[] = [
    { field: 'employeeId', headerName: 'Employee ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    {
      field: 'subject.id',
      headerName: 'Subject',
      width: 300,
      renderCell: (param) => param.row.subject.name,
    },
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
            <Archive />
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
          rowCount={teachers?.totalSize ?? 0}
          columns={columns}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          paginationMode="server"
          disableColumnSelector
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          onPaginationModelChange={(
            newPaginationModel: GridPaginationModel
          ) => {
            const newPage = newPaginationModel.page + 1;
            if (
              filter.page !== newPage ||
              filter.size !== newPaginationModel.pageSize
            ) {
              setFilter({
                ...filter,
                page: newPage,
                size: newPaginationModel.pageSize,
              });
            }
          }}
          filterMode="server"
          onFilterModelChange={(filterModel: GridFilterModel) => {
            const [value] = filterModel.quickFilterValues ?? [];
            setFilter({ ...filter, search: value });
          }}
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
            handleOk(teacher as Teacher);
          }}
          title="Archive Teacher"
          message={`Are you sure you want to archive ${teacher?.name} with employee ID ${teacher?.employeeId}?`}
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
          <TeacherForm
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
