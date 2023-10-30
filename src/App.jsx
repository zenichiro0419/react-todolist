import React, { useEffect, useState } from "react";
import "./style.css";
import { InputTodo } from "./components/InputTodo";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // 入力したときのフォーム欄に変更を加える。入力値の取り方はお決まりなので覚える。
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  //　追加ボタンを押したときに未完了リストに追加
  const onClickAdd = () => {
    // 何も入力してないときは状態に変更を加えない
    if (todoText === "") return;
    // 未完了のtodoと入力したtodoを１つの配列に格納
    const newTodos = [...incompleteTodos, todoText];
    // incompleteTodosの状態に変更を加える（setIncompleteTodos）＝未完了リストを更新
    setIncompleteTodos(newTodos);
    // todoTextの状態に変更を加える（setTodoText）＝入力値を初期化
    setTodoText("");
  };
  // 削除ボタンを押したときに未完了リストから削除
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // index番目から1個削除
    newTodos.splice(index, 1);
    // incompleteTodosの状態に変更を加える（setIncompleteTodos）＝未完了リストを更新
    setIncompleteTodos(newTodos);
  };
  // 完了ボタンを押したときに未完了リストから削除＆完了TODOに追加
  const onClickComplete = (index) => {
    // 未完了リストから削除
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
    // 未完了リストで完了を押された要素と完了リスト内の要素を結合し１つのリストに
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    // completeTodosの状態に変更を加える（setCompleteTodos）＝完了リストを更新
    setCompleteTodos(newCompleteTodos);
  };
  // 戻すボタンを押したときに完了リストから削除＆未完了TODOに追加
  const onClickBack = (index) => {
    // 完了リストから削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
    // 未完了リストに追加
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />

      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              // 親タグにkeyを設定していないと変更差分のみの読み取りにならない(仮想DOM)
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                {/* 処理する関数に引数を渡すときはアロー関数を設定しないとClickしなくても処理が走ってしまう */}
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              // 親タグにkeyを設定していないと変更差分のみの読み取りにならない(仮想DOM)
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
