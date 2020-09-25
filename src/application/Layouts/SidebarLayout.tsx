/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Navigation, Selected } from "./Navigation";

interface NavigationProps {
  selected: Selected;
  queriesCount: number;
  mutationsCount: number;
};

interface SidebarLayoutProps {
  navigationProps?: NavigationProps
  children: any;
};

interface SidebarLayoutComposition {
  Sidebar: React.FC;
  Main: React.FC;
}

const layout = css`
  display: grid;
  grid-template-areas:
    "nav . . ."
    "sidebar main main main"
`;

const sidebar = css`
  grid-area: sidebar;
  background-color: indigo;
`;

const SidebarLayout: React.FC<SidebarLayoutProps> & SidebarLayoutComposition = ({
  navigationProps = {
    selected: Selected.GraphiQL,
    queriesCount: 0,
    mutationsCount: 0,
  },
  children,
}) => {
  const { selected, queriesCount, mutationsCount, } = navigationProps;

  return (
    <div css={layout}>
      <Navigation
        css={{ gridArea: 'nav' }}
        selected={selected}
        queriesCount={queriesCount}
        mutationsCount={mutationsCount}
      />
      {children}
    </div>
  );
};

const Sidebar = ({ children }) => (<div css={sidebar}>{children}</div>);
const Main = ({ children }) => (<div css={{ gridArea: 'main' }}>{children}</div>);

SidebarLayout.Sidebar = Sidebar;
SidebarLayout.Main = Main;

export { SidebarLayout };
