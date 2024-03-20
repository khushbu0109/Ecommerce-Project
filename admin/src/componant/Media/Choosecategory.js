import React, { useContext ,useEffect} from 'react'
import categoryCon from '../../context/Category/CategoryContext'

export default function Choosecategory(props) {


    const categoryContext = useContext(categoryCon)
    const   {category,getAllCatagory} = categoryContext
    useEffect(() => {
      getAllCatagory(props.type)
    
    }, [])
    
  return (
   <>
    <div className="form-group">
                          <label className="form-label">Choose Category</label>
                          <select className="form-control" name="cat_id" onChange={props.onChange} >
                            <option value={0}>Choose Category</option>
                            {category.map((cat, i) => {
                              return (<option value={cat._id}>{cat.cat_name}</option>)
                            })}
                          </select>

                        </div>
   </>
  )
}
