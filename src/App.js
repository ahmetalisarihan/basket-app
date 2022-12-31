import { useState } from 'react';
import { Container, List, SimpleGrid, ThemeIcon, Input } from '@mantine/core'
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';
import './App.css';
import Card from "./components/Card";

const storeItems = [{
  name: "Spor Ayakkabı",
  price: 20
},
{
  name: "Futbol Topu",
  price: 10
},
{
  name: "Forma",
  price: 25
}
];

function App() {
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = basketItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >=0);
 
  return (
    <Container>
      <SimpleGrid cols={3} className="Store">
        {storeItems.map(({name}) => {
          return <Card 
          key={name} 
          name={name} 
          onAdd={() => setBasketItems([...basketItems, {name}])}
          />;
        })}
      </SimpleGrid>
      <Input.Wrapper label="Arama">
        <Input onChange={(e) => setSearchValue(e.target.value)}/>
      </Input.Wrapper>
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
      {filteredItems.map(({ name }, index) => (
      <List.Item key={index}>{name}</List.Item>
      ))}
    </List>
    </Container>
  );
}

export default App;
