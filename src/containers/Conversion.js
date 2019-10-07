import React from 'react';
import { connect } from 'react-redux';
import FeesTable from '../components/FeesTable';
import * as actions from '../actions/actions';

export class Conversion extends React.Component {
    constructor(props) {
        super(props);
        this.handleOriginAmountChange = this.handleOriginAmountChange.bind(this);
        this.handleDestAmountChange = this.handleDestAmountChange.bind(this);
        this.handleOriginCurrencyChange = this.handleOriginCurrency.bind(this);
        this.handleDestCurrencyChange = this.handleDestinationCurrency.bind(this);
    }

    componentDidMount() {
        this.originAmountInput.focus();
    }

    handleOriginCurrency(event) {
        var newCurrency = event.target.value;

        this.props.dispatch(actions.changeOriginCurrency(newCurrency));

        var payload = {
            originAmount: this.props.originAmount,
            originCurrency: newCurrency,
            destCurrency: this.props.destinationCurrency,
            calcOriginAmount: false
        }

        this.props.dispatch(actions.fetchConversionRate(payload));
        this.props.dispatch(actions.fetchMakeFee(payload));
    }

    handleDestinationCurrency(event) {
        var newCurrency = event.target.value;

        this.props.dispatch(actions.changeDestinationCurrency(newCurrency));

        var payload = {
            destAmount: this.props.originAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: newCurrency,
            calcOriginAmount: true
        }

        this.props.dispatch(actions.fetchConversionRateAndFees(payload));
    }

    handleOriginAmountChange(event) {
        var newAmount = event.target.value;

        // remove unallowed chars
        newAmount = newAmount.replace(',', '')

        // optimistic field updates
        this.props.dispatch(actions.changeOriginAmount(newAmount));

        var payload = {
            originAmount: newAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: this.props.destinationCurrency,
            calcOriginAmount: false
        }

        this.props.dispatch(actions.fetchConversionRate(payload));
        this.props.dispatch(actions.fetchMakeFee(payload));
    }

    handleDestAmountChange(event) {
        var newAmount = event.target.value;

        // remove unallowed chars
        newAmount = newAmount.replace(',', '')

        this.props.dispatch(actions.changeDestinationAmount(newAmount));

        var payload = {
            destAmount: newAmount,
            originCurrency: this.props.originCurrency,
            destCurrency: this.props.destinationCurrency,
            calcOriginAmount: true
        }

        this.props.dispatch(actions.fetchConversionRateAndFees(payload));
    }

    render() {
        if (this.props.errorMsg) {
            var errorMsg = <div className="errorMsg">{this.props.errorMsg}</div>
        }

        return (
            <div>
                {errorMsg}
                <label>Convert</label>&nbsp;
                <input className="amount-field" ref={input => this.originAmountInput = input} onChange={this.handleOriginAmountChange} value={this.props.originAmount} />
                <select value={this.props.originCurrency} onChange={this.handleOriginCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>
                to <input className="amount-field" onChange={this.handleDestAmountChange} value={this.props.destinationAmount} />&nbsp;
                <select value={this.props.destinationCurrency} onChange={this.handleDestCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>


                <br /><br /><br />
                <FeesTable
                    originCurrency={this.props.originCurrency}
                    destinationCurrency={this.props.destinationCurrency}
                    conversionRate={this.props.conversionRate}
                    fee={this.props.feeAmount}
                    total={this.props.totalCost}
                />
            </div>
        )
    }
}

export const mapStateToProps = (state) => {
    return {
        originAmount: state.amount.originAmount,
        destinationAmount: state.amount.destinationAmount,
        conversionRate: state.amount.conversionRate,
        feeAmount: state.amount.feeAmount,
        totalCost: state.amount.totalCost,
        originCurrency: state.amount.originCurrency,
        destinationCurrency: state.amount.destinationCurrency,
        errorMsg: state.error.errorMsg
    }
};

export default connect(mapStateToProps)(Conversion);
