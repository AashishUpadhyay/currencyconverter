import React from 'react';
import FeesTable from '../FeesTable';
import renderer from 'react-test-renderer';

describe('The fees table comonent', () => {

    it("renders as expected", () => {
        const tree = renderer.create(<FeesTable
            originCurrency={'USD'}
            destinationCurrency={'EUR'}
            conversionRate={1.3}
            fee={10}
            total={101}
        />).toJSON();

        console.log(tree);

        expect(tree).toMatchSnapshot();
    });
});