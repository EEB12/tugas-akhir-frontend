import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Landing from './pages/Landing/Landing';
import Upload from './pages/Upload/Upload';
import Model from './pages/upload_model/Model';
import Listmodel from './pages/list_model/Listmodel';
import Listpenelitian from './pages/list_penelitian/ListPenelitian';
import Listpenelitianmanual from './pages/list_penelitian_manual/ListPenelitianManual';
import AnotateManual from './pages/Manual/AnotateManual';
const RouteApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/landing' element={<Landing/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/upload-model' element={<Model/>}/>
        <Route path='/list-model/:id' element={<Listmodel/>}/>
        <Route path='/list-penelitian' element={<Listpenelitian/>}/>
        <Route path='/list-penelitian-manual' element={<Listpenelitianmanual/>}/>
        <Route path='/anotasi-manual/:id' element={<AnotateManual/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteApp;
