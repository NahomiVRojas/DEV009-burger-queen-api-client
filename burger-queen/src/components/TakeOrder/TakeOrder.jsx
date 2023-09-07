import style from "../TakeOrder/TakeOrder.module.css"

export default function TakeOrder() {
  return (
    <>
      <div className={style.header}>
        <h4>Order</h4>
        <select>
            <option>Table</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>TA</option>
        </select>
      </div>
    </>
  );
}
