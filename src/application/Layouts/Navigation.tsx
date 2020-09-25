/** @jsx jsx */
import React from 'react';
import { jsx, css } from "@emotion/core";
import { rem } from 'polished';
import { ApolloLogo } from "@apollo/space-kit/icons/ApolloLogo";

export enum Selected {
  GraphiQL = 'GraphiQL',
  Queries = 'Queries',
  Mutations = 'Mutations',
  Cache = 'Cache'
}

type NavButtonProps = {
  isSelected: boolean
};

type NavigationProps = {
  selected: Selected,
  queriesCount: number,
  mutationsCount: number,
};

const NavButton: React.FC<NavButtonProps>  = ({ isSelected, children }) => (
  <button
    css={{
      appearance: 'none',
      padding: `${rem(16)} ${rem(24)}`,
      fontSize: `${rem(14)}`,
      color: isSelected ? 'white' : '#777F8E',
      border: 'none',
      textTransform: 'uppercase',
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
);

const list = css` 
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Navigation: React.FC<NavigationProps> = ({ selected, queriesCount, mutationsCount }) => {
  const isSelected = (NavButton: Selected) => selected === NavButton;

  return (
    <nav>
      <ul css={list}>
        <li>
          <ApolloLogo css={{
            width: rem(32),
            height: 'auto',
            margin: `0 ${rem(24)}`,
          }} />
        </li>
        <li>
          <NavButton isSelected={isSelected(Selected.GraphiQL)}>
            GraphiQL
          </NavButton>
        </li>
        <li>
          <NavButton isSelected={isSelected(Selected.Queries)}>
            Queries ({queriesCount})
          </NavButton>
        </li>
        <li>
          <NavButton isSelected={isSelected(Selected.Mutations)}>
            Mutations ({mutationsCount})
          </NavButton>
        </li>
        <li>
          <NavButton isSelected={isSelected(Selected.Cache)}>
            Cache
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};