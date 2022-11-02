import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type RepeatProps = {
  handleChange: (selectedDays: string[]) => void,
  values: string[],
}

export default function Repeat(props: RepeatProps) {
  return (
    <ToggleButtonGroup size="small" 
      value={props.values}
      onChange={(_, value) => props.handleChange(value)}
    >
      <ToggleButton value="0" key="Sunday">S</ToggleButton>,
      <ToggleButton value="1" key="Monday">M</ToggleButton>,
      <ToggleButton value="2" key="Tuesday">T</ToggleButton>,
      <ToggleButton value="3" key="Wednesday">W</ToggleButton>,
      <ToggleButton value="4" key="Thursday">T</ToggleButton>,
      <ToggleButton value="5" key="Friday">F</ToggleButton>,
      <ToggleButton value="6" key="Saturday">S</ToggleButton>,
    </ToggleButtonGroup>
  );
}
