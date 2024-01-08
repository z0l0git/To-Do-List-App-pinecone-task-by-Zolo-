export const Cards = (props) => {
  const { title = "", content = [] } = props;

  return (
    <div className="flex flex-col justify-between bg-white rounded-[10px] p-4 w-1/6 py-[14x] px-[10px] h-[120px]">
      <div className="flex justify-start items-center gap-[14px] text-gray-400 ">
        <h2 className="font-bold text-black text-xl">{title}</h2>
        <p className="text-gray-400 text-xl">0</p>
      </div>
      <div></div>
      <div
        className="flex justify-start items-center gap-[10px] text-l font-semibold rounded-[6px] bg-gray-200 h-[35px]"
        style={{ cursor: "pointer" }}
      >
        <span>+</span>
        <span>Add card</span>
      </div>
    </div>
  );
};
