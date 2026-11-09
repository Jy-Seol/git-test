import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import Viewer from "../components/Viewer.jsx";
import useDiary from "../hooks/useDiary.jsx";
import { getStringedDate } from "../util/date.js";
import useTitle from "../hooks/useTitle.jsx";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();

  useTitle(`${params.id}번 일기`);

  const { currentData } = useDiary(params.id);

  if (!currentData) {
    return <div>데이터 로딩중...</div>;
  }

  console.log(currentData);

  const { createdDate, emotionId, content } = currentData;
  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"수정하기"} onClick={() => nav(`/edit/${params.id}`)} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
