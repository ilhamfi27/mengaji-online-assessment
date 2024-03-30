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
import ActiveClassForm from './ActiveClassForm';
import ConfirmationDialog from 'src/components/Dialog/ConfirmationDialog';
import { useActiveClass } from '@/src/hooks/useActiveClass';
import { ActiveClass } from '@/src/services/active-class';
import { useSnackbar } from '@/src/hooks/useSnackbar';

const ActiveClassList = () => {
  const {
    activeClasses,
    refreshActiveClasss,
    isLoading,
    activeClass,
    setActiveClass,
    deleteActiveClass,
    filter,
    setFilter,
  } = useActiveClass();
  const [modalOpen, setModalOpen] = useState(false);
  const [willDelete, setWillDelete] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    refreshActiveClasss();
  }, []);

  const handleButtonAction = (param: any) => {
    setModalOpen(true);
    setActiveClass(param.row);
  };

  const handleOk = (p: ActiveClass) => {
    deleteActiveClass(p.id as string).then(() => {
      refreshActiveClasss();
      showSnackbar('Class archived!', 'success');
    });
  };

  const columns: GridColDef<any>[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'teacher.name',
      headerName: 'Teacher',
      width: 200,
      renderCell: (param) => param.row.teacher.name,
    },
    {
      field: 'subject.name',
      headerName: 'Subject',
      width: 200,
      renderCell: (param) => param.row.teacher.subject.name,
    },
    { field: 'duration', headerName: 'Duration', width: 200 },
    {
      field: 'dateAndTime',
      headerName: 'Date and Time',
      width: 200,
      renderCell: (param) => new Date(param.value).toLocaleString(),
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
            setActiveClass(null);
          }}
        >
          <Add />
          Add Class
        </Button>
      </div>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}
      >
        <DataGrid
          rows={activeClasses?.items ?? []}
          rowCount={activeClasses?.totalSize ?? 0}
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
            handleOk(activeClass as ActiveClass);
          }}
          title="Archive Class"
          message={`Are you sure you want to archive ${activeClass?.name}?`}
        />
      ) : (
        <SimpleDialog
          open={modalOpen}
          handleClose={() => {
            setModalOpen(false);
          }}
          title={`${activeClass ? 'Edit' : 'Add'} Class`}
          maxWidth="md"
        >
          <ActiveClassForm
            data={activeClass as ActiveClass}
            onSubmitSuccess={() => {
              setModalOpen(false);
            }}
          />
        </SimpleDialog>
      )}
    </>
  );
};

export default ActiveClassList;
