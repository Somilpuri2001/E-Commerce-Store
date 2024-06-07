import {useState,useEffect} from 'react';
import axios from 'axios';

const useCategory = () =>{
    const [categories,setCategories] = useState();

    const getCategories = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            setCategories(data?.category)
        } catch (error) {
            console.log(`Error message in useCategory hook: Error message-> ${error}`)
        }
    }

    useEffect(()=>{
        getCategories();
    },[])

    return categories;
}

export default useCategory