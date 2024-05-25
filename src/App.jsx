import { BrowserRouter } from "react-router-dom";
import Routes from "./router/Routes";

function App() {
   return (
      <BrowserRouter>
         <Routes />
      </BrowserRouter>

      // <>
      // 	<div>
      // 		{/* <MainApp /> */}
      // 		<BrowserRouter>
      // 			<Routes>
      // 				<Route path='/dashboard' element={<MainApp />} />
      // 				<Route path='*' element={<NotFound />} />
      // 			</Routes>
      // 		</BrowserRouter>
      // 	</div>
      // </>
   );
}

export default App;
