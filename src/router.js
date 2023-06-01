import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Form from './components/form';
import Explain from './components/explain';
import Admin from './components/admin';
import Context from './context';

export default function MyRouter() {
    return (
        <>
            <div class="row">
                <Link class="btn btn-outline-info m-5 p-3 bg-secondary  text-white col" to='/explain'>לדף הסבר</Link>
                <Link class="btn btn-outline-info m-5 p-3 bg-secondary  text-white col" to='/form'>לטופס</Link>
                <Link to='/admin' class="btn btn-outline-info m-5 p-3 bg-secondary  text-white col">מנהל</Link>
            </div>
            <Routes>
                <Route path='/explain' element={<Context><Explain /></Context>} />
                <Route path='/admin' element={<Context><Admin /></Context>} />
                <Route path='/form' element={<Context><Form /></Context>} />
            </Routes>
        </>
    )
}