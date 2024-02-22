import { RouterProvider } from 'react-router-dom'
import { router } from './router'
// import { fetchChannelAPI } from './apis/list'

export default function App() {
  // fetchChannelAPI().then(res =>{
  //   console.log(res.data.data.channels);
  // })
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
