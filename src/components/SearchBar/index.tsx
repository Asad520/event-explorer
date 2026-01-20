import { FC } from 'react';

import { SearchBarProps } from './types';
import { Container, Input } from './styles';

export const SearchBar: FC<SearchBarProps> = props => {
  return (
    <Container>
      <Input
        placeholderTextColor="#999"
        placeholder="Search events..."
        clearButtonMode="while-editing"
        {...props}
      />
    </Container>
  );
};
