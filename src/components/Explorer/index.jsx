// @flow
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ExplorerItem from './ExplorerItem';
import ExplorerButton from './ExplorerButton';
import ExplorerCollapse from './ExplorerCollapse';
import {
  SHOW_DATABASES,
  SHOW_SERIES,
  SHOW_MEASUREMENTS,
  SHOW_RET_POLICIES,
  SHOW_FIELD_KEYS,
  SHOW_TAG_KEYS,
  SHOW_TAG_VALUES,
} from './queries';
import theme from './theme';

const Explorer = () => (
  <MuiThemeProvider theme={theme}>
    <ExplorerItem
      query={SHOW_DATABASES}
      label="Databases"
      resultsKey="databases"
    >
      {data =>
        data.map((database, index) => (
          <ListItem key={database.id}>
            <ExplorerCollapse
              renderToggler={(toggle, isExpanded) => (
                <ExplorerButton
                  label={database.name}
                  toggle={toggle}
                  isExpanded={isExpanded}
                />
              )}
            >
              <ExplorerItem
                db={database.id}
                query={SHOW_MEASUREMENTS}
                label="Measurements"
                resultsKey="measurements"
              >
                {data =>
                  data.map((meas, index) => (
                    <ListItem key={meas.id}>
                      <ExplorerCollapse
                        renderToggler={(toggle, isExpanded) => (
                          <ExplorerButton
                            label={meas.name}
                            toggle={toggle}
                            isExpanded={isExpanded}
                          />
                        )}
                      >
                        <ExplorerItem
                          db={database.id}
                          query={SHOW_RET_POLICIES}
                          label="Field Keys (by retention policy)"
                          resultsKey="policies"
                        >
                          {data =>
                            data.map((retPol, index) => (
                              <ListItem key={retPol.id}>
                                <ExplorerItem
                                  db={database.id}
                                  meas={meas.id}
                                  retPol={retPol.id}
                                  query={SHOW_FIELD_KEYS}
                                  label={retPol.name}
                                  resultsKey="fieldKeys"
                                  featured={false}
                                >
                                  {data =>
                                    data.map((fieldKey, index) => (
                                      <ListItem key={fieldKey.id}>
                                        <ListItemText
                                          primary={fieldKey.name}
                                          secondary={`(${fieldKey.type})`}
                                        />
                                      </ListItem>
                                    ))
                                  }
                                </ExplorerItem>
                              </ListItem>
                            ))
                          }
                        </ExplorerItem>
                        <ExplorerItem
                          db={database.id}
                          meas={meas.id}
                          query={SHOW_TAG_KEYS}
                          label="Tag Keys"
                          resultsKey="tagKeys"
                        >
                          {data =>
                            data.map((tagKey, index) => (
                              <ListItem key={tagKey.id}>
                                <ExplorerCollapse
                                  renderToggler={(toggle, isExpanded) => (
                                    <ExplorerButton
                                      label={tagKey.name}
                                      toggle={toggle}
                                      isExpanded={isExpanded}
                                    />
                                  )}
                                >
                                  <ExplorerItem
                                    db={database.id}
                                    meas={meas.id}
                                    tagKey={tagKey.id}
                                    query={SHOW_TAG_VALUES}
                                    label="Tag Values"
                                    resultsKey="tagValues"
                                  >
                                    {data =>
                                      data.map((tagValue, index) => (
                                        <ListItem key={tagValue.id}>
                                          <ListItemText
                                            primary={tagValue.value}
                                          />
                                        </ListItem>
                                      ))
                                    }
                                  </ExplorerItem>
                                </ExplorerCollapse>
                              </ListItem>
                            ))
                          }
                        </ExplorerItem>
                        <ExplorerItem
                          db={database.id}
                          meas={meas.id}
                          query={SHOW_SERIES}
                          label="Series"
                          resultsKey="series"
                        >
                          {data =>
                            data.map((se, index) => (
                              <ListItem key={se.id}>
                                <ListItemText
                                  primary={se.key}
                                  secondary={se.tags ? `(${se.tags})` : null}
                                />
                              </ListItem>
                            ))
                          }
                        </ExplorerItem>
                      </ExplorerCollapse>
                    </ListItem>
                  ))
                }
              </ExplorerItem>
              <ExplorerItem
                db={database.id}
                query={SHOW_RET_POLICIES}
                label="Retention Policies"
                resultsKey="policies"
              >
                {data =>
                  data.map((policy, index) => {
                    const description = Object.keys(policy)
                      .filter(k => k !== '__typename')
                      .map(k => `${k}: ${policy[k]}`)
                      .join(', ');
                    return (
                      <ListItem key={policy.id}>
                        <ListItemText
                          primary={policy.name}
                          secondary={description}
                        />
                      </ListItem>
                    );
                  })
                }
              </ExplorerItem>
              <ExplorerItem
                db={database.id}
                query={SHOW_SERIES}
                label="Series"
                resultsKey="series"
              >
                {data =>
                  data.map((se, index) => (
                    <ListItem key={se.id}>
                      <ListItemText primary={se.key} secondary={se.tags} />
                    </ListItem>
                  ))
                }
              </ExplorerItem>
            </ExplorerCollapse>
          </ListItem>
        ))
      }
    </ExplorerItem>
  </MuiThemeProvider>
);

export default Explorer;
