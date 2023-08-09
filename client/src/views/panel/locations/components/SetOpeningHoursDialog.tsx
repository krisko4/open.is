import { FullHeightDialog } from 'components/dialogs';
import { FC } from 'react';
import { OpeningHours } from 'views/panel/openingHours';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLocations: string[];
}

export const SetOpeningHoursDialog: FC<Props> = ({ dialogOpen, setDialogOpen, selectedLocations }) => {
  return (
    <FullHeightDialog title="Opening hours management" dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
      <OpeningHours selectedLocations={selectedLocations} />
    </FullHeightDialog>
  );
};
