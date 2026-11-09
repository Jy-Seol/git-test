import { useContext, useEffect, useRef } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const nav = useNavigate();
  const isDeleting = useRef(false);

  const data = useContext(DiaryStateContext);
  const { onDelete } = useContext(DiaryDispatchContext);
  const currentData = data.find((it) => String(it.id) === String(id));

  useEffect(() => {
    if (!currentData && !isDeleting.current) {
      alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
  }, [currentData, nav]);

  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      isDeleting.current = true;
      onDelete(Number(id));
      nav("/", { replace: true });
    }
  };

  return { currentData, onClickDelete };
};

export default useDiary;
