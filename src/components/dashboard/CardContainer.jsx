import { Card, Flex, List, Progress } from "antd";

export default function CardContainer({ items }){
    return(
        <Flex vertical = { false } align = "center" justify = "space-evenly" wrap = { true }>
            {
                items.map( item => 
                    <Card key = { item.key } style={{ padding: 0, minWidth: '20vw', margin: '5px auto', borderLeftColor: item.color, borderLeftWidth: 3}}>

                        <Flex vertical = { false } justify="space-between" style={{}}>

                            <Flex flex = {0.5} vertical = { true } align = "center" justify = "center" style = {{ color: item.color , fontSize: '1.8rem',marginRight: 10}}> { item.icon } </Flex>

                            <Flex  flex = {1.2} vertical = { true } wrap = 'nowrap' align = "center" justify = "center">

                                <span style = {{textWrap: 'nowrap', color: 'gray', fontWeight: 'bold', letterSpacing: '.2px'}}>{ item.title }</span>

                                <span style = {{ display: 'block', width: '100%', textAlign: 'center'}}>
                                    { item.percent &&
                                            <Progress size = 'small' percent = { item.percent.toFixed(1) } strokeLinecap = "square" status="active" strokeColor = { item.color }/>
                                    }
                                </span>

                                <span style = {{fontSize: '1.2rem', fontWeight: 'bold', color: 'gray'}}>{ item.value }</span>

                            </Flex>

                        </Flex>

                    </Card>
                )
            }
        </Flex>
    )
}