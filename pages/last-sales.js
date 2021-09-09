import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  console.log(props.sales);
  //props.sales del lado del servidor
  const [sales, setSales] = useState(props.sales);
  //loading mientras esperamos que lleguen esos resultados
  //const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-4f76d-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  /*
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
*/
  // if (isLoading) {
  // return <p>Loading...</p>;
  // }

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !sales) {
    return <p>Loading....</p>;
  }

  //if (!sales) {
  //return <p>Loading....</p>;
  //}

  //2
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-4f76d-default-rtdb.firebaseio.com/sales.json"
  );
  //.then((response) => response.json())
  const data = await response.json();
  //.then((data) => {
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales } };
  //  });
}

export default LastSalesPage;
