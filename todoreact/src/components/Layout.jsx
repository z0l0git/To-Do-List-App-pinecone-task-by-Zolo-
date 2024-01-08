import { Cards } from "@/components/Cards";

export const Layout = () => {
  return (
    <div className="flex flex-row gap-[30px] justify-center">
      <Cards title="To Do" />
      <Cards title="In Progress" />
      <Cards title="Stuck" />
      <Cards title="Done" />
    </div>
  );
};
