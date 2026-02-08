export function ColorBtn({ color, handleColorChange }) {
  return (
    <button key={color.id} onClick={ () =>  handleColorChange(color.name)}>
      {" "}
      {color.name}{" "}
    </button>
  );
}