import PropTypes from "prop-types";
import React from "react";
import { ethers } from "ethers";

export class CryptoAddressControl extends React.Component {
  preOnChange = (type, address, callback) => {
    let value = `${type}:${address}`;

    this.valid = false;

    switch (type.toLowerCase()) {
      case "evm":
        try {
          this.valid =
            ethers.utils.isAddress(address) ||
            ethers.utils.isAddress(address.toLowerCase());
          if (this.valid) {
            value = `${type}:${ethers.utils.getAddress(address.toLowerCase())}`;
          }
        } catch (e) {
          console.log(e);
          try {
            value = `${type}:${ethers.utils.getAddress(address)}`;
          } catch (_) {
            this.valid = false;
          }
        }
        break;
    }

    if (!address) {
      this.valid = true;
      value = "";
    }

    callback(value);
  };

  isValid = () => {
    return this.valid;
  };

  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
    } = this.props;

    const types = ["evm"];

    let [type, address] = value.split(":");

    type = type || types[0];

    return (
      <div
        style={{ display: "flex" }}
        className={classNameWrapper}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
      >
        {types.length > 1 ? (
          <select
            id={`${forID}_type`}
            value={type}
            onChange={(e) =>
              this.preOnChange(e.target.value, address, onChange)
            }
          >
            {types.map((v) => (
              <option
                key={v}
                value={v}
                selected={v.toLowerCase() == type.toLowerCase()}
              >
                {v.toUpperCase()}
              </option>
            ))}
          </select>
        ) : (
          <></>
        )}
        <input
          style={{
            // border: 1,
            // borderColor: "black",
            // borderStyle: "solid",
            flexGrow: 1,
            marginLeft: types.length > 1 ? 10 : 0,
          }}
          type="text"
          id={`${forID}`}
          value={address}
          onChange={(e) =>
            this.preOnChange(type, e.target.value.trim(), onChange)
          }
        />
      </div>
    );
  }
}

CryptoAddressControl.propTypes = {
  onChange: PropTypes.func.isRequired,
  forID: PropTypes.string,
  value: PropTypes.node,
  classNameWrapper: PropTypes.string.isRequired,
  setActiveStyle: PropTypes.func.isRequired,
  setInactiveStyle: PropTypes.func.isRequired,
};

CryptoAddressControl.defaultProps = {
  value: "",
};

export function CryptoAddressPreview({ value }) {
  return <div>{value}</div>;
}

CryptoAddressPreview.propTypes = {
  value: PropTypes.node,
};

if (typeof window !== "undefined") {
  window.CryptoAddressControl = CryptoAddressControl;
  window.CryptoAddressPreview = CryptoAddressPreview;
}
const exportObject = { CryptoAddressControl, CryptoAddressPreview };

export default exportObject;
