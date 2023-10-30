import React from "react";

export const InputTodo = (props) => {
  const { todoText, onChange, onClick, disabled } = props;
  return (
    <div className="input-area">
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        // onChangeを定義すると{}内の処理でevent引数が使える
        onChange={onChange}
      />
      <button disabled={disabled} onClick={onClick}>
        追加
      </button>
    </div>
  );
};
