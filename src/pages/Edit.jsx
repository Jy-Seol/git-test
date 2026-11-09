import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import Editor from "../components/Editor.jsx";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App.jsx";
import useDiary from "../hooks/useDiary.jsx";
import useTitle from "../hooks/useTitle.jsx";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onUpdate } = useContext(DiaryDispatchContext);
  const { currentData, onClickDelete } = useDiary(params.id);

  useTitle(`${params.id}번 일기 수정`);

  const onSubmit = (input) => {
    onUpdate(
      params.id,
      input.createdDate.getTime(),
      input.emotionId,
      input.content,
    );
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"삭제하기"} type={"NEG"} onClick={onClickDelete} />
        }
      />
      <Editor initData={currentData} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
