// App.tsx
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/login';
import Header from './components/header';
import Sidebar from './components/sidebar';
import ProtectedRoutes from "./utils/protectedRoute";
import { Home } from './pages/home';
import Users from './pages/Users';
import AddUser from './components/user/addUser';
import UserDetails from './pages/userDetails';
import Sellers from './pages/sellers';
import SellerEdit from './pages/sellerAdd';
import AddSeller from './components/Sellers/addSeller';
import ViewLocations from './pages/viewLocations';
import AddPaymentForUser from './pages/addPayment';
import AddPaymentDetails from './pages/addPaymentDetails';
import PaymentUserDetails from './pages/paymentUserDetails';
import Payments from './pages/payments';
import AddEventType from './pages/addEventType';
import EditEvent from './pages/editEvent';
import EventTypes from './pages/eventTypes';
import AddEvents from './pages/events';
import AddEventForm from './pages/addEventForm';
import AddExcel from './pages/addExcel';
import AddVehicle from './pages/addVehicle';
import EditVehicle from './pages/editVehicle';
import VehicleDetailsPerEvent from './pages/vehicleDetailsPerEvent';
import BidDetailsPerVehicle from './pages/bidDetailsPerVehicle';
import AddEmd from './pages/createEmd';
import EmdPerPayment from './pages/emdPerPayment';
import States from './pages/states';
import VehicleBuyingLimit from './pages/vehicleBuyingLimit';
import EmdDetailsPage from './pages/emdDetailsPage';
import ViewUsersByState from './pages/viewUsersByState';

const App: React.FC = () => {
  const location = useLocation();
  const isProjectorView = location.pathname.startsWith('/projecter-view/');
  const isLoginPage = location.pathname.startsWith('/login');

  return (
    <>
      {!isProjectorView  && !isLoginPage &&  <Header />}
      <div className="flex w-full ">
        {!isProjectorView && !isLoginPage && <Sidebar />}
       
        <Routes>
        <Route path="login" element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="users" element={<Users />} />

              <Route path="add-user" element={<AddUser />} />
              
              <Route path="view-user/:id" element={<UserDetails />} />

              <Route path="sellers" element={<Sellers />} />
              <Route path="edit-seller/:id" element={<SellerEdit />} />
              <Route path="add-seller" element={<AddSeller />} />

              <Route path="viewlocation" element={<ViewLocations />} />
              <Route path="states" element={<States />} />
              <Route path="payment" element={<Payments />} />
              <Route path="create-payment/:id" element={<AddPaymentForUser />} />
              <Route path="update-payment/:id" element={<AddPaymentDetails />}/>
              <Route path="payment/:id" element={<PaymentUserDetails/>} />
              <Route path="add-emd/:id" element={<AddEmd/>} />
              <Route path="emd-payment/:id" element={<EmdPerPayment/>} /> 
              <Route path="addevent" element={<AddEventForm/>} />
              <Route path="edit-event/:id" element={<EditEvent />} />
              {/* <Route path="addeventtype" element={<AddEventType />} />
              <Route path="edit-event/:id" element={<EditEvent />} /> */}
               <Route path="event-types" element={<EventTypes/>} />
              <Route path="events" element={<AddEvents/>} />
               <Route path="add-vehicle/:id" element={<AddVehicle/>} />
               <Route path="view-vehicls/:id" element={<VehicleDetailsPerEvent/>} />
               <Route path="buying-limit/:userId" element={<VehicleBuyingLimit />} />
               <Route path="emdDetails/:id" element={<EmdDetailsPage/>} />
               <Route path="edit-vehicle/:id" element={<EditVehicle/>} />
               <Route path="excel-upload/:id" element={<AddExcel/>} />
               <Route path="bid-details/:id" element={<BidDetailsPerVehicle />} />
               <Route path="ViewUsersByState/:id" element={<ViewUsersByState/>}/>
              </Route>
              </Routes>
          {/* Your routes and other components go here */}
        </div>
     
    </>
  );
};

export default App;
