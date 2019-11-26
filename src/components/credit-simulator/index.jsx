import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './credit-simulator.scss';
import DataRow from '../data-row';

const propTypes = {
  title: PropTypes.string,
};

class CreditSimulator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 5000,
      term: 3,
      installment: 5000 / 3,
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleAmountChange(amount) {
    this.setState({
      amount,
    });

    const { term } = this.state;

    this.handleDataChange(amount, term);
  }

  handleTermChange(term) {
    this.setState({
      term,
    });

    const { amount } = this.state;

    this.handleDataChange(amount, term);
  }

  handleDataChange(amount, term) {
    this.setState({
      amount,
      term,
      installment: amount / term,
    });
  }

  render() {
    const { title } = this.props;
    const { installment } = this.state;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });

    return (
      <div className={style.simulator}>
        <div className={style.container}>
          <div className={style.subcontainer}>
            <div className={style.title}>{title}</div>
            <DataRow
              title="MONTO TOTAL"
              from={5000}
              to={50000}
              unit="$"
              onChange={this.handleAmountChange}
            />
            <DataRow
              title="PLAZO"
              from={3}
              to={24}
              onChange={this.handleTermChange}
            />
            <div className={style.installment}>
              Cuota fija por mes: {formatter.format(installment)}
            </div>
            <div className={style.buttonwrapper}>
              <button type="button" className={style.obtain}>
                OBTENÉ CRÉDITO
              </button>
              <button type="button" className={style.details}>
                VER DETALLE DE CUOTAS
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreditSimulator.propTypes = propTypes;

export default CreditSimulator;
