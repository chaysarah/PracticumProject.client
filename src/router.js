import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Form from './components/form';
import Explain from './components/explain';
import Context from './context';

export default function MyRouter() {
    return (
        <>
            <div><Link to='/explain'>לדף הסבר</Link></div>
            <div><Link to='/form'>לטופס</Link></div>

            <Routes>
            <Route path='/explain' element={<Context><Explain /></Context>} />
            <Route path='/form' element={<Context><Form /></Context>} />
            </Routes>
        </>
    )
}