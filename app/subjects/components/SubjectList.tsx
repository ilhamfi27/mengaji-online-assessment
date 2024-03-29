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
import SubjectForm from './SubjectForm';
import ConfirmationDialog from 'src/components/Dialog/ConfirmationDialog';
import { useSubject } from '@/src/hooks/useSubject';
import { Subject } from '@/src/services/subject';
import { useSnackbar } from '@/src/hooks/useSnackbar';

const SubjectList = () => {
  const {
    subjects,
    refreshSubjects,
    isLoading,
    subject,
    setSubject,
    deleteSubject,
    filter,
    setFilter,
  } = useSubject();
  const [modalOpen, setModalOpen] = useState(false);
  const [willDelete, setWillDelete] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    refreshSubjects();
  }, []);

  const handleButtonAction = (param: any) => {
    setModalOpen(true);
    setSubject(param.row);
  };

  const handleOk = (p: Subject) => {
    deleteSubject(p.id as string).then(() => {
      refreshSubjects();
      showSnackbar('Subject archived!', 'success');
    });
  };

  const columns: GridColDef<any>[] = [
    { field: 'code', headerName: 'Code', width: 200 },
    { field: 'name', headerName: 'Name', width: 400 },
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
            setSubject(null);
          }}
        >
          <Add />
          Add Subject
        </Button>
      </div>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}
      >
        <DataGrid
          rows={subjects?.items ?? []}
          rowCount={subjects?.totalSize ?? 0}
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
            handleOk(subject as Subject);
          }}
          title="Archive Subject"
          message={`Are you sure you want to archive ${subject?.name}?`}
        />
      ) : (
        <SimpleDialog
          open={modalOpen}
          handleClose={() => {
            setModalOpen(false);
          }}
          title={`${subject ? 'Edit' : 'Add'} Subject`}
          maxWidth="md"
        >
          <SubjectForm
            data={subject as Subject}
            onSubmitSuccess={() => {
              setModalOpen(false);
            }}
          />
        </SimpleDialog>
      )}
    </>
  );
};

export default SubjectList;
