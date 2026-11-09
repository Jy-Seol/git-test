import "./Editor.css";
import EmotionItem from "./EmotionItem.jsx";
import Button from "./Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/date";

const Editor = ({ onSubmit, initData }) => {
  const [input, setInput] = useState(() =>
    initData
      ? { ...initData, createdDate: new Date(Number(initData.createdDate)) }
      : { createdDate: new Date(), emotionId: 3, content: "" },
  );

  const nav = useNavigate();

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") value = new Date(value);

    setInput({
      ...input,
      [e.target.name]: value,
    });
  };

  const onSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className={"Editor"}>
      <section className={"date_section"}>
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          type="date"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
        />
      </section>
      <section className={"emotion_section"}>
        <h4>오늘의 감정</h4>
        <div className={"emotion_list_wrapper"}>
          {emotionList.map((it) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: { name: "emotionId", value: it.emotionId },
                })
              }
              key={it.emotionId}
              {...it}
              isSelected={it.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className={"content_section"}>
        <h4>오늘의 일기</h4>
        <textarea
          name={"content"}
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땟나요?"
        ></textarea>
      </section>
      <section className={"button_section"}>
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button onClick={onSubmitButton} text={"작성완료"} type={"POS"} />
      </section>
    </div>
  );
};

export default Editor;
