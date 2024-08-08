import React from 'react';
import { Select } from 'antd';
const App = () => (
    <Select
    
        showSearch

        style={{
        width: 200,
        }}

        placeholder="Search to Select"

        optionFilterProp="label"

        filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }

        options={[
        {
            value: '1',
            label: 'Not Identified',
        },
        {
            value: '2',
            label: 'Closed',
        }
        ]}
    />
);
export default App;