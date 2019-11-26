import React, { Component } from 'react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';
import style from './data-row.scss';
/* eslint-disable */
import '!style-loader!css-loader!rc-slider/assets/index.css';
/* eslint-enable */
const propTypes = {
  title: PropTypes.string,
  from: PropTypes.number,
  to: PropTypes.number,
  onChange: PropTypes.func,
  unit: PropTypes.string,
};

class DataRow extends Component {
  constructor(props) {
    super(props);

    const { from, to, unit } = props;

    this.state = {
      value: from,
    };
    this.marks = {};
    this.marks[from] = {
      style: {
        color: '#fff',
        width: '4rem',
      },
      label: from,
    };
    this.marks[to] = {
      style: {
        color: '#fff',
        width: '4rem',
      },
      label: to,
    };
    if (unit) {
      this.marks[from].label = unit + ' ' + from;
      this.marks[to].label = unit + ' ' + to;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleAfterChange = this.handleAfterChange.bind(this);
  }

  handleChange(value, changeFromInput = false) {
    this.setState({ value });

    if (changeFromInput) {
      const { onChange } = this.props;
      onChange(value);
    }
  }

  handleAfterChange(value) {
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const { title, from, to } = this.props;

    const { value } = this.state;

    return (
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.title}>{title}</div>
          <input
            type="number"
            value={value}
            onChange={e => this.handleChange(e.target.value, true)}
          />
        </div>
        <div className={style.row}>
          <Slider
            min={from}
            max={to}
            marks={this.marks}
            value={value}
            onChange={this.handleChange}
            onAfterChange={this.handleAfterChange}
          />
        </div>
      </div>
    );
  }
}

DataRow.propTypes = propTypes;

export default DataRow;
