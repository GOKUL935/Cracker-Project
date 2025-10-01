import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function CrackersList(){

    const [list, setList] = useState([]);
    useEffect(()=>{ API.get('/crackers').then(r=>setList(r.data)).catch(e=>console.error(e)); }, []);
    return (
        <div>
            <h2>Available Crackers</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:12}}>
                {list.map(c => (
                    <div key={c._id} className="card">
                        <h3>{c.name}</h3>
                        <p>Price: ₹{c.price}</p>
                        <p>Stock: {c.stock}</p>
                        <p style={{minHeight:40}}>{c.description}</p>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <Link to={`/place-order/${c._id}`} className="btn">Order</Link>
                            <span style={{alignSelf:'center'}}>SKU: {c.sku || '-'}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}