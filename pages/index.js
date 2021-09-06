//Módulo para la contrucción de caminos
import path from "path";
//Módulo del sistema de archivos de node JS
import fs from "fs/promises";

function HomePage(props) {
  const { products } = props;
  console.log(products.length);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

//Lo que hace esta función es preparar los props para su compoenente
//Se ejecuta primero y despues el componenente
//Ejecutar cualquier código  nunca sera visible del lado del cliente
export async function getStaticProps(context) {
  console.log("Re Generating..");
  //Definir la ruta
  //process está disponible globalmente en el nodo JS y podemos ejecutar cwd
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  //JSON es un objecto diponible globalmente
  //Lo convierte en JavaScrit normal
  const data = JSON.parse(jsonData);
  
  console.log(!data);
    //Redireccionamiento
    if(!data){
  
      return{
        redirect:{
          destination: '/no-data'
        }
      }
    }



  //Comprobar si e objecto esta vacio
  if (data.products.length === 0) {
    return { notFound: true };
  }


  return {
    props: {
      //products: [{ id: "1", title: "Product  1" }],
      products: data.products,
    },
    //Deve volver a generarse
    revalidate: 10,
    //Redireccionamiento
  };
}

export default HomePage;
