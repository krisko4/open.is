import { Typography, Button, CircularProgress, Grid, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSubscribersForSelectedLocationQuery } from 'redux-toolkit/api';
import { format } from 'date-fns';
import { CustomTable, TableData } from 'components/reusable/Table';

interface ToolbarProps {
  selectedRows: TableData[];
}
const ToolbarComponent: FC<ToolbarProps> = ({ selectedRows }) => {
  const handleClick = () => {
    console.log(selectedRows);
  };
  return (
    <Grid container justifyContent="flex-end">
      {selectedRows.length > 0 && (
        <Tooltip title="Say hello!">
          <Button variant="contained" onClick={handleClick} color="primary">
            Say hello!
          </Button>
        </Tooltip>
      )}
    </Grid>
  );
};

export const SubscriptionsTable: FC = () => {
  const { locationId } = useParams();
  const { data: subscribers, isFetching } = useGetSubscribersForSelectedLocationQuery(locationId as string);
  const tableData = useMemo(() => {
    if (subscribers) {
      if (subscribers.length === 0) {
        return {
          rows: [],
          columns: [],
        };
      }
      const firstSub = subscribers[0];
      const keys = Object.keys(firstSub) as Array<keyof typeof firstSub>;
      return {
        rows: subscribers.map(
          (sub) =>
            ({
              id: sub._id,
              firstName: sub.firstName,
              lastName: sub.lastName,
              email: sub.email,
              birthdate: format(new Date(sub.birthdate), 'yyyy-MM-dd'),
              subscribedAt: format(new Date(sub.subscribedAt), 'yyyy-MM-dd'),
            } as TableData)
        ),
        columns: [
          {
            key: keys[1],
            label: 'First name',
            disablePadding: true,
            numeric: false,
          },
          {
            key: keys[2],
            label: 'Last name',
            disablePadding: true,
            numeric: false,
          },
          {
            key: keys[3],
            label: 'E-mail address',
            disablePadding: true,
            numeric: false,
          },
          {
            key: keys[4],
            label: 'Date of birth',
            disablePadding: true,
            numeric: true,
          },
          {
            key: keys[5],
            label: 'Subscribes since',
            disablePadding: true,
            numeric: true,
          },
        ],
      };
    }
  }, [subscribers]);

  console.log(tableData);

  return (
    <>
      {isFetching ? (
        <CircularProgress />
      ) : (
        tableData &&
        (tableData.rows.length > 0 ? (
          <CustomTable
            tableTitle="Subscribers"
            rows={tableData.rows}
            columns={tableData.columns}
            renderToolbar={(selectedRows) => <ToolbarComponent selectedRows={selectedRows} />}
          />
        ) : (
          <Grid container justifyContent="center">
            <Typography variant="h4">Your place does not have any subscribers.</Typography>
          </Grid>
        ))
      )}
    </>
  );
};
