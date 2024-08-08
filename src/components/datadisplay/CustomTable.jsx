import { Table } from "antd";

export default function CustomTable({ title, columns, data, pagination, height}){
    return(
        <Table
            columns = { columns }
            dataSource = { data }
            pagination = {{ pageSize: pagination }}
            scroll = {{ y: height, x: '80vw' }}
            size = "middle"
            title = { () => title }
            footer = { () => `Nombre total :  ${data.length}` }
            bordered
            style = {{ margin: '20px'}}
        />
    )
}