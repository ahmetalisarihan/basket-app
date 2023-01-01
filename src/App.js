import { useState } from 'react';
import { Container, List, SimpleGrid, ThemeIcon, Input } from '@mantine/core'
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';
import './App.css';
import Card from "./components/Card";

const storeItems = [{
  name: "Macbook",
  src: "Macbook",
  price: 20
},
{
  name: "Mobilephone",
  src: "mobilephone",
  price: 10
},
{
  name: "Mouse",
  src: "mouse",
  price: 25
},
{
  name: "Headsets",
  src: "headset",
  price: 20
},
{
  name: "Office Chair",
  src: "chair",
  price: 10
},
{
  name: "Smart Watch",
  src: "Watch",
  price: 25
}
];

function App() {
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >=0);
 
  return (
    <Container>
      <Input.Wrapper label="Arama">
        <Input onChange={(e) => setSearchValue(e.target.value)}/>
      </Input.Wrapper>
      <SimpleGrid cols={3} className="Store">
        {filteredItems.map(({name, src}) => {
          return <Card 
          key={name} 
          name={name} 
          src={src}
          onAdd={() => setBasketItems([...basketItems, {name}])}
          />;
        })}
      </SimpleGrid>
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
      {basketItems.map(({ name }, index) => (
      <List.Item key={index}>{name}</List.Item>
      ))}
    </List>
    </Container>
  );
}

export default App;
