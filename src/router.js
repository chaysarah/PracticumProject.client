import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Form from './components/form';
import Explain from './components/explain';
import Admin from './components/admin';
import Context from './context';

export default function MyRouter() {
    return (
        <>
            <div class="btn btn-outline-info m-5 p-3"><Link to='/explain'>לדף הסבר</Link></div>
            <div class="btn btn-outline-info m-5 p-3"><Link to='/form'>לטופס</Link></div>
            <div class="btn btn-outline-info m-5 p-3"><Link to='/admin'>מנהל</Link></div>

            <Routes>
            <Route path='/explain' element={<Context><Explain /></Context>} />
            <Route path='/admin' element={<Context><Admin /></Context>} />
            <Route path='/form' element={<Context><Form /></Context>} />
            </Routes>
        </>
    )
}