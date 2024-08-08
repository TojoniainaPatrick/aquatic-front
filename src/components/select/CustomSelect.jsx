import React from 'react';
import { Select } from 'antd';

const CustomSelect = ({ data, placeholder, setValue }) => (
    <Select
    
        showSearch

        size = 'large'

        style={{ width: '100%', marginTop: '15px' }}

        placeholder = { placeholder }

        optionFilterProp="label"

        filterSort = { (optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }

        onChange = { selected => setValue(selected) }

        options = { data }
    />
);
export default CustomSelect;