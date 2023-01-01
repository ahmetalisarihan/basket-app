import { useState } from 'react';
import { Badge, Button, Container, Drawer, Group, List, Indicator, SimpleGrid, ThemeIcon, Input, } from '@mantine/core'
import { IconCircleCheck, IconCircleDashed, IconZeppelin } from '@tabler/icons';
import './App.css';
import Card from "./components/Card";

const storeItems = [{
  id: 1,
  name: "Macbook",
  src: "Macbook",
  price: 20
},
{
  id: 2,
  name: "Mobilephone",
  src: "mobilephone",
  price: 10
},
{
  id: 3,
  name: "Mouse",
  src: "mouse",
  price: 25
},
{
  id: 4,
  name: "Headsets",
  src: "headset",
  price: 20
},
{
  id: 5,
  name: "Office Chair",
  src: "chair",
  price: 10
},
{
  id: 6,
  name: "Smart Watch",
  src: "Watch",
  price: 25
}
];

function App() {
  let [opened, setOpened] = useState(false);
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >=0);
  let addToBasket = ({ id, name }) => {
    let basketIndex= basketItems.findIndex((item) => item.id === id);
    if (basketIndex >=0) {
      let _basketItems = [...basketItems];
      _basketItems[basketIndex].count += 1;
      setBasketItems(_basketItems);
    } else{
      setBasketItems([...basketItems, { id, name, count: 1 }]);
    } 
  };
  return (
    <Container>
      <Group align="end">
      <Input.Wrapper label="Arama">
        <Input value= {searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
      </Input.Wrapper>
      <Button onClick={() => setSearchValue("")}>Temizle</Button>
      <Indicator color="red" label={basketItems.length} inline size={22}>
      <Button onClick={() => setOpened(true)}>Sepet</Button>
      </Indicator>
      </Group>
      <SimpleGrid cols={3} className="Store">
        {filteredItems.map(({id, name, src}) => {
          return <Card 
          key={name} 
          name={name} 
          src={src}
          onAdd={()=> addToBasket({id, name})}
          />;
        })}
      </SimpleGrid>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Sepetim"
        position="right"
        padding="md"
        size="sm"
      >
        <List
      className="List"
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconCircleCheck size={16} />
        </ThemeIcon>
      }
    >
      {basketItems.map(({ name, count }, index) => (
      <List.Item key={index}>{name} <Badge>{count}</Badge>
      </List.Item>
      ))}
    </List>
      </Drawer>
      
    </Container>
  );
}

export default App;
