import React, {useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";

const UpdateProduct = () => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    // const [error,setError] = React.useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    },[]);

    const getProductDetails = async () => {
        console.warn(params);
        let result = await fetch(`http://localhost:8080/product/${params.id}`,{
            headers:{
                authorization:  `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct =  async() => {

        console.warn(name,price,category,company);
        let result = await fetch(`http://localhost:8080/product/${params.id}`,{
            method:"Put",
            body: JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':"application/json",
                authorization:  `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);   
        navigate('/');  
    }

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" className="inputBox" placeholder="Enter product name" value={name} onChange={(e) => {setName(e.target.value)} } />
            {/* {error && !name && <span className="invalid-input">Enter valid name</span>} */}

            <input type="text" className="inputBox" placeholder="Enter product price" value={price} onChange={(e) => {setPrice(e.target.value)} }/>
            {/* {error && !price && <span className="invalid-input">Enter valid price</span>} */}

            <input type="text" className="inputBox" placeholder="Enter product category" value={category} onChange={(e) => {setCategory(e.target.value)} }/>
            {/* {error && !category && <span className="invalid-input">Enter valid category</span>} */}

            <input type="text" className="inputBox" placeholder="Enter product company" value={company} onChange={(e) => {setCompany(e.target.value)} }/>
            {/* {error && !company && <span className="invalid-input">Enter valid company</span>} */}
            
            <button className="appButton" onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;