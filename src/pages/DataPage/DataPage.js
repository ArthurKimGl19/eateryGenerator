import React from 'react';

import ChartGraph from '../../components/ChartGraph/ChartGraph';
export default function DataPage() {
    return (
        <React.Fragment>
            <ChartGraph category={'type'} label={'Eateries Type'} />
            <ChartGraph category={'price'} label={'Eateries Price'} />
        </React.Fragment>
    );
}
