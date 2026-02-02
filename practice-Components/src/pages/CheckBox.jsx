import { useState } from "react";

  // Challange You should write two handler functions, one to select individual checkboxes, and the second to select all of them.


export function CheckBox() {
  const [checkboxes, setCheckboxes] = useState([
    {
      id: crypto.randomUUID(),
      label: "item 1 ",
      isChecked: false,
    },
    {
      id: crypto.randomUUID(),
      label: "item 2 ",
      isChecked: false,
    },
    {
      id: crypto.randomUUID(),
      label: "item 3 ",
      isChecked: false,
    },
  ]);

  const [selectall, setSelectall] = useState(false);

  function toggleCheckbox(id) {
    // find which object {} has this id
    // Curly braces {} change arrow function behavior and does not return anything.

    setCheckboxes((prev) =>
      prev.map((cb) =>
        cb.id === id ? { ...cb, isChecked: !cb.isChecked } : cb,
      ),
    );
  }

  function toggleAll() {
    setSelectall(!selectall);
    setCheckboxes((checkboxes) =>
      checkboxes.map((cb) => ({ ...cb, isChecked: !cb.isChecked })),
    );
  }

  return (
    <>
      {/* React.Fragment can only have `key` and `children` props. */}
      {checkboxes.map((checkbox) => {
        return (
          <div key={checkbox.id} onClick={ () =>  toggleCheckbox(checkbox.id)} >
            <input
              type="checkbox"
              // onClick={selectBox}
              style={{ display: "inline", padding: "10px", margin: "10px" }}
              checked={checkbox.isChecked}
              onChange={() => {
                toggleCheckbox(checkbox.id);
              }}
            />
            <label> {checkbox.label} </label>
          </div>
        );
      })}

      <button onClick={toggleAll}>
        <p>{selectall ? "Deselect All" : "Select All "}</p>
      </button>
    </>
  );
}
// Challenge 7: “Select All” checkbox that auto-checks itself when all items are selected