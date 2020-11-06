/** @jsx jsx */
import { IconRun } from "@apollo/space-kit/icons/IconRun";
import { jsx, css } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { rem } from "polished";
import { graphiQLQuery } from '../Explorer/Explorer';
import { currentScreen, Screens } from "../Layouts/Navigation";

export const runButtonStyles = css`
  appearance: none;
  display: flex;
  align-items: center;
  margin: 0 0 0 auto;
  border: none;
  font-size: ${rem(15)};
  background-color: transparent;
  cursor: pointer;

  > svg {
    width: ${rem(16)};
    margin-right: ${rem(8)};
  }
`;

export const RunInGraphiQLButton = ({ operation }) => {
  return (
    <button 
      css={runButtonStyles}
      onClick={() => {
        graphiQLQuery(operation);
        currentScreen(Screens.Explorer);
      }}
    >
      <IconRun />
      <span>Run in GraphiQL</span>
    </button>
  );
}
