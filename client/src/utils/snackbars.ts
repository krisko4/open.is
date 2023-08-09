import { useSnackbar } from 'notistack';

export const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const enqueueSuccessSnackbar = (message: string) =>
    enqueueSnackbar(message, {
      variant: 'success',
    });

  const enqueueErrorSnackbar = (message?: string) =>
    enqueueSnackbar(message || 'Oops, something went wrong', {
      variant: 'error',
    });

  const enqueueInfoSnackbar = (message: string) =>
    enqueueSnackbar(message, {
      variant: 'info',
    });

  const enqueueWarningSnackbar = (message: string) =>
    enqueueSnackbar(message, {
      variant: 'warning',
    });

  return { enqueueErrorSnackbar, enqueueInfoSnackbar, enqueueSuccessSnackbar, enqueueWarningSnackbar };
};
