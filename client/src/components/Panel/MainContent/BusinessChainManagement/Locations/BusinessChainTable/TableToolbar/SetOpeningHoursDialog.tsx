import { FC } from 'react';
import { FullHeightDialog } from '../../../../../../reusable/FullHeightDialog';
import { OpeningHours } from '../../../../PlaceManagement/PlaceBoard/OpeningHours/OpeningHours';

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
