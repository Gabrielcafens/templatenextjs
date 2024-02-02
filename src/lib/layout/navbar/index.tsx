import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Editable defaultValue="Take some chakra">
      <EditablePreview />
      <EditableTextarea />
    </Editable>
  );
};
