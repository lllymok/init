import { useState } from 'react';
import { Popover } from '@headlessui/react';
import { InfoOutlinedIcon } from 'components/icons/InfoOutlinedIcon';

const PopoverOnHover = ({ info }: { info: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover className="relative">
      <Popover.Button
        className="flex"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <InfoOutlinedIcon className="text-blue-600 hover:text-blue-700" />
      </Popover.Button>

      {open && (
        <Popover.Panel
          className="mt-2 absolute z-10 w-64 text-xs leading-4 font-medium text-gray-700 bg-white px-2 py-1 ring-1 ring-black ring-opacity-5 shadow-lg rounded-md"
          static
        >
          {info}
        </Popover.Panel>
      )}
    </Popover>
  );
};

export default PopoverOnHover;
