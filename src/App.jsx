import React, { useEffect, useState } from "react";
import "./style.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState(["あああ", "いいい"]);
  const [completeTodos, setCompleteTodos] = useState(["ううう"]);

  // 入力したときのフォーム欄に変更を加える。入力値の取り方はお決まりなので覚える。
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  //　追加ボタンを押したときに未完了リストに追加
  const onClockAdd = () => {
    // 何も入力してないときは状態に変更を加えない
    if (todoText === "") return;
    // 未完了のtodoと入力したtodoを１つの配列に格納
    const newTodos = [...incompleteTodos, todoText];
    // incompleteTodosの状態に変更を加える（setIncompleteTodos）＝未完了リストを更新
    setIncompleteTodos(newTodos);
    // todoTextの状態に変更を加える（setTodoText）＝入力値を初期化
    setTodoText("");
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          // onChangeを定義すると{}内の処理でevent引数が使える
          onChange={onChangeTodoText}
        />
        <button onClick={onClockAdd}>追加</button>
      </div>

      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo) => {
            return (
              // 親タグにkeyを設定していないと変更差分のみの読み取りにならない(仮想DOM)
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>完了</button>
                <button>削除</button>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo) => {
            return (
              // 親タグにkeyを設定していないと変更差分のみの読み取りにならない(仮想DOM)
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
