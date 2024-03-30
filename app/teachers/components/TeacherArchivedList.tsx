'use client';

import { Unarchive } from '@mui/icons-material';
import { IconButton, Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import ConfirmationDialog from 'src/components/Dialog/ConfirmationDialog';
import { useTeacher } from '@/src/hooks/useTeacher';
import { Teacher } from '@/src/services/teacher';
import { useSnackbar } from '@/src/hooks/useSnackbar';

const ArchivedTeacherList = () => {
  const {
    archivedTeachers,
    refreshArchivedTeachers,
    refreshTeachers,
    isLoading,
    teacher,
    setTeacher,
    filter,
    setFilter,
    undeleteTeacher,
  } = useTeacher();
  const { showSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const [willUnarchived, setWillUnarchive] = useState(false);

  useEffect(() => {
    refreshTeachers();
    refreshArchivedTeachers();
  }, []);

  const handleButtonAction = (param: any) => {
    setModalOpen(true);
    setTeacher(param.row);
  };

  const handleOk = (p: Teacher) => {
    undeleteTeacher(p.id as string).then(() => {
      refreshArchivedTeachers();
      refreshTeachers();
      showSnackbar('Teacher unarchived!', 'success');
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
      renderCell: (param) => param.row.subject?.name,
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
              setWillUnarchive(true);
            }}
            aria-label="delete"
            size="small"
          >
            <Unarchive />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}
      >
        <DataGrid
          rows={archivedTeachers?.items ?? []}
          rowCount={archivedTeachers?.totalSize ?? 0}
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
          autoHeight
        />
      </Box>

      <ConfirmationDialog
        open={modalOpen && willUnarchived}
        handleClose={() => {
          setModalOpen(false);
          setWillUnarchive(false);
        }}
        handleOk={() => {
          setModalOpen(false);
          setWillUnarchive(false);
          handleOk(teacher as Teacher);
        }}
        title="Unarchive Teacher"
        message={`Are you sure you want to unarchive ${teacher?.name} with employee ID ${teacher?.employeeId}?`}
      />
    </>
  );
};

export default ArchivedTeacherList;
