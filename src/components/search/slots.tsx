import React, { useState } from 'react';
import SlotsCard from 'components/search/slotsCard';
import { List } from '@mui/material';

const Slots = (props: any) => {
  const { allRoutes } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    console.log(index);
    setSelectedIndex(index);
  };

  return (
    <List disablePadding>
      {allRoutes.slots.map((item: any, index: number) => {
        return (
          <SlotsCard
            slot={item}
            SlotIndex={index}
            selectedIndex={selectedIndex}
            cardOnClick={(
              event: React.MouseEvent<HTMLDivElement, MouseEvent>,
              index: number,
            ) => handleListItemClick(event, index)}
          />
        );
      })}
    </List>
  );
};

export default Slots;
