import { Button, Grow, Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  setButtonClicked : React.Dispatch<React.SetStateAction<boolean>>
}

export const AddNewBusiness: FC<Props> = ({ setButtonClicked }) => {
  return (
        <Grow in={true} timeout={1200}>
            <Grid item lg={7}>
                <Stack spacing={2} justifyContent="space-evenly" sx={{ marginRight: 10, height: '100%' }} alignItems="center">
                    <Typography variant="h2">Hello, {localStorage.getItem('fullName')?.split(' ')[0]}</Typography>
                    <img src={'https://c.tenor.com/jCmPqgkv0vQAAAAC/hello.gif'} />
                    <Grid item lg={8}>
                        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                            It seems you have not registered any places yet.
                            Please press the button below to add your business
                            and take advantage of functionality provided by our panel.
                        </Typography>
                    </Grid>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setButtonClicked(true)}
                        size="large"
                        color="primary"
                    >
                        Add new business
                    </Button>
                </Stack>
            </Grid>
        </Grow >

  );
};