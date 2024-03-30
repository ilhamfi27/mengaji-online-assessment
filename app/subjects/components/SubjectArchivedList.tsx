'use client';

import SimpleDialog from 'src/components/Dialog/SimpleDialog';
import { Edit, Add, Archive, Unarchive } from '@mui/icons-material';
import { IconButton, Box, Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import ConfirmationDialog from 'src/components/Dialog/ConfirmationDialog';
import { useSubject } from '@/src/hooks/useSubject';
import { Subject } from '@/src/services/subject';
import { useSnackbar } from '@/src/hooks/useSnackbar';

const ArchivedSubjectList = () => {
  const {
    archivedSubjects,
    refreshSubjects,
    refreshArchivedSubjects,
    isLoading,
    subject,
    setSubject,
    undeleteSubject,
    filter,
    setFilter,
  } = useSubject();
  const [modalOpen, setModalOpen] = useState(false);
  const [willUndelete, setWillUndelete] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    refreshSubjects();
  }, []);

  const handleButtonAction = (param: any) => {
    setModalOpen(true);
    setSubject(param.row);
  };

  const handleOk = (p: Subject) => {
    undeleteSubject(p.id as string).then(() => {
      refreshSubjects();
      refreshArchivedSubjects();
      showSnackbar('Subject unarchived!', 'success');
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
              setWillUndelete(true);
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
          rows={archivedSubjects?.items ?? []}
          rowCount={archivedSubjects?.totalSize ?? 0}
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
        open={modalOpen && willUndelete}
        handleClose={() => {
          setModalOpen(false);
          setWillUndelete(false);
        }}
        handleOk={() => {
          setModalOpen(false);
          setWillUndelete(false);
          handleOk(subject as Subject);
        }}
        title="Unarchive Subject"
        message={`Are you sure you want to unarchive ${subject?.name}?`}
      />
    </>
  );
};

export default ArchivedSubjectList;
