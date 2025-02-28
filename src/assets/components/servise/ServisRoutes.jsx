import {Routes, Route, Outlet, useNavigate} from 'react-router-dom'
import NotFound from './notFound/NotFound'
import services from './services.module.css'
import CharsList from './charsList/CharsList'
import Table from '../table/Table'
import Services from './Servises'
import Registratios from '../registration/Registratios'
import TanTable from '../tablev2/TanTable'
import {isAuthSelector} from '../../../redux/slices/auth'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'

const ServisRoutes = () => {
  const navigate = useNavigate()
  const auth = useSelector(isAuthSelector)
  const {status, data} = useSelector(store => store.auth)

  useEffect(() => {
    if (status === 'loading') return
    if (!auth) {
      navigate('/login')
    }
  }, [auth, navigate, status])

  return (
    <Routes>
      <Route path='/' element={<Table />} />
      <Route path='/login' element={<Registratios />} />
      <Route path='/table' element={<Table />} />
      {/* do4ernie marsruti */}
      <Route path='services' element={<ServicesLayout />}>
        <Route path='cards' element={<CharsList />} />
      </Route>
      {/* --- */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

const ServicesLayout = () => (
  <div id='process' className={services.services_services}>
    <Services />
    <Outlet />
  </div>
)

export default ServisRoutes
