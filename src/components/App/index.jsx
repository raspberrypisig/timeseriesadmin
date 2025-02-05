// @flow
import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import TopBar from '../TopBar';
import MainContent from '../MainContent';
import DrawerRight from '../DrawerRight';

import styles from './styles';

const DRAWER_SETTINGS = gql`
  query drawerSettings {
    isOpenDrawer @client
    drawerWidth @client
  }
`;

const SET_OPEN_DRAWER = gql`
  mutation setOpenDrawer($isOpen: Boolean) {
    setOpenDrawer(isOpen: $isOpen) @client
  }
`;

const SET_DRAWER_WIDTH = gql`
  mutation setDrawerWidth($width: Number) {
    setDrawerWidth(width: $width) @client
  }
`;

const App = ({ classes }) => (
  <Query query={DRAWER_SETTINGS}>
    {({ data: { isOpenDrawer, drawerWidth } }: { data: any }) => (
      <Mutation mutation={SET_OPEN_DRAWER}>
        {setOpenDrawer => (
          <div
            style={{ paddingRight: isOpenDrawer ? drawerWidth : null }}
            className={classes.root}
          >
            <TopBar
              isOpenDrawer={isOpenDrawer}
              drawerWidth={drawerWidth}
              toggleDrawer={() =>
                setOpenDrawer({
                  variables: { isOpen: !isOpenDrawer },
                })
              }
            />

            <main className={classes.content}>
              <MainContent />
            </main>

            <Drawer
              variant="persistent"
              anchor="right"
              open={isOpenDrawer}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              PaperProps={{ style: { width: drawerWidth } }}
            >
              <Mutation mutation={SET_DRAWER_WIDTH}>
                {setDrawerWidth => (
                  <DrawerRight
                    drawerWidth={drawerWidth}
                    updateWidth={(width: number) =>
                      setDrawerWidth({ variables: { width } })
                    }
                  />
                )}
              </Mutation>
            </Drawer>
          </div>
        )}
      </Mutation>
    )}
  </Query>
);

export default withStyles(styles)(App);
