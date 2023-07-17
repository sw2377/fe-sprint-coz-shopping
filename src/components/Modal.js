import { useEffect } from 'react';
import './Modal.css';
import { ReactComponent as Bookmark } from '../assets/icons/bookmarkIcon.svg';
import { ReactComponent as Close } from '../assets/icons/closeIcon.svg';


function Modal({ modalData, closeModal }) {
  console.log(modalData)

  useEffect(() => {
    document.body.style.cssText = `
     overflow: hidden;
    `;

    return () => {
      document.body.style.cssText = `
        overflow: none;
      `;
    };
  }, []);

  return(
    <div className="modal">
      <div className="modal_bg" onClick={() => closeModal()}>
        <div 
          className="modal_contents" 
          style={{ backgroundImage: `url("${modalData.image}")` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal_content">
            <div className="bookmark_icon">
              <Bookmark 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fillOpacity={ modalData.isBookmark ? "1" : "0.8" } 
                fill={ modalData.isBookmark ? "#FFD361" : "#DFDFDF" } 
              />
            </div>
            <div className="title">{modalData.name}</div>
          </div>
          <div className="close_btn" onClick={() => closeModal()} >
            <Close />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;