interface PanelItemType {
  icon: any;
  text: string;
  highlighted?: boolean;
}

export const PanelItem = ({ icon, text, highlighted }: PanelItemType) => {
  return (
    <button
      className={`p-2 w-full flex flex-row justify-start items-center my-6 font-medium cursor-pointer`}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};
