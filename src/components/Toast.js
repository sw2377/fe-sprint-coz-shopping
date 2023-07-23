import { useState, useEffect } from 'react';
import { ReactComponent as Bookmark } from '../assets/icons/bookmarkIcon.svg';
import "./Toast.css";

function Toast({ toastList, setToastList, setIsToastShow, star, deleteToast }) {

  console.log("toastList", toastList)

  useEffect(() => {
    const timer = setTimeout(() => {
      
        setIsToastShow(false)
      
    }, 5000)

    return () => {
      clearTimeout(timer);
    }
  }, [toastList])

  // const [ isAboutToClose, setClose ] = useState(false);

  // useEffect(() => {
  //   const timeoutId = deleteToast(3000);
  //   return () => clearTimeout(timeoutId)
  // }, [deleteToast])

  // useEffect(() => {
  //   if (isAboutToClose) {
  //     const timeoutId = deleteToast(400);
  //     return () => clearTimeout(timeoutId)
  //   }
  // }, [deleteToast, isAboutToClose])


  return (
    <>
      {/* <div className="toast_container"> */}
        { toastList.map((toast) => (
          <div key={toast.id} className="toast">
            <div className="bookmark_icon">
              <Bookmark 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fillOpacity={ star ? "1" : "0.8" } 
                fill={ star ? "#FFD361" : "#DFDFDF" } 
              />
            </div>
            <span className="toast_message">
              { star ? "상품이 북마크에 추가되었습니다." : "상품이 북마크에서 제거되었습니다." }
            </span>
          </div>  
        )) } 
    {/* </div> */}
    </>
  )
}

export default Toast;
