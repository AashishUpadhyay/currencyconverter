import { Conversion, mapStateToProps } from '../Conversion';
import renderer from 'react-test-renderer';
import React from 'react';

describe('The conversion component tests!', () => {
    describe('Map state to properties!', () => {
        it('it should map the state to props correctly!', () => {
            var amount = {
                originAmount: 100,
                destinationAmount: 120,
                conversionRate: 1.2,
                feeAmount: 10,
                totalCost: 130,
                originCurrency: 'USD',
                destinationCurrency: 'EUR'
            };

            var error = { errorMsg: 'SOME ERROR MSG!' };
            var inputState = { amount: amount, error: error };
            var expectedState = { ...amount, errorMsg: error.errorMsg };
            var mappedState = mapStateToProps(inputState);
            expect(mappedState).toEqual(expectedState);
        })
    });

    describe('Display conversion element!', () => {
        function createNodeMock(element) {
            if (element.type === 'input') {
                return {
                    focus() { },
                };
            }
            return null;
        }

        it('it should not regress', () => {
            const options = { createNodeMock };
            const tree = renderer.create(<Conversion originAmount={100}
                destinationAmount={120}
                conversionRate={1.2}
                feeAmount={10}
                totalCost={130}
                originCurrency={'USD'}
                destinationCurrency={'EUR'}
                errorMsg=''
            />, options).toJSON();
            console.log(tree);
            expect(tree).toMatchSnapshot();
        })
    });
});