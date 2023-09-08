import { func, object, string } from "prop-types";
import style from "../Table/Table.module.css";
import DropdownButton from "../DropDownButton/DropDownButton";

export default function Table({ data, columns, onEdit, onDelete }) {
  return (
    <div className={`table-responsive ${style.responsive}`}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column}>{item[column]}</td>
              ))}
              <td>
                <DropdownButton
                  optionEdit={() => onEdit(item.id)}
                  optionDelete={() => onDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  data: object.isRequired,
  columns: string.isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired,
};
