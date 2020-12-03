import React, { useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCount } from '../action/refreshAction';
import { useDispatch,useSelector } from 'react-redux';
import StarBorderIcon from '@material-ui/icons/StarBorder';



toast.configure();
const Products = () =>{

    const [checked, setChecked] = useState(false);
    const count = useSelector(state=>state.count);
    const handleSubmit = (e)=>{
        e.preventDefault();
        setstatus(!status);
        const formData = new FormData();
        formData.append('name',data.name);
        formData.append('price',data.price);
        formData.append('productCategory',data.productCategory);
        formData.append('productDesc',data.productDesc);
        formData.append('productImage',data.productImage);
        formData.append('special',data.special);
        axios.post('https://my-first-resturant.herokuapp.com/products',formData)
            .then(res=>{
                toast.success('Product Added successfully!',{position:toast.POSITION.BOTTOM_RIGHT});
                dispatch(addCount());
                setChecked(false);
                        })
            .catch(err=>console.log(err));
        setChecked(false);
        
    }
    const dispatch = useDispatch();
    const handleDelete = (id) =>{
        axios.delete(`https://my-first-resturant.herokuapp.com/products/${id}`)
            .then(res=>{
                toast.success('Product Deleted successfully!',{position:toast.POSITION.BOTTOM_RIGHT});
                dispatch(addCount());
            })
            .catch(err=>console.log(err));
    }
    // eslint-disable-next-line
    const [products,setProducts] = useState([]);
    const [specialP, setSpecialP] = useState([]);
    useEffect(() => {
        axios.get('https://my-first-resturant.herokuapp.com/products')
            .then(res=>{
                console.log(res);
                setProducts(res.data.products);
                console.log(products);
            })
            .catch(err=>{
                console.log(err);
            });
            axios.get('https://my-first-resturant.herokuapp.com/products/getSpecial/true')
                .then(res=>{
                    console.log(res);
                    setSpecialP(res.data.specialProducts);
                })
    // eslint-disable-next-line
    }, [count]);
    
    console.log(checked)
    const initialState = {
        name:null,
        productDesc:null,
        price:null,
        productCategory:null,
        productImage:null,
        special:false,
    }
    const [data,setData]=useState(initialState);
    const [status, setstatus] = useState(false)
    console.log(data);  
    const addProduct = () =>{
        setstatus(true);
    }
    return(
        <div className="section products">
            <h1 className="section-title">Products</h1>
            <button onClick={addProduct} className="product-btn"><AddIcon style={{fontSize:13,marginRight:5}}/>Add Product</button>
            <table className="product-table">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
                {products.length===0?<tr><td>No Data</td></tr>:
                products.map((product,index)=>{
                    return(
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.productCategory}</td>
                            <td>{product.productDesc}</td>
                            <td><img alt={product.name} src={product.imageUrl} /></td>
                            <td>
                                <div >
                                    <button onClick={(e)=>handleDelete(product._id)} className="product-table-btn">Delete</button>
                                </div>
                            </td>
                        </tr>
                    );
                })
                }
                </tbody>
            </table>
            <h3 className="special-products"><StarBorderIcon style={{fontSize:20}}/>Special Products</h3>
            <table>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Image</th>
                </tr>
                {
                    specialP.length===0?<tr><td>No Data</td></tr>:
                    specialP.map((item,index)=>{
                        const a = `http://localhost:3000/${item.productImage}`;
                        return(
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.productCategory}</td>
                                <td>{item.productDesc}</td>
                                <td><img alt={item.name} src={a} /></td>
                            </tr>     
                        )
                    })
                }
                </tbody>
            </table>
            <div className="margin-bottom"></div>
            <Modal ariaHideApp={false} isOpen={status}>
                <div className="popup-box">
                    <h5>Add Product description</h5>
                    <div className="form-div">
                        <form onSubmit={handleSubmit} >
                            <div className="input-div">
                                <label>Name: </label>
                                <input onChange={(e)=>setData({...data,name:e.target.value})}/>
                            </div>
                            <div className="input-div">
                                <label>Description: </label>
                                <input onChange={(e)=>setData({...data,productDesc:e.target.value})}/>
                            </div>
                            <div className="input-div">
                                <label>Price: </label>
                                <input onChange={(e)=>setData({...data,price:e.target.value})}/>
                            </div>
                            <div className="input-div">
                                <label>Category: </label>
                                <select defaultValue="default" onChange={(e)=>setData({...data,productCategory:e.target.value})}>
                                    <option value="default" disabled >Select Category</option>
                                    <option value="fastFood">Fastfood</option>
                                    <option value="meals">Meals</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </div>
                            <div className="checkbox" >
                                <label>MakeSpecial: </label>
                                <input onChange={()=>{
                                    setData({...data,special:!checked})
                                    setChecked(!checked);
                                    }} type="checkbox"/>
                            </div>
                            <div className="image">
                                <label>Image: </label>
                                <input type="file" onChange={(e)=>setData({...data,productImage:e.target.files[0]})} ></input>
                            </div>
                            <div className="input-button-div">
                                <button className="submit" onClick={handleSubmit}>Submit</button>
                                <button onClick={()=>setstatus(!status)} className="cancel" >Cancel</button>
                            </div>
                        </form>
                    </div>  
                </div>
            </Modal>
            
        </div>
    );
}

export default Products;