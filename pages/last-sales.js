import { useEffect, useState } from "react";

function LastSalesPage() {
  const [sales, setSales] = useState();

  //loading mientras esperamos que lleguen esos resultados
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //Loading al principio
    setIsLoading(true);

    fetch("https://nextjs-course-4f76d-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      //Donde podemos utilizar los datos que recibimos
      //Es posible que queramos actualizar el estado de este componente
      //Para generar datos en 2
      .then((data) => {
        //Para transformar a matriz
        const transformedSales = [];

        console.log(data);
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        //Establecer ventas iguales a nuestros datos de ventas
        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(sales);
  if (!sales) {
    return <p>No data yest</p>;
  }
  //2
  return (
   
    <ul>
      {sales.map(sale => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
 
  );
}

export default LastSalesPage;
