import { createPortal } from "react-dom";
import ListItem from "../components/ListItem";
import Filter from "../components/Filter";
import Modal from "../components/Modal";

function Bookmark({ bookmark, removeBookmark }) {
  return (
    <>
      <main>
        <Filter />
        <section>
          <ul className="listItem">
            {bookmark.map((list) => (
              <ListItem
                key={list.id}
                {...list}
                // openModal={openModalHandler}
                // addBookmark={addBookmarkHandler}
                // removeBookmark={removeBookmarkHandler}
              />
            ))}
          </ul>
        </section>
        {/* {isLoading ? "loading..." : <div ref={bottom}>TEST: BOTTOM AREA</div>}
        {isOpen &&
          createPortal(
            <Modal modalData={modalData} closeModal={closeModalHandler} />,
            document.getElementById("modal")
          )} */}
      </main>
    </>
  )
}

export default Bookmark;