import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Mosaic, MosaicWindow } from "react-mosaic-component";
import { Classes } from "@blueprintjs/core";
import useDarkMode from "use-dark-mode";
import Propeteer from "propeteer";

__EXTRA_IMPORTS__;

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "react-mosaic-component/react-mosaic-component.css";

__LOOK_UP_TABLE__;

const Pane = ({ onChange, value, meta, ...extraProps }) => {
  const { value: isDarkMode } = useDarkMode();
  return (
    <Mosaic
      value={value}
      onChange={onChange}
      className={
        isDarkMode
          ? classNames("mosaic-blueprint-theme", Classes.DARK)
          : "mosaic-blueprint-theme"
      }
      renderTile={(id, path) => {
        const { title, children } = meta.get(id);
        return (
          <MosaicWindow title={title} path={path}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflowY: 'scroll',
              }}
            >
              <Propeteer LookUpTable={__LOOK_UP_TABLE__} children={children} />
            </div>
          </MosaicWindow>
        );
      }}
    />
  );
};

Pane.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({}).isRequired
};
Pane.defaultProps = {};

export default Pane;
