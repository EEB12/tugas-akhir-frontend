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
import NewPenelitian from './pages/new_penelitian/NewPenelitian';
import ListAnotator from './pages/list_anotator/ListAnotator';
import Listjob from './pages/list_job/Listjob';
import NewModel from './pages/new_model/NewModel';
import AnotateAuto from './pages/anotate_auto/AnotateAuto';
import DetailPenelitian from './pages/detail_penelitian/DetailPenelitian';
import UpgradeRole from './pages/upgrade/UpgradeRole';
import Profile from './pages/Profile/Profile';
import ListUser from './pages/ListUser/ListUser';
import MyTable from './pages/TableEditor/MyTable';
import ListMypenelitian from './pages/list_myPenelitian/ListMypenelitian';
const RouteApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Landing/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/upload-model' element={<Model/>}/>
        <Route path='/list-model' element={<Listmodel/>}/>
        <Route path='/list-penelitian' element={<Listpenelitian/>}/>
        <Route path='/list-penelitian-manual' element={<Listpenelitianmanual/>}/>
        <Route path='/anotasi-manual/:id' element={<AnotateManual/>}/>
        <Route path='/new-penelitian' element={<NewPenelitian/>}/>
        <Route path='/list-anotator/:id' element={<ListAnotator/>}/>
        <Route path='/list-job' element={<Listjob/>}/>
        <Route path='/new-model' element={<NewModel/>}/>
        <Route path='/anotate-auto/:id' element={<AnotateAuto/>}/>
        <Route path='/detail-penelitian/:id' element={<DetailPenelitian/>}/>
        <Route path='/update-role' element={<UpgradeRole/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/admin/list-user' element={<ListUser/>}/>
        <Route path='/mytable/:id' element={<MyTable/>}/>
        <Route path='/list-mypenelitian' element={<ListMypenelitian/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteApp;
