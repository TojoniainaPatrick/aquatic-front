import { Card, Flex, Progress } from "antd";

export default function CardPercentContainer({ finishedOnTime, finishedOutTime, unFinished }){
    return(
        <Flex vertical = { false } gap = "small" wrap = { true } align="center" justify = "space-between" style={{ padding: '5px 20px' }}>

            <Card style = {{ minWidth: '30vw' }}>
                <span style = {{ fontWeight: 'bold', color: 'gray', paddingBottom: 8 }}>Accomplie dans le délais</span>
                <Progress percent = { finishedOnTime } strokeLinecap = "butt" strokeColor="#35df81"/>
            </Card>

            <Card style = {{ minWidth: '30vw' }}>
                <span style = {{ fontWeight: 'bold', color: 'gray', paddingBottom: 8 }}>Accomplie hors du délais</span>
                <Progress percent = { finishedOutTime } strokeLinecap = "butt" strokeColor="#f1bd38" />
            </Card>

            <Card style = {{ minWidth: '30vw' }}>
                <span style = {{ fontWeight: 'bold', color: '#f73b73', paddingBottom: 8 }}>Non accomplie</span>
                <Progress percent = { unFinished } strokeLinecap = "butt" strokeColor="#f73b73"/>
            </Card>
        </Flex>
    )
}